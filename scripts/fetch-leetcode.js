// Saves a copy of my LeetCode stats to src/data/leetcode.json before every build (`prebuild`).
// The site shows live numbers from the Netlify function; this copy is the fallback when that is unavailable
// (for example in local development). If LeetCode can't be reached, the existing copy is kept.
const fs = require('fs');
const path = require('path');
const { fetchLeetCode } = require('./leetcode');

const OUT = path.join(__dirname, '..', 'src', 'data', 'leetcode.json');

fetchLeetCode()
  .then((stats) => {
    fs.writeFileSync(OUT, `${JSON.stringify(stats)}\n`);
    console.log(`LeetCode stats saved: ${stats.solved} solved, ${stats.activeDays} active days.`);
  })
  .catch((error) => console.warn(`LeetCode stats not refreshed (${error.message}); keeping the saved copy.`));
