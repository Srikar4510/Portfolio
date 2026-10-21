// Live LeetCode stats for the About page: /.netlify/functions/leetcode
// LeetCode doesn't allow browsers on other sites to call it directly, so this small server-side function does.
// Netlify's CDN caches the answer for 30 minutes so LeetCode isn't called on every visit.
const { fetchLeetCode } = require('../../scripts/leetcode');

exports.handler = async () => {
  try {
    const stats = await fetchLeetCode();
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=0, must-revalidate',
        'netlify-cdn-cache-control': 'public, max-age=1800, stale-while-revalidate=86400',
      },
      body: JSON.stringify(stats),
    };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: error.message }) };
  }
};
