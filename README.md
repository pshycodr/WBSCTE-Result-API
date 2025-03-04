# WBSCTE Diploma Results API

This is a **simple API** to fetch results for **WBSCTE Diploma Students** from the official website. It scrapes the data and presents it in a structured JSON format.

> **Disclaimer:** This is just a **time-pass project**, built for fun and learning. I have **no idea if this is legal or not**, so **please don’t sue me**! 🥺🤕

#### What does it do?
- Accepts registration number via POST request.
Fetches student results from the WBSCTE official result portal.
- Returns a clean JSON with student details, - subject-wise grades, and GPA.

#### Who is this for?
- Strictly for WBSCTE Diploma Students.
- If you’re not a WBSCTE student — you’re just here for the code, aren't you? 😉

#### Usecases
- 🤔 I don't know. Who thinks about usecases for a time-pass project? 😂

---

## 💻 Installation & Deployment

#### Clone the repository
```bash
git clone https://github.com/pshycodr/WBSCTE-Result-API.git
```

#### Then `cd WBSCTE-Result-API.git` into the directory do a
```bash
# Install dependencies
npm install
```
#### Install Serverless Framework 
```bash
npm install -g serverless
```

#### Then Export youe AWS **"IAM"** credentials with
```bash
export AWS_ACCESS_KEY=
export AWS_SECRET_ACCESS_KEY=
```

#### Then Deploy the project to AWS lamda functions using
```bash
serverless deploy

# Your API endpoint will be shown in the terminal
```

#### To test this locally before deploying
add your registration number in `event.json` file and run the following command
```bash
 serverless invoke local -f getResult --path event.json
```


## 🛠 Tech Stack
- **Node.js** (Serverless Functions)
- **AWS Lambda** (Hosting)
- **Axios** (HTTP Requests)
- **Cheerio** (Web Scraping)


## ⚠️ Important Notes
- This **only works for WBSCTE Diploma students**.
- If the website changes its structure, this might break.
- Use this responsibly, I take **no responsibility** for how you use it! 😎

## 📜 License
No license, because I don’t even know if this should exist. 😂

