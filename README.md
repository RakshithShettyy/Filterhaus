# FilterHaus

One-page site for FilterHaus, a Bengaluru creative production house. Next.js (App Router), TypeScript and Tailwind CSS. All public copy, prices and contact details live in one file.

## Edit the site

Open `src/data/site.ts`.

- Change words, prices, hours, the WhatsApp greeting, email and phone there. Components read from this file.
- `showPrices: false` hides every price, the budget field and the price footnote.
- `features.introLoader: false` turns off the opening aperture.
- `features.customCursor: false` turns off the gold cursor.
- `features.smoothScroll: false` turns off Lenis and keeps native scrolling.
- `features.showTestimonials: false` keeps the testimonials block out of the page. Leave the array empty until you have real quotes. Do not invent them.

WhatsApp buttons use `waLink()`. Pass extra text when a button should mention a package or a form. Phone links use `tel:`. Email links use `mailto:`.

## Images and video

Put files in `public/`. The page already ships with temporary stills so the layout can be reviewed. Replace them with the real photographs, keeping the same file names, or update the paths in `src/data/site.ts`.

| File | Used for |
| --- | --- |
| `public/logo.png` | Navigation, footer, intro |
| `public/hero.jpg` | Hero still, and the video poster |
| `public/hero.mp4` | Optional muted hero loop. If the file is missing, or the connection is slow, the still is used |
| `public/showreel.mp4` | Showreel in the second section. Until the file is there, the hero still is shown |
| `public/og.jpg` | Link preview (Open Graph and Twitter), 1200×630 |
| `public/work/homestay-01.jpg` … `homestay-08.jpg` | Homestay gallery |
| `public/services/photography.jpg` | Photography card |
| `public/services/reels.jpg` | Reels card |
| `public/services/brand-films.jpg` | Brand films card |
| `public/about/founder.jpg` | Founder portrait |
| `src/app/icon.png` | Favicon |
| `src/app/apple-icon.png` | Apple touch icon |

`next/image` serves these on Vercel with resizing. Width and height for each picture are set beside the path in `src/data/site.ts`. If a replacement has a very different shape, update those numbers.

The favicon files above are drawn from the placeholder mark. After you add the real logo, export a square PNG of it to `src/app/icon.png` (512×512 is plenty) and `src/app/apple-icon.png` (180×180).

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

`npm run build` must pass before you deploy. The site does not use a database, server actions or tracking scripts, so it can also be exported as static files later: set `output: "export"` and `images.unoptimized: true` in `next.config.ts`, then `npm run build` writes an `out/` folder.

## Deploy on Vercel

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New Project** and import the repository.
3. Framework preset: Next.js. Leave the build command as `npm run build` and the output as the default (do not set it to `out` unless you switched on static export).
4. Do not add environment variables. Nothing secret is required.
5. Deploy. Vercel gives you a `*.vercel.app` address.

## Custom domain

1. In the Vercel project, open **Settings → Domains** and add the domain, for example `filterhaus.in`.
2. At the registrar, add the DNS records Vercel shows (usually an `A` record for the apex and a `CNAME` for `www`).
3. Wait for the certificate to issue.
4. Set `url` in `src/data/site.ts` to the live origin, including `https://`, with no trailing slash. That value is the canonical URL, the sitemap and the Open Graph address. Redeploy after changing it.

## Motion

The opening sequence, smooth scroll, magnetic buttons, marquee, parallax and custom cursor turn off when the visitor has **prefers reduced motion** enabled. Content stays in the page if JavaScript does not run.

## Studio desk

The public site has no login button. Open [http://localhost:3000/login](http://localhost:3000/login) directly.

Create `.env.local` in the project folder:

```
ADMIN_PASSWORD=choose-a-password
```

Restart `npm run dev` after you change it. The desk lets you replace the hero still, the three service stills, the work gallery, and the founder portrait. Each photo needs a short description. Files are saved in `public/uploads`, and the list is saved in `content/homepage.json`. Commit both if you want those photos to stay after a deploy. On Vercel the desk can save a photo, but the disk there is temporary, so commit the new files or the next deploy will drop them.

## Replace before launch

- [ ] Instagram URL in `src/data/site.ts` (`contact.instagram`). It is currently `https://instagram.com/TODO`.
- [ ] Live site URL (`url`). It is currently `https://filterhaus.in`.
- [x] `public/logo.png` (the mark, with no white tile; favicons were cut from the original avatar)
- [ ] `public/hero.jpg` and, if you have a loop, `public/hero.mp4`
- [ ] `public/og.jpg`
- [x] `src/app/icon.png` and `src/app/apple-icon.png`, cut from the logo
- [ ] Gallery stills `public/work/homestay-01.jpg` through `homestay-08.jpg`
- [ ] Alt text for those stills, and the hero alt (`hero.mediaAlt`). Every alt is marked `TODO`
- [ ] Service preview stills in `public/services/` and their alt text
- [ ] `public/about/founder.jpg`
- [ ] Founder name and bio (`about.founder.name`, `about.founder.bio`)
- [ ] Homestay case study: brief, approach and what was delivered (`work.caseStudy`)
- [ ] Café and D2C case studies when they exist (the two “Coming soon” slots)
- [ ] Confirm the phone, email, hours and package prices are still correct
