# 🌉 RootsBridge – Alumni Connect Platform

> Connecting generations of talent through mentorship, networking, and career opportunities.

RootsBridge is a full-stack alumni networking platform that connects alumni, students, and administrators for mentorship, career opportunities, events, and community building.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email + Password) |
| Frontend Hosting | Netlify |
| Backend Hosting | Vercel |

---

## 📁 Folder Structure

```
RootsBridge/
├── frontend/
│   ├── index.html          # Landing page
│   ├── login.html          # Auth (login/signup)
│   ├── dashboard.html      # Role-based dashboard
│   ├── alumni.html         # Alumni directory & search
│   ├── jobs.html           # Job & internship board
│   ├── mentorship.html     # Mentorship hub
│   ├── events.html         # Events & reunions
│   ├── messages.html       # Direct messaging
│   ├── profile.html        # User profile
│   ├── admin.html          # Admin analytics
│   ├── css/
│   │   └── styles.css      # Shared design system
│   └── js/
│       ├── config.js       # API config & auth utils
│       ├── api.js          # API client
│       └── app.js          # Shared UI utilities
├── backend/
│   ├── server.js           # Express entry point
│   ├── package.json
│   ├── .env.example
│   ├── supabase/
│   │   └── client.js       # Supabase client init
│   ├── middleware/
│   │   └── auth.js         # JWT auth middleware
│   └── routes/
│       ├── auth.js         # /api/auth
│       ├── users.js        # /api/users
│       ├── alumni.js       # /api/alumni
│       ├── jobs.js         # /api/jobs
│       ├── mentorship.js   # /api/mentorship
│       ├── events.js       # /api/events
│       └── messages.js     # /api/messages
├── supabase/
│   └── schema.sql          # Database schema
├── vercel.json             # Vercel deployment config
├── netlify.toml            # Netlify deployment config
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Settings → API** and note your:
   - `Project URL`
   - `anon (public)` key
   - `service_role` key

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
npm install
npm start
```

The API server starts at `http://localhost:5000`.

### 3. Frontend Setup

Update `frontend/js/config.js` with your API URL and Supabase credentials:

```javascript
const CONFIG = {
  API_URL: 'http://localhost:5000/api',
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
};
```

Open `frontend/index.html` in your browser, or use a local server:

```bash
npx serve frontend
```

---

## 🌐 Deployment

### Frontend → Netlify

1. Push your code to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set **Publish directory** to `frontend/`
4. Add environment variables in Netlify dashboard
5. Deploy

The `netlify.toml` is already configured.

### Backend → Vercel

1. Install the [Vercel CLI](https://vercel.com/cli): `npm i -g vercel`
2. Run `vercel` from the project root
3. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy with `vercel --prod`

The `vercel.json` is already configured.

### Database → Supabase

1. Go to your Supabase project → SQL Editor
2. Paste and run `supabase/schema.sql`
3. Enable Row Level Security (automatically configured in schema)
4. Enable Email auth in **Authentication → Providers**

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for server-side operations |
| `PORT` | Backend server port (default: 5000) |
| `FRONTEND_URL` | Frontend URL for CORS (default: *) |

---

## 📋 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/users/profile` | Get current profile |
| PUT | `/api/users/profile` | Update profile |
| GET | `/api/alumni/search` | Search alumni |
| POST | `/api/jobs/create` | Post a job (alumni) |
| GET | `/api/jobs/list` | List jobs |
| POST | `/api/jobs/apply` | Apply for job (student) |
| POST | `/api/mentorship/request` | Request mentorship |
| POST | `/api/mentorship/accept` | Accept/reject mentorship |
| GET | `/api/mentorship/list` | List mentorship requests |
| POST | `/api/events/create` | Create event |
| GET | `/api/events/list` | List events |
| POST | `/api/events/rsvp` | RSVP to event |
| POST | `/api/messages/send` | Send message |
| GET | `/api/messages/conversation/:id` | Get conversation |
| GET | `/api/messages/inbox` | Get inbox |

---

## 👥 User Roles

- **Alumni**: Create profiles, post jobs, mentor students, host events
- **Students**: Search alumni, apply for jobs, request mentorship, join events
- **Administrators**: Manage users, events, view analytics, export reports

---

## 📄 License

MIT © 2025 RootsBridge
