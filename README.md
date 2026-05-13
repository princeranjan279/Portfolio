# 🚀 Prince Ranjan — Personal Portfolio

A premium, fully responsive personal portfolio website built with **React + TypeScript + Vite**, featuring a Metronic-inspired dark/light design system.

## 🌐 Live Site
> Deployed at: *(add your live URL here after deployment)*

## 👤 About
**Prince Ranjan** — Frontend Developer, WordPress Expert, Social Media Manager & Digital Marketing Adviser from India.

- 📧 Email: [princeranjan270@gmail.com](mailto:princeranjan270@gmail.com)
- 📞 Phone: +91 7004136051
- 💼 LinkedIn: [prince-ranjan-5ba3a0172](https://www.linkedin.com/in/prince-ranjan-5ba3a0172/)
- 🐙 GitHub: [princeranjan279](https://github.com/princeranjan279)

## 📄 Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Typing hero, stats, skills, testimonials |
| About | `/about` | Bio, skill bars, experience timeline |
| Services | `/services` | 4 service tabs with pricing |
| Projects | `/projects` | Project grid with filters |
| Gallery | `/gallery` | Media grid with lightbox |
| Contact | `/contact` | Form + social links |

## ⚡ Tech Stack
- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Routing**: React Router DOM v6
- **Icons**: Lucide React + Custom SVG icons
- **Fonts**: Inter + Outfit (Google Fonts)
- **Styling**: Pure CSS with custom design system (dark/light mode)

## 🎨 Features
- ✅ Dark / Light mode toggle (persisted in localStorage)
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animated page transitions
- ✅ Premium glassmorphism card design
- ✅ Typing animation hero
- ✅ Animated skill progress bars
- ✅ Lightbox gallery
- ✅ Contact form with validation
- ✅ Newsletter subscription (footer)
- ✅ Mobile drawer navigation

## 🛠️ Local Setup

```bash
# Clone the repository
git clone https://github.com/princeranjan279/prince-portfolio.git

# Navigate into directory
cd prince-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx       # Responsive navbar + theme toggle
│   ├── Footer.tsx       # Premium 4-column footer
│   └── SocialIcons.tsx  # Custom SVG social icons
├── context/
│   └── ThemeContext.tsx  # Dark/Light mode context
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Gallery.tsx
│   └── Contact.tsx
├── App.tsx
├── main.tsx
└── index.css            # Global design system + CSS variables
```

---

Made with ❤️ by **Prince Ranjan**
