# Portfolio

My personal portfolio: [srikarambula.netlify.app](https://srikarambula.netlify.app/).

Built with React, Tailwind CSS and Framer Motion, with light and dark mode. Pages: Home (with an interactive
"ask me" terminal), About (skills and LeetCode stats), Experience, Projects, Hobbies (a cricket nets mini-game and
an F1 lights-out reaction test) and Contact (EmailJS).

## Update the content

Almost everything the site says lives in one file: [`src/data/profile.js`](src/data/profile.js).
Edit it to change the intro, experience, projects, skills or socials. Project screenshots are in
`src/assets/`, and the resume served by the site is `public/Srikar_Ambula_Resume.pdf`.

## LeetCode stats

`npm run build` first runs `scripts/fetch-leetcode.js`, which saves my public LeetCode numbers to
`src/data/leetcode.json`, so every deploy shows fresh stats. If LeetCode can't be reached, the saved copy is used.
Run `node scripts/fetch-leetcode.js` to refresh it by hand.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Build

```bash
npm run build
```

The production files go to `build/`. Netlify serves the site from there; `public/_redirects` makes page
refreshes on routes like `/projects` work.

## Structure

```
src/
  data/profile.js        all site content
  pages/                 one file per route
  components/            navbar, footer, background, cards, animation helpers
  components/hobbies/    cricket nets, F1 lights-out game, F1 car animation
  theme.js               light/dark mode
  index.css              colour tokens (light + dark), Tailwind layers, animations
scripts/fetch-leetcode.js  build-time LeetCode stats
```

## Connect

- LinkedIn: [Srikar Ambula](https://www.linkedin.com/in/srikar-ambula-66a647277/)
- GitHub: [Srikar4510](https://github.com/Srikar4510)
