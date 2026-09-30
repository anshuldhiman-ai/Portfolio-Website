import { NextResponse } from 'next/server';

const USERNAME = 'anshul_ai';

export const revalidate = 3600;

const QUERY = `
  query ($username: String!) {
    matchedUser(username: $username) {
      profile { ranking }
      submitStatsGlobal {
        acSubmissionNum { difficulty count }
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error('leetcode fetch failed');

    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) throw new Error('user not found');

    const counts: Record<string, number> = {};
    for (const item of user.submitStatsGlobal?.acSubmissionNum ?? []) {
      counts[item.difficulty] = item.count;
    }

    return NextResponse.json({
      totalSolved: counts.All ?? 0,
      easySolved: counts.Easy ?? 0,
      mediumSolved: counts.Medium ?? 0,
      hardSolved: counts.Hard ?? 0,
      ranking: user.profile?.ranking ?? null,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load LeetCode stats' }, { status: 502 });
  }
}
