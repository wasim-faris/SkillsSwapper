<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=200&section=header&text=SkillSwapper&fontSize=60&fontColor=fff&animation=twinkling&desc=Swap%20Skills.%20Grow%20Together.&descAlignY=68&descColor=00d4ff" />

<br/>

![Status](https://img.shields.io/badge/Status-In%20Development-00d4ff?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-Django%20%2B%20React-7b2cbf?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br/>

> **Know Django but want to learn React?**
> Find someone who knows React but wants to learn Django.
> Teach each other. No money. Just knowledge.

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Design](#-system-design)
- [Getting Started](#-getting-started)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 🧠 About

**SkillSwapper** is a peer-to-peer skill exchange social platform — think LinkedIn meets Instagram, but instead of jobs or photos, you exchange knowledge.

Users list what they **know** and what they **want to learn**. The platform matches them with the right people. They connect, schedule a **Google Meet session**, and teach each other — no money involved, just mutual growth tracked through a **credit system**.

---

## ✨ Features

### 🔐 Auth & Profiles
- JWT-based login & signup with refresh tokens
- Google OAuth login *(planned)*
- User profiles with skills offered & skills wanted
- Credit score system — earn by teaching, spend by learning

### 📱 Social Feed
- Post updates, share learning progress
- Like, comment, and share posts
- Follow/unfollow users
- Explore feed with smart skill-based recommendations

### 🔄 Skill Swap System
- Send & receive swap requests
- Accept, reject or counter-propose swaps
- Active swap tracking dashboard
- Swap history & ratings

### 💬 Real-Time Messaging
- One-on-one real-time chat (Django Channels + WebSocket)
- Message read receipts
- Chat history preserved per swap

### 📹 Google Meet Integration
- Schedule learning sessions directly in the app
- Auto-generate Google Meet links per session
- Session reminders & calendar sync *(planned)*

### 🏆 Credit System
- Earn credits by completing teaching sessions
- Spend credits to request learning sessions
- Leaderboard of top contributors

### 🔔 Notifications
- Real-time notifications for swap requests, messages, likes
- Email notifications for session reminders

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python / Django | Core backend framework |
| Django REST Framework | REST API |
| Django Channels | WebSocket / real-time messaging |
| PostgreSQL | Primary database |
| Redis | Channel layer for WebSockets |
| JWT (SimpleJWT) | Authentication |
| Celery | Background tasks & notifications |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations & transitions |
| Axios | API communication |
| Socket.IO / WebSocket | Real-time chat |

### DevOps & Tools
| Tool | Purpose |
|---|---|
| Git & GitHub | Version control |
| Figma | UI/UX design |
| Postman | API testing |
| Google Meet API | Session scheduling |

---

## 🏗 System Design

```
┌─────────────────────────────────────────────┐
│                   Client                     │
│           React + Tailwind + Framer          │
└──────────────────┬──────────────────────────┘
                   │ HTTP / WebSocket
┌──────────────────▼──────────────────────────┐
│              Django Backend                  │
│   ┌─────────┐  ┌──────────┐  ┌──────────┐  │
│   │  REST   │  │ Channels │  │  Celery  │  │
│   │   API   │  │   WS     │  │  Tasks   │  │
│   └────┬────┘  └────┬─────┘  └────┬─────┘  │
└────────┼────────────┼─────────────┼─────────┘
         │            │             │
┌────────▼────┐  ┌────▼────┐  ┌────▼─────┐
│ PostgreSQL  │  │  Redis  │  │  Email   │
│     DB      │  │ Channel │  │  SMTP    │
└─────────────┘  └─────────┘  └──────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL
- Redis

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/wasim-faris/skillswap.git
cd skillswap/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your DB and Redis credentials

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup

```bash
cd skillswap/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Environment Variables

```env
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/skillswap
REDIS_URL=redis://localhost:6379
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 📸 Screenshots

> 🚧 Screenshots will be added as features are completed.

---

## 🗺 Roadmap

```
✅ Phase 1 — Core Auth & Profiles
✅ Phase 2 — Skill Matching Algorithm
✅ Phase 3 — Social Feed (Posts, Likes, Comments)
✅ Phase 4 — Swap Request System
🔄 Phase 5 — Real-Time Chat (In Progress)
⏳ Phase 6 — Google Meet Integration
⏳ Phase 7 — Credit System & Leaderboard
⏳ Phase 8 — Mobile Responsive Polish
⏳ Phase 9 — Deployment
```

---

## 👨‍💻 Author

<div align="center">

**Wasim Faris**
*Full Stack Developer — Kerala, India*

[![GitHub](https://img.shields.io/badge/GitHub-wasim--faris-0d1117?style=for-the-badge&logo=github&logoColor=00d4ff)](https://github.com/wasim-faris)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Wasim%20Faris-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/wasim-faris)
[![Email](https://img.shields.io/badge/Email-waseemfaris179%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:waseemfaris179@gmail.com)

</div>

---

<div align="center">

*⭐ Star this repo if you find it interesting!*

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=100&section=footer"/>

</div>