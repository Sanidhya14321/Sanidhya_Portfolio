# Professional Portfolio - Sanidhya Vats

A modern, high-performance portfolio showcasing full-stack development and machine learning engineering expertise. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Multi-Theme System**: Four distinct themes (Aurora Glow, Industrial Bento, Glassmorphism, Dark Horse) with user-controlled theme switching
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion animations throughout
- **Accessibility**: WCAG compliant with skip-to-content links and keyboard navigation
- **Performance**: Optimized for Core Web Vitals
- **SEO Optimized**: Comprehensive meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Sanidhya_Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects archive
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ThemeSwitcher.tsx
├── contexts/              # React contexts
│   └── ThemeContext.tsx
├── data/                  # Portfolio data
│   └── portfolio.ts
└── public/                # Static assets
```

## Customization

### Update Portfolio Content

Edit the content in `data/portfolio.ts`:
- Personal information
- Experience and education
- Projects
- Skills
- Social links

### Add Projects

Add your projects to the `featuredProjects` or `otherProjects` arrays in `data/portfolio.ts`:

```typescript
{
  id: "project-id",
  title: "Project Title",
  description: "Description",
  tech: ["Next.js", "TypeScript"],
  status: "Live",
  github: "https://github.com/...",
  demo: "https://...",
  highlights: ["Feature 1", "Feature 2"]
}
```

### Modify Themes

Theme styles are defined in:
- `tailwind.config.ts` - Color palette
- `app/globals.css` - Theme-specific CSS
- `contexts/ThemeContext.tsx` - Theme logic

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

### Other Platforms

Build the production bundle:
```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

Sanidhya Vats
- GitHub: [github.com/sanidhyavats](https://github.com/sanidhyavats)
- LinkedIn: [linkedin.com/in/sanidhyavats](https://linkedin.com/in/sanidhyavats)
- Email: sanidhya@example.com

---

Built with Next.js, TypeScript, and Framer Motion
