# 🌍 LearnTogether

A full-stack real-time language exchange platform where learners connect with native speakers around the world to practice conversations, make friends, and grow their language skills together.

---

## ✨ Features

- 🔐 **Authentication** — Secure signup & login with JWT-based cookie sessions
- 🧭 **Onboarding Flow** — Set native language, learning language, bio, and location
- 💬 **Real-time Chat** — Powered by [Stream Chat](https://getstream.io/chat/), including text messaging
- 📹 **Video Calls** — In-app video calling via Stream Video React SDK
- 🤝 **Friend System** — Send, accept, and manage friend requests
- 🔔 **Notifications** — Real-time alerts for incoming friend requests
- 🔍 **User Search** — Find learners by username with debounced live search
- 👤 **Profile Management** — Edit profile with avatar upload to Cloudinary
- 🎨 **Theme Selector** — Multiple UI themes powered by DaisyUI
- 📱 **Responsive Design** — Mobile-friendly layout with sidebar & navbar

---

## 🧱 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| React Router v7 | Client-side routing |
| TanStack Query v5 | Server state management & caching |
| Zustand | Client state management |
| Tailwind CSS v4 + DaisyUI | Styling & component library |
| Stream Chat React SDK | Real-time chat UI |
| Stream Video React SDK | Video calling |
| Lucide React | Icon library |
| React Hot Toast | Notifications/toasts |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT + bcryptjs | Authentication & password hashing |
| Stream Chat (server SDK) | Chat user management |
| Cloudinary | Profile picture uploads |
| Cookie Parser | HTTP cookie handling |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |
| Nodemon | Development auto-restart |

---

## 🗂️ Project Structure

```
LearnTogether/
├── backend/
│   ├── config/
│   │   ├── connectDB.js          # MongoDB connection
│   │   └── connectstream.js      # Stream Chat config
│   ├── controllers/
│   │   ├── authControllers.js    # Signup, login, logout, onboard, profile
│   │   ├── userControllers.js    # User search, friends, requests
│   │   └── chatControllers.js    # Stream Chat token generation
│   ├── middleware/
│   │   └── auth.js               # JWT auth middleware
│   ├── models/
│   │   └── userSchema.js         # Mongoose user model
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── userRoute.js
│   │   └── chatRoute.js
│   ├── server.js                 # Express app entry point
│   └── vercel.json               # Vercel deployment config
│
└── frontend/
    ├── public/                   # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── ThemeSelector.jsx
    │   ├── hooks/                # Custom React hooks
    │   ├── lib/
    │   │   ├── api.js            # API helper functions
    │   │   └── axios.js          # Axios instance
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── Onboarding.jsx
    │   │   ├── Friends.jsx
    │   │   ├── Chatpage.jsx
    │   │   ├── Call.jsx
    │   │   ├── Notifications.jsx
    │   │   └── Profile.jsx
    │   ├── store/                # Zustand stores
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vercel.json               # Frontend Vercel config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- [Stream](https://getstream.io/) account (API key & secret)
- Cloudinary account (for profile picture uploads)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/LearnTogether.git
cd LearnTogether
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend dev server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🌐 Deployment

Both frontend and backend are configured for deployment on **Vercel**.

- **Backend** — `backend/vercel.json` handles serverless function routing
- **Frontend** — `frontend/vercel.json` handles SPA fallback routing

---

## 📡 API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/onboarding` | Complete user onboarding |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/update-profile` | Update profile |

### Users
| Method | Route | Description |
|---|---|---|
| GET | `/api/users` | Get recommended users |
| GET | `/api/users/friends` | Get friends list |
| GET | `/api/users/search` | Search users by username |
| POST | `/api/users/friend-request/:id` | Send a friend request |
| PUT | `/api/users/friend-request/:id/accept` | Accept a friend request |
| GET | `/api/users/friend-requests` | Get incoming/accepted requests |

### Chat
| Method | Route | Description |
|---|---|---|
| GET | `/api/chat/token` | Get Stream Chat user token |

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  Made with ❤️ for language learners everywhere
</div>
