import { NextResponse } from 'next/server';

const USERNAME = 'anshul_dhiman_ml';

export const revalidate = 3600;

export async function GET() {
  try {
    const [badgesRes, certsRes] = await Promise.all([
      fetch(`https://www.hackerrank.com/rest/hackers/${USERNAME}/badges`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://www.hackerrank.com/community/v1/test_results/hacker_certificate?username=${USERNAME}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!badgesRes.ok) throw new Error('badges fetch failed');

    const badgesJson = await badgesRes.json();
    const models: any[] = Array.isArray(badgesJson?.models) ? badgesJson.models : [];

    const badges = models.map((m) => ({
      name: m.badge_name as string,
      stars: (m.stars as number) || 0,
      solved: (m.solved as number) || 0,
    }));

    let certificates: string[] = [];
    if (certsRes.ok) {
      const certsJson = await certsRes.json();
      const certData: any[] = Array.isArray(certsJson?.data) ? certsJson.data : [];
      certificates = certData
        .filter((c) => c?.attributes?.status === 'test_passed')
        .map((c) => c?.attributes?.certificates?.[0] ?? c?.attributes?.certificate_name ?? 'Certificate')
        .map((name: string) => name.replace(/\s*\(.*\)\s*$/, ''));
    }

    return NextResponse.json({
      badges,
      certificates,
      totals: {
        badges: badges.length,
        stars: badges.reduce((sum, b) => sum + b.stars, 0),
        solved: badges.reduce((sum, b) => sum + b.solved, 0),
        certificates: certificates.length,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load HackerRank stats' }, { status: 502 });
  }
}
