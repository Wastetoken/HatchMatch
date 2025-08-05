# 🐥 Chicken Crossbreeding Predictor

A fullstack web app for calculating crossbreed outcomes between chicken breeds — showing estimated traits, production stats, and pricing for offspring.

Built with Express, Vite, and React.

---

## 🚀 Features

- 🧬 Predicts offspring traits based on selected parent breeds
- 📊 Calculates production and behavior metrics (egg rate, growth, hardiness, etc.)
- 💰 Estimates pricing tiers for chicks, pullets, and breeding/show quality birds
- 📁 Download results as CSV or PDF
- ⚙️ Fullstack TypeScript: Express + Vite + React

---

## 📁 Project Structure
├── client/ # React frontend
│ └── public/images/ # Static images served by Express
├── server/ # Express backend
│ ├── index.ts # Main server file
│ └── routes/ # API routes
├── package.json
└── README.md

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
2. Run the development server

npm run dev
3. API Endpoints
Endpoint	Method	Description
/api/crosses/calculate	POST	Predicts hybrid traits and production
/api/generate-pdf	GET	Downloads a sample PDF report
/api/convert-json-to-csv	POST	Converts JSON data to downloadable CSV

🧪 Sample JSON POST (for /api/crosses/calculate)

{
  "parentAId": "sebright",
  "parentBId": "buff-brahma"
}
📦 Technologies Used
Backend: Node.js, Express, TypeScript

Frontend: React, Vite, Tailwind CSS

PDF/CSV: pdfkit, json2csv

📃 License
MIT — feel free to fork and customize.
