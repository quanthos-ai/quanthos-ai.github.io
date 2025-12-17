# Quanthos Website - AI Coding Guidelines

## Architecture Overview
This is a single-page React application built with Vite, TypeScript, and Tailwind CSS. The app features bilingual support (English/Arabic) with RTL layout switching.

**Key Structure:**
- `src/App.tsx`: Main component containing all sections (nav, hero, services, portfolio, team, footer)
- `src/data/content.ts`: Centralized content object with EN/AR translations
- `src/assets/`: Static assets (images, PDF portfolio)
- Custom Tailwind colors defined in `tailwind.config.js` (quanthos-dark, quanthos-magenta, etc.)

## Development Workflow
- **Start dev server**: `npm run dev` (Vite hot reload)
- **Build**: `npm run build` (outputs to `dist/`)
- **Lint**: `npm run lint` (ESLint with TypeScript rules)
- **Type check**: `npm run typecheck` (TypeScript compiler)
- **Live site**: https://quanthos-ai.github.io/

## Content Management
All text content is stored in `src/data/content.ts` as a nested object:
```typescript
content[lang].section.key
```
- Add new content keys here, not hardcoded in components
- Maintain parallel EN/AR structure for all new text

## Styling Patterns
- Use custom `quanthos-*` color classes from `tailwind.config.js`
- Apply `bg-gradient-main` for main gradient background
- Use `backdrop-blur-md` and `bg-white/10` for glassmorphism effects
- RTL support: Check `isRTL` boolean and apply `dir="rtl"` to containers
- Arabic font: Automatically applied via CSS when `dir="rtl"`

## Language Toggle
- State: `const [lang, setLang] = useState<'en' | 'ar'>('en')`
- Toggle function: `setLang(prev => prev === 'en' ? 'ar' : 'en')`
- Access content: `const t = content[lang]`
- Icon rotation: `className={isRTL ? "rotate-180" : ""}` for arrows

## Integrations
- **Calendly**: Popup modal for booking consultations
- **Supabase**: Imported but not yet implemented (future backend)
- **Lucide React**: Icon library (Globe, ArrowRight, CheckCircle, etc.)

## Component Conventions
- Single App component with section IDs for navigation
- Fixed nav with backdrop blur
- Hero section with methodology badge
- Service cards with hover gradient borders
- Portfolio stats in grid layout
- Team cards with circular images
- Footer with copyright

## Asset Handling
- Import images: `import logo from './assets/filename.svg'`
- PDF download: Link to `/src/assets/Quanthos Portfolio.pdf`
- Ensure assets exist in `src/assets/` folder

## Deployment
- Built for GitHub Pages at `quanthos-ai.github.io/`
- Base path set to `/` in `vite.config.ts`
- Static site, no server-side rendering</content>
<parameter name="filePath">c:\D\Personal\Udacity Data Analysis Course\Personal Projects\Quanthos\Quanthos_website\.github\copilot-instructions.md