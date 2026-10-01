'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin } from 'lucide-react';
import { socials } from '../data/socials';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Notes' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

const profileLinks = [
  { label: 'Resume', href: '/Anshul_Dhiman_Resume.pdf', icon: Download, download: true },
  { label: 'GitHub', href: socials.github, icon: Github },
  { label: 'LinkedIn', href: socials.linkedin, icon: Linkedin },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setCompact(window.scrollY > 24);

      const sections = ['home', 'contact', 'certificates', 'coding-stats', 'skills', 'projects', 'about'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 180) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="h-[2px] bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300 shadow-lg shadow-purple-500/30"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        animate={{
          y: compact ? 10 : 16,
          backgroundColor: compact ? 'rgba(14,14,18,0.92)' : 'rgba(14,14,18,0.52)',
          borderColor: compact ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.10)',
          boxShadow: compact ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.2)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="mx-auto flex w-[calc(100%-24px)] max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-3xl sm:w-[calc(100%-40px)]"
      >
        <button
          onClick={() => scrollTo('home')}
          className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-600/30 via-cyan-500/20 to-emerald-500/30 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:border-purple-300 focus-visible:ring-2 focus-visible:ring-purple-300"
          aria-label="Scroll to home"
        >
          <img
            src="/profile.jpg"
            alt="Anshul Dhiman"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              // Hide image if not found yet, showing clean glowing AD initials fallback
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-tech text-xs tracking-wider">AD</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 py-2 text-sm font-medium text-white/58 hover:text-white transition-colors"
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300"
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {profileLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.download ? undefined : '_blank'}
              rel={link.download ? undefined : 'noopener noreferrer'}
              download={link.download}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-sm font-medium text-white/72 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 transition-all"
              aria-label={link.label}
              title={link.label}
            >
              <link.icon className="h-4 w-4" />
              <span className="hidden xl:inline">{link.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}
