# 🐾 NGO Connect — Complete Project Summary

> India's most transparent animal rescue platform. Report animals in distress, track rescues in real-time, and donate with full transparency.

---

## 📌 Project Overview

NGO Connect is a **full-stack web application** built to bridge the gap between people who spot distressed animals and verified NGOs who can rescue them. The platform emphasizes **complete financial transparency**, **real-time tracking**, and **data-driven NGO accountability**.

The project has two distinct parts:
- A **vanilla JS Single Page Application (SPA)** frontend
- A **NestJS REST API + WebSocket backend**

---

## 🗂️ Project Structure

```
D:\NGO Connect\
├── index.html                     ← Main SPA entry point
├── NGO_Connect_Presentation.html  ← Standalone presentation file
├── README.md
├── .gitignore
├── css/
│   └── styles.css                 ← Full design system (3,243 lines)
├── js/
│   ├── app.js                     ← SPA router & core logic
│   ├── data.js                    ← Mock data + utility functions
│   ├── liveUpdates.js             ← WebSocket client
│   └── pages/                     ← One JS file per page/route
│       ├── home.js
│       ├── auth.js
│       ├── cases.js
│       ├── caseDetail.js
│       ├── ngoDirectory.js
│       ├── ngoProfile.js
│       ├── medicineExchange.js
│       ├── donate.js
│       ├── impact.js
│       ├── howItWorks.js
│       ├── about.js
│       ├── report.js
│       ├── dashboardReporter.js
│       ├── dashboardNgo.js
│       └── dashboardDonor.js
└── backend/
    ├── src/
    │   ├── main.ts
    │   ├── app.module.ts
    │   ├── auth/
    │   ├── cases/
    │   ├── ngos/
    │   ├── medicines/
    │   ├── donations/
    │   ├── events/
    │   └── prisma/
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── .env
    └── .env.example
```

---

## 🎨 FRONTEND

### Architecture
The frontend is a **Hash-based Single Page Application (SPA)** — there is only one HTML file (`index.html`) and JavaScript handles all routing via `window.location.hash`. No framework like React or Vue is used — it's pure **Vanilla HTML, CSS, and JavaScript**.

### Routing System (`js/app.js`)
The router works like this:
- URL changes to `#/cases` → `renderCases()` is called → page content swapped into `<main id="app">`
- Each route maps to a render function + an init function
- Page transitions use CSS fade animations (`page-enter` / `page-exit` classes)
- Scroll to top happens on every route change

**All routes:**
| Route | Page |
|---|---|
| `#/` | Home |
| `#/cases` | Cases listing |
| `#/case/:id` | Case detail (dynamic) |
| `#/ngos` | NGO directory |
| `#/ngo/:id` | NGO profile (dynamic) |
| `#/medicine` | Medicine Exchange |
| `#/donate` | Donate |
| `#/impact` | Impact dashboard |
| `#/how-it-works` | How it works |
| `#/about` | About |
| `#/login` | Login / Register |
| `#/report` | Report an animal |
| `#/dashboard/reporter` | Reporter dashboard |
| `#/dashboard/ngo` | NGO dashboard |
| `#/dashboard/donor` | Donor dashboard |
| `#/auth/callback` | Google OAuth callback handler |

---

### Design System (`css/styles.css` — 3,243 lines)

A complete custom design system built from scratch with:

#### Color Palette
- **Primary:** `#2563EB` (Trust Blue)
- **Success/Emerald:** `#10b981`
- **Gold:** `#f59e0b`
- **Danger/Red:** `#ef4444`
- **Teal accent:** `#14b8a6`
- Full **dark mode** support via `body.dark` class toggle

#### Visual Style
- **Glassmorphism** cards with `backdrop-filter: blur()`
- **Gradient buttons** and gradient text (`-webkit-background-clip: text`)
- **Dark hero section** with animated radial gradient background (`heroGlow` keyframe)
- **Pill-shaped navigation** bar (floating, with blur)
- Smooth hover micro-animations on all interactive elements
- Scroll-triggered **animate-in** class using `IntersectionObserver`

#### Typography
- **Google Fonts: Inter** (weights 400, 500, 600, 700, 800)
- Tight letter-spacing on headings (`-0.02em`)

#### Component Library
Fully custom components including:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-gold`, `.btn-danger`
- `.card` with gradient border hover effect
- `.badge-critical`, `.badge-moderate`, `.badge-stable`, `.badge-verified`
- `.case-card`, `.ngo-card`, `.ngo-avatar`
- `.tabs` / `.tab-content` system
- `.form-input`, `.form-select`, `.form-label`
- `.stat-bar-track` / `.stat-bar-fill` for fund progress bars
- `.live-indicator` with animated pulse dot
- `.live-alert-banner` for critical case notifications
- `.footer`, `.footer-grid`, `.footer-brand`
- Responsive mobile navbar with hamburger menu

---

### Third-Party Libraries Used (Frontend)

#### 1. 🗺️ Leaflet.js (`v1.9.4`)
- **What it is:** Open-source interactive map library
- **How it's used:** Embedded maps on the Report page (to pin the animal's location) and on case detail pages to show rescue location
- **Source:** Loaded via CDN from `unpkg.com/leaflet`
- Uses **OpenStreetMap** tiles (no API key needed)

#### 2. 🔌 Socket.IO Client (`v4.7.4`)
- **What it is:** WebSocket client library
- **How it's used:** `js/liveUpdates.js` connects to the backend WebSocket server at `ws://localhost:3000/events`
- Listens for events: `case:created`, `case:statusUpdate`, `case:critical`, `case:escalated`
- Shows toast notifications and banner alerts in real-time
- Gracefully falls back to "Offline" mode if backend is unreachable
- **Source:** CDN from `cdn.socket.io`

#### 3. ✏️ Lucide Icons
- **What it is:** Beautiful open-source SVG icon set
- **How it's used:** Icons in the navbar (moon/sun theme toggle), buttons, and UI elements via `<i data-lucide="moon">` syntax
- `lucide.createIcons()` is called after every page render to replace placeholders with real SVGs
- **Source:** CDN from `unpkg.com/lucide`

#### 4. 🔤 Google Fonts (Inter)
- Loaded via stylesheet link in `<head>`
- Used for all typography across the site

---

### Mock Data System (`js/data.js` — 652 lines)
The frontend has a **full offline mock data layer**:
- **12 animal rescue cases** with complete timelines, financials, photos, NGO assignments
- **9 verified NGOs** with ratings, reviews, specializations, rescue stats
- **6 available medicines** + **3 medicine requests**
- **Platform stats** (14,520 rescues, 94.2% success rate, 186 NGOs, 34 cities)
- **3 testimonials**
- **4 team members**

**Utility functions in data.js:**
- `formatDate()`, `formatTime()`, `formatDateTime()`
- `formatCurrency()` — formats to ₹ Indian Rupee format
- `timeAgo()` — relative time ("2h ago", "3d ago")
- `getUrgencyBadge()` — returns HTML badge for Critical/Moderate/Stable
- `getStatusBadge()` — returns HTML badge for Open/In-Progress/Resolved
- `getNgoById()`, `getCaseById()` — lookup helpers

---

### Pages Breakdown

#### Home (`home.js`)
- Hero section with animated stats counter
- "How NGO CONNECT Works" 3-step section
- Real-time impact ticker (4 metrics with count-up animation)
- Live case feed grid (loads from backend, falls back to mock data)
- Featured NGOs grid
- Trust/transparency banner
- Medicine Exchange promo
- Testimonials carousel
- Final CTA section

#### Cases (`cases.js`)
- Filterable case grid (by urgency, status, city)
- Search bar
- Case cards with fund progress bars
- Clicking a card navigates to `#/case/:id`

#### Case Detail (`caseDetail.js`)
- Full case information
- **Leaflet map** showing rescue location
- Timeline of all rescue activities
- Financial ledger (credits/debits)
- Fund progress bar with percentage
- Donate button linked to the donate page

#### NGO Directory (`ngoDirectory.js`)
- Grid of all verified NGOs
- Filter by city, specialization
- Rating display, rescue counts

#### NGO Profile (`ngoProfile.js`)
- Full NGO information
- Stats: total rescues, success rate, avg response time, rating
- Specialization tags
- Reviews section
- Cases assigned to this NGO

#### Report (`report.js`)
- Multi-step report form
- **Leaflet map** for pinning animal location
- Photo upload UI
- Urgency selector (Critical / Moderate / Stable)
- Description text area
- Submits to `POST /api/cases` if backend is running

#### Auth (`auth.js`)
- Tab-based Login / Register forms
- Email + Password login → `POST /api/auth/login`
- Register with role selection (Reporter / NGO / Donor) → `POST /api/auth/register`
- **"Continue with Google"** button → redirects to `GET /api/auth/google`
- Google OAuth callback handler at `#/auth/callback` — parses JWT from URL query params, stores in `localStorage`

#### Dashboards
- **Reporter Dashboard:** Shows cases reported by the logged-in user
- **NGO Dashboard:** Shows cases assigned to the NGO, response stats
- **Donor Dashboard:** Shows donation history and impact

#### Other Pages
- **Medicine Exchange:** Available medicines list + request form
- **Donate:** Donation form with case selection
- **Impact:** Platform-wide statistics and charts
- **How It Works:** Illustrated step-by-step guide
- **About:** Team section and mission statement

---

### Auth State Management
- JWT token stored in `localStorage` as `token`
- User object stored in `localStorage` as `user`
- On login, user is redirected based on their role (`REPORTER`, `NGO`, `DONOR`, `ADMIN`)

---

## ⚙️ BACKEND

### Framework & Language
- **NestJS** (Node.js framework) written in **TypeScript**
- Runs on **Node.js v24.18.0**
- Serves on **port 3000**
- Global API prefix: `/api`

---

### Database
- **SQLite** (via a local `dev.db` file in `backend/prisma/`)
- Managed by **Prisma ORM v5.22.0**
- No external database server needed — the DB is just a single file

#### Prisma Schema Models:

**User**
```
id, email, passwordHash, googleId, name, avatar, role, isVerified, createdAt, updatedAt
```
- Role can be: `REPORTER`, `NGO`, `DONOR`, `ADMIN`
- `googleId` links to Google OAuth accounts
- Relations: ngoProfile, reportedCases, activityLogs, medicines, donations

**NGOProfile**
```
id, userId, orgName, verificationStatus, latitude, longitude, rescueStats (JSON), rating
```
- One-to-one with User
- Has assigned cases

**Case**
```
id, reporterId, assignedNgoId, latitude, longitude, urgency, status, description, images (JSON array)
```
- Urgency: `OPEN`, `MODERATE`, `CRITICAL`, `STABLE`
- Status: `OPEN`, `IN_PROGRESS`, `RESOLVED`

**ActivityLog** (Append-only audit trail)
```
id, caseId, actorId, actionType, metadata (JSON), timestamp
```
- Every action on a case is recorded here permanently

**Medicine**
```
id, donorId, name, expiryDate, type, latitude, longitude, status
```
- Status: `AVAILABLE`, `CLAIMED`

**Donation**
```
id, donorId, caseId, amount, currency, transactionId, timestamp
```

---

### API Modules & Endpoints

#### 🔐 Auth Module (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create new account with email/password/role |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/google` | Initiate Google OAuth flow |
| GET | `/api/auth/google/callback` | Google OAuth callback, issues JWT, redirects to frontend |

**Auth Strategies (Passport.js):**
- **LocalStrategy** — validates email + bcrypt password
- **JwtStrategy** — validates Bearer token from `Authorization` header
- **GoogleStrategy** — handles Google OAuth2 via `passport-google-oauth20`

**Password hashing:** `bcrypt` with salt rounds = 12

**JWT:** Signed with `JWT_SECRET`, expires in `7d`

---

#### 📋 Cases Module (`/api/cases`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/cases` | Create a new rescue case |
| GET | `/api/cases` | List cases (with filters) |
| GET | `/api/cases/:id` | Get single case details |
| PATCH | `/api/cases/:id/status` | Update case status |
| GET | `/api/cases/analytics/overview` | Platform-wide analytics |

**Smart Case Creation logic:**
1. When a case is created, the backend uses the **Haversine formula** to calculate distance between the case location and all verified NGOs
2. Finds all NGOs within **50km radius**
3. If urgency is `CRITICAL`, **automatically assigns the nearest NGO**
4. Creates an `ActivityLog` entry for the creation
5. Emits `case:created` WebSocket event to all connected clients
6. If critical, also emits `case:critical` alert with list of nearby NGOs

**Query filters available:**
- `status`, `urgency`, `dateFrom`, `dateTo`
- `latitude`, `longitude`, `radiusKm` — for geospatial filtering
- `page`, `limit` — for pagination

**Auto-Escalation System:**
- A `setInterval` runs every **5 minutes** in `main.ts`
- Calls `casesService.checkAndEscalate()`
- If a case has been `OPEN` or `IN_PROGRESS` too long without resolution, it gets reassigned to the next nearest NGO
- Emits `case:escalated` WebSocket event

---

#### 🏢 NGOs Module (`/api/ngos`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/ngos` | List all NGOs (sorted by rating) |
| GET | `/api/ngos/:id/impact` | Get impact metrics for one NGO |
| PATCH | `/api/ngos/:id/verify` | Mark NGO as verified |
| GET | `/api/ngos/:id/credibility` | Get credibility score breakdown |

**Credibility Score Algorithm:**
A composite score (0-100) calculated from 4 weighted factors:
1. **Response Speed (35%)** — Average minutes from case assignment to first activity log
   - ≤30 min = 95 pts | ≤60 min = 80 pts | ≤120 min = 60 pts | >120 min = 40 pts
2. **Success Rate (30%)** — Resolved cases / Total assigned cases × 100
3. **Transparency (20%)** — Cases with financial records / Total cases × 100
4. **Community Rating (15%)** — NGO's star rating (0–5) scaled to 0–100

**Grade:** Excellent (≥80) / Good (≥60) / Developing (<60)

---

#### 💊 Medicines Module (`/api/medicines`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/medicines/donate` | List a medicine as available |
| GET | `/api/medicines/nearby` | Find medicines near a location |

---

#### 💰 Donations Module (`/api/donations`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/donations` | Record a donation |
| GET | `/api/cases/:id/financials` | Get all financial records for a case |

---

### 📡 WebSocket (Real-Time Events)

**Technology:** Socket.IO on NestJS (`@nestjs/platform-socket.io`)
**Namespace:** `/events`
**URL:** `ws://localhost:3000/events`

**Events emitted by the server:**

| Event | When it fires |
|---|---|
| `case:created` | A new rescue case is reported |
| `case:statusUpdate` | A case status changes (OPEN → IN_PROGRESS etc.) |
| `case:critical` | A critical urgency case is created |
| `case:escalated` | A case is auto-reassigned to another NGO |

**Frontend handling (`liveUpdates.js`):**
- Shows toast notifications for all events
- Shows a red banner alert for `case:critical` (auto-dismisses in 10 seconds)
- Refreshes the cases grid if the user is currently on the cases page
- Shows green "Live" indicator when connected, red "Offline" when not

---

### Security & Guards

- **JwtAuthGuard** — protects routes that require login
- **RolesGuard** — restricts routes based on user role (`@Roles('NGO')` etc.)
- **HttpExceptionFilter** — global error handler that returns structured JSON errors
- **ValidationPipe** — validates all incoming request bodies using DTOs (`class-validator`)
- **CORS** — enabled for all origins (development mode)

---

## 🔑 Authentication Flow

### Email/Password:
```
User fills form → POST /api/auth/login → bcrypt compares password → 
JWT issued → stored in localStorage → redirect to dashboard
```

### Google OAuth:
```
User clicks "Continue with Google" → GET /api/auth/google →
Passport redirects to Google consent screen →
User approves → Google redirects to /api/auth/google/callback →
Backend issues JWT → redirects to frontend /#/auth/callback?token=...&user=... →
Frontend parses URL → stores token → redirects to dashboard
```

---

## 🌐 Servers & Ports

| Service | Port | Technology |
|---|---|---|
| Frontend | 5500 | Deno static file server |
| Backend API | 3000 | NestJS / Node.js |
| WebSocket | 3000 | Socket.IO (same port as API) |

---

## 📦 Key Dependencies

### Backend
| Package | Version | Purpose |
|---|---|---|
| `@nestjs/core` | 10.x | Core NestJS framework |
| `@nestjs/jwt` | 10.x | JWT token creation/validation |
| `@nestjs/passport` | 10.x | Auth strategy integration |
| `passport-local` | 1.x | Email/password auth |
| `passport-jwt` | 4.x | JWT bearer token auth |
| `passport-google-oauth20` | latest | Google OAuth2 |
| `@prisma/client` | 5.22 | Database ORM |
| `bcrypt` | 5.x | Password hashing |
| `socket.io` | 4.7.4 | WebSocket server |
| `class-validator` | 0.14 | DTO validation |
| `class-transformer` | 0.5 | Object transformation |

### Frontend (CDN)
| Library | Version | Purpose |
|---|---|---|
| Leaflet.js | 1.9.4 | Interactive maps |
| Socket.IO Client | 4.7.4 | WebSocket connection |
| Lucide Icons | latest | SVG icon set |
| Google Fonts (Inter) | — | Typography |

---

## 🚀 Current State

| Feature | Status |
|---|---|
| Frontend SPA with all pages | ✅ Fully working |
| Mock data fallback | ✅ Works without backend |
| Backend API | ✅ Running on port 3000 |
| SQLite database | ✅ Created and migrated |
| Email/password auth | ✅ Working |
| JWT protected routes | ✅ Working |
| WebSocket live updates | ✅ Working |
| Geospatial NGO matching | ✅ Working (Haversine) |
| Auto-escalation scheduler | ✅ Running every 5 min |
| Credibility score system | ✅ Working |
| Dark mode toggle | ✅ Working |
| Responsive mobile design | ✅ Working |
| Google OAuth | ⚠️ Needs real credentials in `.env` |
| GitHub repo | ✅ Pushed to github.com/CallMeAk01/NGOConnect |

---

## 👥 Team

| Name | Role |
|---|---|
| Akshansh Rathore | Project Lead |
| Manish Kumar | Technology Lead |
| Bhupendra Singh | Innovation & Testing Lead |
| Sanskar Dubey | Marketing Lead |
