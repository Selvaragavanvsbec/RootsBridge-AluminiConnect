# 🎓 AlumniConnect

> **Where Alumni Journeys Reunite** — A fully responsive alumni networking platform built with pure HTML, CSS, and Vanilla JavaScript.

![AlumniConnect Banner](https://img.shields.io/badge/AlumniConnect-v1.0-c9a84c?style=for-the-badge&logo=graduation-cap)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=fontawesome&logoColor=white)

---

## 📸 Features

- 🔍 **Alumni Directory** — Searchable & filterable grid with live search by name, company, batch, industry
- 📅 **Events Section** — Upcoming events with date display, type badges (Virtual / In-Person / Hybrid)
- 💼 **Job Board** — Alumni-referred job listings with salary and referral details
- 💬 **Alumni Stories** — Testimonials / success stories from the community
- 🔐 **Auth Modal** — Sign Up & Log In with tab switching and basic validation
- 🔔 **Toast Notifications** — Non-intrusive feedback for all user actions
- 📱 **Fully Responsive** — Mobile-first with hamburger navigation
- ✨ **Scroll Animations** — IntersectionObserver-powered reveal effects
- 🎨 **Editorial Design** — Playfair Display + DM Sans typography, gold/crimson palette

---

## 📁 Project Structure

```
alumni-connect/
├── index.html            ← Main HTML — all sections & markup
├── README.md             ← Project documentation
├── css/
│   └── style.css         ← All styles, CSS variables, animations, responsive rules
└── js/
    ├── data.js           ← Static data — alumni, events, stories, jobs arrays
    ├── render.js         ← DOM rendering functions for each section
    ├── modal.js          ← Auth modal logic — open/close/tabs/form validation
    ├── ui.js             ← UI utilities — toast, nav toggle, scroll, reveal observer
    └── app.js            ← Entry point — initialises everything on DOMContentLoaded
```

---

## 🚀 Getting Started

### Option 1 — Open Directly
No build tools or server required. Just open the file in your browser:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/alumni-connect.git

# Navigate into the project
cd alumni-connect

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html

# Open in browser (Windows)
start index.html
```

### Option 2 — Local Dev Server (recommended)
For a better development experience with live reload:

```bash
# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server

# Using Python
python -m http.server 8000
# Visit http://localhost:8000

# Using Node.js (npx)
npx serve .
# Visit http://localhost:3000
```

---

## 🛠️ Customisation

### Add / Edit Alumni
Open `js/data.js` and add entries to the `alumniData` array:

```javascript
{
  name: 'Your Name',
  role: 'Job Title',
  company: 'Company Name',
  batch: '2020',
  industry: 'Technology',   // Must match a filter option
  tags: ['Skill1', 'Skill2', 'Skill3'],
  initials: 'YN'            // 2-letter abbreviation for avatar
}
```

### Add Events
Edit the `eventsData` array in `js/data.js`:

```javascript
{
  month: 'Jan',
  day: '15',
  title: 'Event Title',
  location: 'City or Online',
  type: 'Virtual',          // Virtual | In-Person | Hybrid
  badge: 'badge-virtual'    // badge-virtual | badge-inperson | badge-hybrid
}
```

### Add Jobs
Edit the `jobsData` array in `js/data.js`:

```javascript
{
  logo: 'ABCD',             // 4-letter company abbreviation
  title: 'Job Title',
  company: 'Company Name',
  location: 'City or Remote',
  type: 'Full-time',
  salary: '₹XX–XX LPA',
  referral: 'Alumni Name (Batch YYYY)'
}
```

### Change Colours
All colours are CSS custom properties in `css/style.css`:

```css
:root {
  --ink:       #0d0d0d;   /* Primary dark */
  --paper:     #f5f0e8;   /* Background */
  --gold:      #c9a84c;   /* Accent gold */
  --crimson:   #8b1a2e;   /* Accent red */
  --sage:      #4a6741;   /* Accent green */
  --muted:     #7a7265;   /* Secondary text */
}
```

---

## 📦 Dependencies (CDN — no install needed)

| Library | Version | Purpose |
|---|---|---|
| [Google Fonts](https://fonts.google.com) | — | Playfair Display, DM Sans, DM Mono |
| [Font Awesome](https://fontawesome.com) | 6.4.0 | Icons throughout the UI |

No npm, no bundler, no framework — just open and run.

---

## 🌐 Deployment

### GitHub Pages (free)
1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your site will be live at `https://YOUR_USERNAME.github.io/alumni-connect`

### Netlify (free)
1. Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Instant live URL — no configuration needed

### Vercel (free)
```bash
npx vercel --prod
```

---

## 📄 File Descriptions

| File | Description |
|---|---|
| `index.html` | Main document with all HTML sections and layout structure |
| `css/style.css` | Complete stylesheet — variables, layout, components, animations, media queries |
| `js/data.js` | All static data arrays: alumni, events, stories, jobs |
| `js/render.js` | Functions that generate and inject HTML cards for each section |
| `js/modal.js` | Auth modal — open, close, tab switching, form validation |
| `js/ui.js` | Toast notifications, mobile nav, scroll effects, IntersectionObserver |
| `js/app.js` | DOMContentLoaded entry point that wires everything together |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📃 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- Typography: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Icons: [Font Awesome Free](https://fontawesome.com)
- Design inspiration: Editorial print design and classic alumni magazines

---

<div align="center">
  Made with ❤️ for the alumni community
  <br/>
  <strong>AlumniConnect v1.0</strong>
</div>
