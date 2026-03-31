# 🗣️ Talk2Learn

A **real-time language exchange platform** that connects people worldwide to practice languages through text chat, video calls, and a social friend system.

> Learn languages by talking to native speakers — not flashcards.

🔗 **Live Demo:** [talk2-learn.vercel.app](https://talk2-learn.vercel.app)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based auth with HTTP-only cookies & bcrypt password hashing
- 🎯 **Smart User Discovery** — Find language partners based on native & learning languages
- 👥 **Friend System** — Send, accept, and manage friend requests
- 💬 **Real-Time Chat** — Instant messaging powered by Stream SDK with typing indicators & read receipts
- 📹 **Video Calling** — WebRTC-based peer-to-peer video/audio calls via Stream Video SDK
- 🖼️ **Profile Management** — Upload photos via Cloudinary with face-detection cropping
- 🎨 **Dark/Light Theme** — Persistent theme toggle with DaisyUI
- 🌍 **14+ Languages** — English, Spanish, French, German, Mandarin, Japanese, Korean, Hindi, and more
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### Frontend

| Technology                | Purpose                           |
| ------------------------- | --------------------------------- |
| React 19                  | UI component library              |
| Vite 7                    | Build tool with fast HMR          |
| React Router 7            | Client-side routing               |
| TanStack React Query 5    | Server state management & caching |
| Zustand 5                 | Client state (theme persistence)  |
| TailwindCSS 4 + DaisyUI 5 | Styling & component library       |
| Stream Chat React         | Real-time messaging UI            |
| Stream Video React SDK    | Video calling UI                  |
| Lucide React              | Icon library                      |

### Backend

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| Node.js + Express 5  | REST API server                         |
| MongoDB + Mongoose 8 | Database & ODM                          |
| JWT + bcryptjs       | Authentication & password hashing       |
| Stream Chat SDK      | Server-side chat/video token management |
| Cloudinary           | Image upload & CDN                      |
| cookie-parser + CORS | Cookie handling & cross-origin support  |

---

## 🏗️ Architecture

```
Talk2Learn/
├── frontend/                # React + Vite SPA
│   ├── src/
│   │   ├── pages/           # Login, Signup, Home, Chat, Call, Friends, Profile, etc.
│   │   ├── components/      # Navbar, Sidebar, FriendCard, UserProfileModal, etc.
│   │   ├── hooks/           # useAuthUser, useLogin, useSignUp, useLogout
│   │   ├── store/           # Zustand theme store
│   │   ├── lib/             # API functions, axios instance, utilities
│   │   └── constants/       # Languages, themes, flag mappings
│   └── package.json
│
├── backend/                 # Node.js + Express API
│   ├── config/              # MongoDB & Stream connections
│   ├── controllers/         # Auth, User, Chat business logic
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # User & FriendRequest schemas
│   ├── routes/              # API route definitions
│   └── server.js            # Entry point
```

---

## 🔄 How It Works

1. **Sign Up** → Create account with email/password (hashed with bcrypt)
2. **Onboard** → Set native language, learning language, bio, location, profile picture
3. **Discover** → Browse recommended language partners (excludes existing friends)
4. **Connect** → Send friend requests, accept incoming ones
5. **Chat** → Open real-time messaging with friends (Stream Chat)
6. **Video Call** → Start a video call and share the link in chat (Stream Video + WebRTC)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- [Stream](https://getstream.io/) account (API key & secret)
- [Cloudinary](https://cloudinary.com/) account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STEAM_KEY=your_stream_api_key
STEAM_SECRET_KEY=your_stream_api_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=development
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

```bash
npm run dev
```

---

## 🔒 Security

- Passwords hashed with **bcrypt** (10 salt rounds)
- JWT stored in **HTTP-only cookies** (prevents XSS)
- **SameSite + Secure** cookie flags in production (prevents CSRF)
- CORS restricted to whitelisted frontend origin
- Password excluded from all query responses

---

## 🗺️ Future Roadmap

- [ ] AI-powered language proficiency matching
- [ ] Group chat rooms for topic-based practice
- [ ] Voice messages for pronunciation practice
- [ ] Gamification — streaks, badges, leaderboards
- [ ] Real-time translation overlay for beginners
- [ ] React Native mobile app

---

<p align="center">
  Built with ❤️ by <strong>Shreyansh</strong>
</p>
