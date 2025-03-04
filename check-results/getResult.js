const axios = require('axios');
const cheerio = require('cheerio');

exports.getResult = async (event) => {
    try {
        console.log("Received event:", event, typeof event, event.reg_no);

        console.log("Received event:", JSON.stringify(event, null, 2));

        let reg_no;

        
        if (event.body) {
            const body = JSON.parse(event.body);
            reg_no = body.reg_no;
        } else {
            reg_no = event.reg_no;
        }

        if (!reg_no) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing reg_no" })
            };
        }

        const { data: html } = await axios.post(
            'https://exam.webscte.co.in/student/loginProcess',
            new URLSearchParams({
                'view_status': '592d773e83653c5c077b55f7f5ac50a7',
                'roll': '',
                'no': '',
                'reg_no': reg_no
            }),
            {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'ci_session=b8fc05e60dd7ee95fe3140c43be2598fead5700e; csrf_cookie_name=592d773e83653c5c077b55f7f5ac50a7'
                }
            }
        );

        const resultJson = parseResultHTML(html);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resultJson)
        };

    } catch (error) {
        console.error("Error fetching or parsing:", error.message);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: "Failed to fetch results" })
        };
    }
};

function parseResultHTML(html) {
    const $ = cheerio.load(html);

    const studentDetails = {
        "Roll": getTextAfterLabel($, 'Roll') || "N/A",
        "Number": getTextAfterLabel($, 'Number') || "N/A",
        "Registration Number": getTextAfterLabel($, 'Registration Number') || "N/A",
        "Semester": getTextAfterLabel($, 'Semester') || "N/A",
        "Institute": getTextAfterLabel($, 'Institute') || "N/A",
        "Branch": getTextAfterLabel($, 'Branch') || "N/A",
        "Name of Student": getTextAfterLabel($, 'Name of Student') || "N/A",
        "Name of Father/Guardian": getTextAfterLabel($, 'Name of Father/Guardian') || "N/A",
        "Grade Point Average (GPA)": getTextAfterLabel($, 'GPA') || "N/A",
        "Percentage": getTextAfterLabel($, 'Percentage') || "N/A",
        "Result": getTextAfterLabel($, 'Result') || "N/A"
    };

    const theoreticalSubjects = extractSubjects($, "Theoretical Subjects");
    const practicalSubjects = extractSubjects($, "Sessional/Practical Subjects");

    return {
        studentDetails,
        theoreticalSubjects,
        practicalSubjects
    };
}

function getTextAfterLabel($, label) {
    return $(`td:contains('${label}')`).next().text().trim();
}


function extractSubjects($, sectionTitle) {
    const subjects = [];
    const section = $(`table.show-result`).filter((_, table) => {
        return $(table).text().includes(sectionTitle);
    });

    section.find('tr').each((i, row) => {
        if (i === 0) return; 
        const columns = $(row).find('td');
        if (columns.length >= 2) {
            subjects.push({
                subject: $(columns[0]).text().trim(),
                grade: $(columns[1]).text().trim()
            });
        }
    });

    return subjects;
}
