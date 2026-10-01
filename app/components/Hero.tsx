'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles, Code, Zap, Target } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const FloatingIcon = ({ Icon, x, y, delay, color }: { Icon: any; x: string; y: string; delay: number; color: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={mounted ? { opacity: 0.5, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`absolute ${x} ${y} pointer-events-none`}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        <Icon className={`h-8 w-8 text-${color}-400 opacity-50`} />
      </motion.div>
    </motion.div>
  );

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.12),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
        />
      </div>

      {/* Floating Tech Icons */}
      <FloatingIcon Icon={Code} x="top-20" y="left-10" delay={0.5} color="purple" />
      <FloatingIcon Icon={Zap} x="top-40" y="right-20" delay={0.8} color="yellow" />
      <FloatingIcon Icon={Target} x="bottom-32" y="left-20" delay={1.1} color="emerald" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT SIDE: TEXT CONTENT & ACTIONS */}
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-3 items-center"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="font-tech inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-purple-200"
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-3 w-3 text-cyan-300" />
              </motion.div>
              AI / ML Engineering Student
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md cursor-default"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
              Open for Summer 2026 Internships
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Hey, I'm{' '}
            <motion.span
              className="block bg-gradient-to-r from-purple-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              Anshul Dhiman
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mb-5 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            2nd-year B.Tech CSE (AI & ML) student at LPU. Building hardware-accelerated vision models, evaluated RAG systems, and local-first AI software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="mb-10 space-y-2.5 text-sm text-white/68 sm:text-base"
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              />
              <span className="text-white/85">Real-time Computer Vision (YOLOv8, OpenCV, ONNX) & Evaluated RAG</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="h-1.5 w-1.5 rounded-full bg-purple-300"
              />
              <span>Target Role: Machine Learning Engineer & Systems Developer</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.42 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/30 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
            >
              See Projects
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Anshul_Dhiman_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-7 py-3 text-sm font-medium text-white/75 hover:border-white/22 hover:bg-white/[0.05] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 transition-all"
            >
              <Download className="h-4 w-4" />
              Resume (PDF)
            </motion.a>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: 'https://github.com/anshuldhiman-ai', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/anshul-dhiman-ai', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:anshul.dhiman.ml@gmail.com', label: 'Email' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/65 hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 transition-all"
                  aria-label={link.label}
                  title={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </motion.a>
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
            {/* Enhanced Glowing Ambient Halo */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 opacity-60 blur-2xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-3xl"
            />

            {/* Circular Headshot Container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-2 border-white/25 bg-[#ffffff] shadow-2xl backdrop-blur-xl sm:h-72 sm:w-72 md:h-80 md:w-80"
            >
              {!imgError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/profile.jpg"
                  alt="Anshul Dhiman Profile Picture"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center bg-[#12121a] text-center h-full w-full">
                  <span className="font-tech text-4xl font-bold tracking-widest text-purple-300">AD</span>
                  <span className="mt-1 text-xs uppercase tracking-wider text-white/50">Anshul Dhiman</span>
                </div>
              )}
              
              {/* Shine effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
              />
            </motion.div>

            {/* Enhanced Status indicator badge */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/85 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md shadow-xl"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
              <span>ML Engineer Goal</span>
            </motion.div>
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
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}