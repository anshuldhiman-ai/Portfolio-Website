import { NextResponse } from 'next/server';

const USERNAME = 'anshuldhiman-ai';

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error('GitHub API response not OK');

    const data = await res.json();
    return NextResponse.json({
      public_repos: data.public_repos ?? 10,
      followers: data.followers ?? 5,
      following: data.following ?? 8,
    });
  } catch {
    // Fallback data if rate-limited or offline
    return NextResponse.json({
      public_repos: 12,
      followers: 5,
      following: 8,
    });
  }
}
