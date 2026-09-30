'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      <div className="absolute inset-0 -z-10 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:88px_88px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.18),transparent_34%),linear-gradient(180deg,transparent,rgba(10,10,15,0.92)_78%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT SIDE: TEXT CONTENT & ACTIONS */}
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-6"
          >
            <span className="font-tech inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-white/70">
              <Sparkles className="h-3 w-3 text-cyan-300" />
              AI / ML Engineering Student
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Hey, I'm{' '}
            <span className="block bg-gradient-to-r from-purple-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Anshul Dhiman
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mb-5 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            2nd-year B.Tech CSE (AI & ML) student at LPU, Phagwara — originally from Hamirpur, Himachal Pradesh. I love building practical solutions for myself and people around me, learning by implementing real-life projects to understand them deeply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="mb-10 space-y-2.5 text-sm text-white/68 sm:text-base"
          >
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              <span className="text-white/85">B.Tech CSE (AI & ML) @ LPU Phagwara (CGPA: 6.73)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>Projects: Batua (AI Finance), Currency Counter (OpenCV), FormatFlow</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300" />
              <span>Focus: Data Structures & Algorithms (DSA) | Target: ML Engineer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.42 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              See Projects
            </button>
            <a
              href="/Anshul_Dhiman_Resume.docx"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-7 py-3 text-sm font-medium text-white/75 hover:border-white/22 hover:bg-white/[0.05] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: 'https://github.com/anshuldhiman-ai', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/anshul-dhiman-ai', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:anshul.dhiman.ml@gmail.com', label: 'Email' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/65 hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20"
                  aria-label={link.label}
                  title={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: CENTERED PROFESSIONAL PROFILE PICTURE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Glowing Ambient Halo */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 opacity-60 blur-xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-2xl" />

            {/* Circular Headshot Container */}
            <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-2 border-white/25 bg-[#ffffff] shadow-2xl backdrop-blur-xl sm:h-72 sm:w-72 md:h-80 md:w-80">
              {!imgError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/profile.jpg"
                  alt="Anshul Dhiman Profile Picture"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center bg-[#12121a] text-center h-full w-full">
                  <span className="font-tech text-4xl font-bold tracking-widest text-purple-300">AD</span>
                  <span className="mt-1 text-xs uppercase tracking-wider text-white/50">Anshul Dhiman</span>
                </div>
              )}
            </div>

            {/* Status indicator badge */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/85 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md shadow-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ML Engineer Goal</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}