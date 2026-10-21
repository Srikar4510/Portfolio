// Fetches my public LeetCode stats and shapes them for the site.
// Used by the Netlify function (live data on each visit) and by the build script (saved fallback copy).
const USERNAME = 'Srikar4510';

const query = `query ($u: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $u) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { totalActiveDays submissionCalendar }
    languageProblemCount { languageName problemsSolved }
  }
}`;

const dayKey = (date) => date.toISOString().slice(0, 10);

const fetchLeetCode = async () => {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json', referer: 'https://leetcode.com', 'user-agent': 'Mozilla/5.0' },
    body: JSON.stringify({ query, variables: { u: USERNAME } }),
    signal: AbortSignal.timeout(10000),
  });
  const { data, errors } = await res.json();
  if (!res.ok || errors || !data?.matchedUser) throw new Error(errors?.[0]?.message || `HTTP ${res.status}`);

  const user = data.matchedUser;
  const totals = Object.fromEntries(data.allQuestionsCount.map((q) => [q.difficulty, q.count]));
  const solved = Object.fromEntries(user.submitStatsGlobal.acSubmissionNum.map((q) => [q.difficulty, q.count]));

  // submissionCalendar is { unixSeconds: count } for the past year. Turn it into 52 weeks of days, oldest first.
  const raw = JSON.parse(user.userCalendar.submissionCalendar || '{}');
  const byDay = {};
  Object.entries(raw).forEach(([ts, count]) => {
    const key = dayKey(new Date(Number(ts) * 1000));
    byDay[key] = (byDay[key] || 0) + count;
  });
  const today = new Date();
  const calendar = [];
  for (let i = 363; i >= 0; i -= 1) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    calendar.push(byDay[dayKey(d)] || 0);
  }

  return {
    username: USERNAME,
    updated: dayKey(today),
    solved: solved.All,
    total: totals.All,
    activeDays: user.userCalendar.totalActiveDays,
    difficulty: ['Easy', 'Medium', 'Hard'].map((name) => ({ name, solved: solved[name], total: totals[name] })),
    languages: [...user.languageProblemCount]
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 3)
      .map((l) => ({ name: l.languageName, solved: l.problemsSolved })),
    calendarEnd: dayKey(today),
    calendar,
  };
};

module.exports = { fetchLeetCode };
