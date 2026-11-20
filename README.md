# Vivek Kumar Portfolio

Premium responsive portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Supabase contact form

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Run `supabase-contact.sql` in the Supabase SQL editor.

The contact route validates input, blocks honeypot submissions, and applies server-side rate limiting.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import it in Vercel.
3. Add the Supabase environment variables.
4. Deploy with the default Next.js settings.

## Assets

- Profile photograph: `public/images/profile.jpg`.
- Certificate: pending — add `public/certificates/python-ai-certificate.png`.
- Resume: pending — add `public/resume/vivek-kumar-resume.pdf`.
