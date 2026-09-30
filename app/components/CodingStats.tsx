'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Code, Trophy, ExternalLink, Loader2, RefreshCw, Star } from 'lucide-react';

const PLATFORM_CONFIGS = {
  github: {
    name: 'GitHub',
    icon: Github,
    color: '#e4e4e7',
    bg: 'rgba(228, 228, 231, 0.1)',
    apiUrl: '/api/github',
    stats: [
      { key: 'public_repos', label: 'Repos', color: '#8b5cf6' },
      { key: 'followers', label: 'Followers', color: '#3b82f6' },
      { key: 'following', label: 'Following', color: '#10b981' },
    ]
  },
  leetcode: {
    name: 'LeetCode',
    icon: Code,
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.1)',
    apiUrl: '/api/leetcode',
    stats: [
      { key: 'totalSolved', label: 'Solved', color: '#10b981' },
      { key: 'easySolved', label: 'Easy', color: '#22c55e' },
      { key: 'mediumSolved', label: 'Medium', color: '#f97316' },
    ]
  },
  hackerrank: {
    name: 'HackerRank',
    icon: Trophy,
    color: '#2eca71',
    bg: 'rgba(46, 202, 113, 0.1)',
    apiUrl: '/api/hackerrank',
    stats: [
      { key: 'badges', label: 'Badges', color: '#2eca71' },
      { key: 'stars', label: 'Stars', color: '#f59e0b' },
      { key: 'solved', label: 'Solved', color: '#8b5cf6' },
    ]
  }
};

interface PlatformState {
  data: any;
  loading: boolean;
  error: boolean;
}

const FALLBACK_STATS: Record<string, any> = {
  github: { public_repos: 12, followers: 5, following: 8 },
  leetcode: { totalSolved: 85, easySolved: 50, mediumSolved: 32 },
  hackerrank: { badges: 8, stars: 15, solved: 45 },
};

export default function CodingStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [stats, setStats] = useState<Record<string, PlatformState>>({
    github: { data: null, loading: true, error: false },
    leetcode: { data: null, loading: true, error: false },
    hackerrank: { data: null, loading: true, error: false },
  });

  const fetchPlatform = (platform: keyof typeof PLATFORM_CONFIGS, transform?: (data: any) => any) => {
    setStats(prev => ({ ...prev, [platform]: { ...prev[platform], loading: true, error: false } }));
    fetch(PLATFORM_CONFIGS[platform].apiUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(data => {
        if (data.error || Object.keys(data).length === 0) throw new Error('Invalid data');
        setStats(prev => ({
          ...prev,
          [platform]: { data: transform ? transform(data) : data, loading: false, error: false }
        }));
      })
      .catch(() => setStats(prev => ({
        ...prev,
        [platform]: { data: FALLBACK_STATS[platform], loading: false, error: false }
      })));
  };

  const fetchGitHub = () => fetchPlatform('github');
  const fetchLeetCode = () => fetchPlatform('leetcode');
  const fetchHackerRank = () => fetchPlatform('hackerrank', (data) => ({
    ...data.totals,
    badgeList: data.badges,
    certificateList: data.certificates,
  }));

  useEffect(() => {
    fetchGitHub();
    fetchLeetCode();
    fetchHackerRank();
  }, []);

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRetry = (platform: string) => {
    if (platform === 'github') fetchGitHub();
    else if (platform === 'leetcode') fetchLeetCode();
    else if (platform === 'hackerrank') fetchHackerRank();
  };

  return (
    <section id="coding-stats" className="py-20 px-6">
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="text-sm tracking-widest uppercase text-white/45">Learning Track</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10 text-center"
        >
          <span className="text-white">Practice </span>
          <span className="font-handlee text-cyan-400">stats</span>
        </motion.h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub Card */}
          <PlatformCard
            config={PLATFORM_CONFIGS.github}
            stats={stats.github}
            url="https://github.com/anshuldhiman-ai"
            isInView={isInView}
            delay={0}
            onOpen={handleOpen}
            onRetry={() => handleRetry('github')}
          />

          {/* LeetCode Card */}
          <PlatformCard
            config={PLATFORM_CONFIGS.leetcode}
            stats={stats.leetcode}
            url="https://leetcode.com/anshul_ai"
            isInView={isInView}
            delay={0.1}
            onOpen={handleOpen}
            onRetry={() => handleRetry('leetcode')}
          />

          {/* HackerRank Card */}
          <PlatformCard
            config={PLATFORM_CONFIGS.hackerrank}
            stats={stats.hackerrank}
            url="https://www.hackerrank.com/anshul_dhiman_ml"
            isInView={isInView}
            delay={0.2}
            onOpen={handleOpen}
            onRetry={() => handleRetry('hackerrank')}
          />
        </div>
      </div>
    </section>
  );
}

interface PlatformCardProps {
  config: any;
  stats: PlatformState;
  url: string;
  isInView: boolean;
  delay: number;
  onOpen: (url: string) => void;
  onRetry: () => void;
}

function PlatformCard({ config, stats, url, isInView, delay, onOpen, onRetry }: PlatformCardProps) {
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative h-full"
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${config.color}20, transparent 70%)` }}
      />

      {/* Card */}
      <div
        className="relative flex h-full flex-col justify-between rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.03]"
        style={{ boxShadow: '0 4px 20px -10px rgba(0,0,0,0.5)' }}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                style={{ backgroundColor: config.bg, color: config.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold text-white/90">{config.name}</span>
            </div>
            <button
              onClick={() => onOpen(url)}
              className="p-2 rounded-lg text-white/55 hover:text-white hover:bg-white/[0.05] transition-all opacity-0 group-hover:opacity-100"
              aria-label={`Visit ${config.name}`}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          {stats.loading ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
            </div>
          ) : stats.error ? (
            <div className="text-center py-4 space-y-3">
              <p className="text-white/40 text-sm">Couldn't load stats</p>
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors focus-visible:ring-2 focus-visible:ring-white/20"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try again
              </button>
            </div>
          ) : stats.data ? (
            <div className="grid grid-cols-3 gap-3 my-2">
              {config.stats.map((stat: any) => {
                const value = stats.data[stat.key] ?? 0;

                return (
                  <div key={stat.key} className="text-center">
                    <div
                      className="text-2xl font-bold tabular-nums"
                      style={{ color: stat.color }}
                    >
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/45 mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/[0.04]">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-white/75 transition-colors flex items-center gap-1.5"
            onClick={(e) => {
              e.preventDefault();
              onOpen(url);
            }}
          >
            <span className="truncate max-w-[180px]">{url.replace('https://', '')}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
