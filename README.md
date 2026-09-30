# Sanidhya Vats Portfolio

Next.js 16, React 19, TypeScript, and Tailwind CSS portfolio deployed at https://sanidhyavats.me.

## Develop and verify

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run typecheck
npm start
npm run verify
```

`verify` checks the running production server at http://localhost:3000. Set `VERIFY_ORIGIN` to test another server. GitHub Actions runs a production dependency audit, lint, production build, type checking, and route checks on pushes to main and pull requests.

## Content and routes

Update projects, experience, skills, and achievements in `data/portfolio.ts`. Projects automatically appear in the works archive, receive detail pages, and enter the sitemap. Preserve existing project IDs so published URLs keep working.

- `/`: portfolio homepage
- `/works`: filterable projects and grid/reveal views
- `/about`: profile, experience, skills, and achievements
- `/projects/[id]`: individual project details
- `/resume`: original resume preview and PDF links
- `/resume/download`: PDF attachment download
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`: search and sharing metadata

## Deployment

Build command: `npm run build`. Use Next.js hosting (such as Vercel), rather than a static-only export, to retain image optimization, the feedback API, and download headers/rewrites. Connect the custom domain in the hosting provider and keep `lib/seo.ts` aligned with the canonical production domain.

Barlow fonts are self-hosted with their SIL Open Font License files under `public/fonts`. Font files use immutable caching: use a new filename if replacing a font. Images are served through Next.js with responsive sizes; original photos and layout are retained.

## Feedback configuration

Set the SMTP variables listed in `.env.example` in the hosting provider to enable email delivery. Keep credentials out of source control. The API validates content, size, origin, and rating, escapes HTML, and uses bounded SMTP timeouts. CI checks invalid requests without sending email. Actual email delivery requires configured credentials and a separate authorized delivery check. Use your hosting provider's firewall/rate limiting if exposing the feedback endpoint to significant traffic; application validation does not replace distributed abuse protection.

## Operational checks

After deployment, verify the canonical domain, resume download, sitemap, and social preview. Submit the sitemap in your own search-console account when ready. Search indexing and rankings are controlled by search engines; metadata does not guarantee placement. No analytics, tracking, or cookie collection has been added.
