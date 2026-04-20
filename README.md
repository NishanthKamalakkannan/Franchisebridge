# FranchiseBridge 
### AI-Powered Franchise Discovery Platform

> Find, compare, and get personalised franchise recommendations using Grok AI — built for first-time entrepreneurs in Chennai.

---

##  Live Demo

| Service | URL |
|---------|-----|
| Frontend | [franchisebridge.vercel.app](https://franchisebridge.vercel.app/) |
| Backend | [franchisebridge-api.onrender.com]([https://franchisebridge-api.onrender.com]) |

---

##  About the Project

FranchiseBridge is a full-stack web application that helps first-time entrepreneurs discover the right franchise opportunity in Chennai. Instead of spending hours researching, users answer 5 quick questions and the platform's AI engine instantly ranks the best-matching franchises based on their budget, preferred zones, experience level, and risk tolerance.

The platform supports two roles:
- **Franchise Seekers** — discover, compare, and inquire about franchises
- **Franchise Owners** — list and manage franchise opportunities

---

##  Features

###  AI-Powered (Grok AI — grok-3-mini)
- **Smart Recommendations** — ranks top 6 franchises based on your profile
- **Plain-Language Explainer** — explains any franchise in simple, jargon-free language
- **Multi-turn Chat Advisor** — ask anything about a franchise in a conversational chat
- **90-Day Launch Roadmap** — generates a personalised step-by-step plan to open your franchise
- **Side-by-Side Comparison** — AI compares two franchises and picks the better fit for you

###  Platform Features
- Quiz-based seeker profiling
- Real franchise dataset across 8 categories (Tea & Coffee, Biryani, Pharmacy, Salon, Car Care, Laundry, Shawarma, and more)
- Financial data per franchise: investment range, royalty level, breakeven period, monthly revenue, and viability score
- Inquiry management for seekers and owners
- Franchise listing management for owners
- Full-text search and category/budget filtering

###  Auth & Security
- JWT authentication with role-based access (Seeker vs Owner)
- bcrypt password hashing
- Rate limiting on all API endpoints (20 req/min on AI endpoints)

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI | Grok API (grok-3-mini) via OpenAI-compatible SDK |
| Auth | JWT, bcryptjs |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Deployment | Vercel (frontend), Render (backend) |

---

##  Project Structure

```
franchise-platform/
├── backend/
│   ├── middleware/
│   │   └── auth.js           # JWT auth middleware
│   ├── models/
│   │   ├── Franchise.js      # Franchise schema
│   │   ├── Inquiry.js        # Inquiry schema
│   │   └── User.js           # User schema
│   ├── routes/
│   │   ├── ai.js             # All Grok AI endpoints
│   │   ├── auth.js           # Register / Login / Me
│   │   ├── franchises.js     # Franchise CRUD
│   │   ├── owner.js          # Owner dashboard routes
│   │   └── seeker.js         # Seeker dashboard routes
│   ├── seed/
│   │   └── franchises_data.json  # Seed data
│   └── server.js             # Express app entry point
│
└── frontend/
    └── src/
        ├── api/              # Axios API calls
        ├── components/       # Navbar, UI components
        ├── context/          # Auth context
        ├── pages/            # All page components
        └── utils/            # Helper functions
```

---

##  Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Grok API key from [x.ai](https://x.ai)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/franchisebridge.git
cd franchisebridge/franchise-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROK_API_KEY=your_grok_api_key
PORT=5000
```

Seed the database:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend`:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

---

##  Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Seeker | seeker@test.com | seeker123 |
| Owner | owner@test.com | owner123 |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/recommend` | Get AI franchise recommendations |
| POST | `/api/ai/explain` | Explain a franchise in plain language |
| POST | `/api/ai/chat` | Multi-turn franchise chat |
| POST | `/api/ai/roadmap` | Generate 90-day launch roadmap |
| POST | `/api/ai/compare` | Compare two franchises |

### Franchises
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/franchises` | List all franchises |
| GET | `/api/franchises/:id` | Get franchise details |
| POST | `/api/franchises` | Create franchise (owner only) |

---

##  Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ for first-time entrepreneurs in Chennai</p>
