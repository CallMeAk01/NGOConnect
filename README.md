# 🐾 NGO Connect

> India's most transparent animal rescue platform. Report animals in distress, track rescues in real-time, and donate with full transparency.

## ✨ Features

- 🚨 **Report** — Report injured/distressed animals with location & photos
- 🏥 **Rescue** — Verified NGOs receive and dispatch rescue teams
- 📊 **Track** — Real-time case tracking with timestamped activity logs
- 💰 **Donate** — Transparent fund tracking for every case
- 💊 **Medicine Exchange** — Share unused animal medicines with those in need
- 📡 **Live Updates** — WebSocket-powered real-time notifications
- 🔐 **Auth** — Email/password + Google OAuth login

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (SPA with hash routing) |
| Backend | NestJS (Node.js) |
| Database | SQLite via Prisma ORM |
| Auth | JWT + Passport (Local + Google OAuth) |
| Real-time | Socket.IO WebSockets |

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)

### 1. Clone the repo
```bash
git clone https://github.com/CallMeAk01/NGOConnect.git
cd NGOConnect
```

### 2. Set up the backend
```bash
cd backend
cp .env.example .env
# Fill in your values in .env

npm install
npx prisma migrate dev --name init
npm run build
node dist/src/main
```

### 3. Serve the frontend
From the root project folder, use any static file server:
```bash
# Using Deno
deno run --allow-net --allow-read --allow-sys "https://deno.land/std@0.224.0/http/file_server.ts" --port 5500 .

# Or using Python
python -m http.server 5500

# Or just open index.html in your browser
```

### 4. Open the app
Visit **http://localhost:5500**

## ⚙️ Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite path (default: `file:./dev.db`) |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `GOOGLE_CALLBACK_URL` | OAuth callback (default: `http://localhost:3000/api/auth/google/callback`) |
| `FRONTEND_URL` | Your frontend URL (default: `http://localhost:5500`) |

## 👥 Team

| Name | Role |
|---|---|
| Akshansh Rathore | Project Lead |
| Manish Kumar | Technology Lead |
| Bhupendra Singh | Innovation & Testing Lead |
| Sanskar Dubey | Marketing Lead |

## 📄 License

MIT
