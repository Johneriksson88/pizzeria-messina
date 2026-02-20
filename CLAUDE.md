# Pizzeria Messina - Project Context

## Overview
Website for Pizzeria Messina in Tyresö, Sweden. Built with Next.js 15 + Tailwind CSS v4.

**Live repo:** https://github.com/Johneriksson88/pizzeria-messina

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 (uses `@import "tailwindcss"` syntax)
- **Email:** Nodemailer (SMTP)
- **Language:** TypeScript

## Project Structure
```
app/
├── page.tsx              # Homepage
├── meny/page.tsx         # Full menu page
├── bestall/page.tsx      # Online order page
├── actions/order.ts      # Server action for orders
├── layout.tsx            # Root layout
components/
├── Header.tsx            # Site header with nav
├── Hero.tsx              # Homepage hero
├── MenuHighlights.tsx    # Featured dishes
├── About.tsx             # About section
├── Contact.tsx           # Contact info
├── Footer.tsx            # Site footer
├── FullMenu.tsx          # Menu display component
data/
├── menu.ts               # All menu data (pizzas, kebab, pasta, etc.)
lib/
├── email.ts              # Nodemailer SMTP integration
├── sheets.ts             # Google Sheets integration (prepared, not active)
```

## Brand Colors (CSS Variables)
```css
--pizzeria-red: #B8342E
--pizzeria-charcoal: #2C2824
--pizzeria-cream: #FBF7F2
--pizzeria-gold: #C8956C
--pizzeria-olive: #4A6741
--pizzeria-warm-gray: #7A7168
```

## Features

### Implemented
- [x] Homepage with hero, menu highlights, about, contact
- [x] Full menu page with category tabs (Pizza, Kebab, Pasta, Sallader, Lunch, etc.)
- [x] Online ordering page (`/bestall`) with cart functionality
- [x] Email notifications for orders via SMTP (Nodemailer)
- [x] Swedish language throughout

### Prepared (not active)
- [ ] Google Sheets menu integration (`lib/sheets.ts` ready)

## Menu Data
All menu items are in `data/menu.ts`:
- **Pizza:** 56 pizzas across 9 categories (Klass 1-3, Delikates, Gourmet, Mexikanska, Vegetariska, Inbakade, Pan)
- **Kebab:** 10+ items
- **Pasta:** 10+ items
- **Sallader:** 8 items
- **Lunch:** Daily specials + standard options (137kr inkl. läsk, bröd, sallad, kaffe)
- **Barnmeny:** Kids menu
- **À la Carte:** Steaks, chicken, etc.

## Environment Variables
See `.env.example` for required variables:

```
# Email (required for order notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ORDER_EMAIL_TO=recipient@example.com
ORDER_EMAIL_CC=optional-cc@example.com

# Google Sheets (optional, for dynamic menu)
GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/xxx/export?format=csv
```

## Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Common Tasks

### Update menu items
Edit `data/menu.ts` - all menu data is there with TypeScript types.

### Add new page
Create `app/your-page/page.tsx` - Next.js App Router convention.

### Change colors/styling
CSS variables are in `app/globals.css`. Tailwind classes used throughout.

### Test email orders
1. Configure `.env.local` with Gmail App Password
2. Run `npm run dev`
3. Go to `/bestall`, add items, submit order
4. Check inbox for order email

## Notes
- Design based on Pencil.dev mockup (pizzeria theme)
- All text in Swedish
- Phone: 08-447 70 64
- Address: Tyresö (displayed in Contact section)
