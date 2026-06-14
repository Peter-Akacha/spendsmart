# Deploying SpendSmart (Free Tier) — Step by Step

This gets you a **live demo link** to put on your Upwork portfolio.
Total cost: $0. Time: ~30-45 minutes.

You'll deploy 4 pieces:
1. Database → MongoDB Atlas
2. AI categorizer (Python) → Render
3. Backend API (Node) → Render
4. Frontend (React) → Vercel

---

## 1. Push the code to GitHub

1. Create a new repo on GitHub, e.g. `spendsmart`.
2. From the `spendsmart` folder (the one containing `frontend/`, `backend/`, `README.md`):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SpendSmart full-stack expense tracker"
   git branch -M main
   git remote add origin https://github.com/<your-username>/spendsmart.git
   git push -u origin main
   ```
3. The `.gitignore` already excludes `node_modules` and `.env` files — don't remove it.

---

## 2. Set up MongoDB Atlas (free database)

1. Go to mongodb.com/cloud/atlas and create a free account.
2. Create a free **M0 cluster** (any region close to you).
3. Under **Database Access**, create a user with a username/password (save these).
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) — fine for a demo project.
5. Click **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/spendsmart
   ```
   Replace `<username>` and `<password>` with your actual values, and add `/spendsmart` as the database name before the `?`.

Keep this string — you'll need it in step 4.

---

## 3. Deploy the AI categorizer (Python) to Render

1. Go to render.com and sign up (free), connect your GitHub account.
2. Click **New +** → **Web Service** → select your `spendsmart` repo.
3. Configure:
   - **Name:** `spendsmart-ai-categorizer`
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python utils/ai_categorizer.py`
   - **Instance Type:** Free
4. Deploy. Once live, copy its URL — looks like `https://spendsmart-ai-categorizer.onrender.com`.

> Note: Free Render services sleep after inactivity and take ~30-60s to wake up on first request. This is normal and fine for a portfolio demo.

---

## 4. Deploy the backend (Node API) to Render

1. **New +** → **Web Service** → same `spendsmart` repo.
2. Configure:
   - **Name:** `spendsmart-backend`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
3. Add Environment Variables (under **Environment**):

   | Key | Value |
   |---|---|
   | `MONGO_URI` | your MongoDB Atlas connection string from step 2 |
   | `JWT_SECRET` | any long random string (e.g. generate one at randomkeygen.com) |
   | `JWT_EXPIRES_IN` | `7d` |
   | `PYTHON_AI_URL` | the AI categorizer URL from step 3 |
   | `PORT` | `5000` |

4. Deploy. Copy the resulting URL — e.g. `https://spendsmart-backend.onrender.com`.
5. Test it: visit `https://spendsmart-backend.onrender.com/` in your browser. You should see:
   ```json
   {"message":"SpendSmart API running"}
   ```

---

## 5. Deploy the frontend (React) to Vercel

1. Go to vercel.com and sign up with GitHub.
2. **Add New** → **Project** → import your `spendsmart` repo.
3. Configure:
   - **Root Directory:** `frontend`
   - Framework preset should auto-detect as **Create React App**.
4. Add Environment Variable:

   | Key | Value |
   |---|---|
   | `REACT_APP_API_URL` | `https://spendsmart-backend.onrender.com/api` (your backend URL + `/api`) |

5. Deploy. You'll get a URL like `https://spendsmart-yourname.vercel.app`.

---

## 6. Test the full flow

1. Open your Vercel URL.
2. Register a new account.
3. Add an expense (e.g. "Uber to airport", amount 25). Confirm it gets auto-categorized as "Transport" — this proves the AI categorization works end-to-end.
4. Check the Dashboard and Reports pages show charts.

If AI categorization shows "Other" for everything, the `PYTHON_AI_URL` env var on the backend may be wrong, or the AI service is still waking up (wait 30s and retry).

---

## 7. Add to your Upwork portfolio

Once everything works:
- Take screenshots of: Login page, Dashboard with charts, Expenses page with AI categorization tag, Reports page.
- In Upwork → Profile → Portfolio → **+** → add a new project:
  - **Title:** SpendSmart — AI-Powered Expense Tracker
  - **Skills used:** React, Node.js, Express, MongoDB, JWT, Python, Chart.js
  - **Description:** see suggested copy below
  - **Project URL:** your Vercel link
  - **Completion date / role:** Sole developer
- Also link the GitHub repo in the description for technical clients who want to see code quality.

### Suggested portfolio description

> Full-stack personal finance tracker built with React, Node.js/Express, and MongoDB. Features JWT authentication, a Python microservice that automatically categorizes expenses (e.g. "Uber to airport" -> Transport) using keyword-based classification, an interactive dashboard with Chart.js visualizations, and monthly spending reports broken down by category. Designed and built end-to-end, including API design, database schema, auth flow, and responsive UI.
