'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import CodingStats from './components/CodingStats';

const Terminal = dynamic(() => import('./components/Terminal'), { ssr: false });

const BOOT_SEQUENCE_KEY = 'portfolio_visited';

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('');
  const [hasVisited, setHasVisited] = useState(false);
  const [terminalOrigin, setTerminalOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const visited = localStorage.getItem(BOOT_SEQUENCE_KEY);
    if (!visited) {
      setIsBooting(true);
    } else {
      setIsBooting(false);
      setHasVisited(true);
    }
  }, []);

  useEffect(() => {
    if (!isBooting || hasVisited) return; // Skip if already visited or not booting

    const runBootSequence = async () => {
      const sequence = [
        'mounting portfolio kernel',
        'hydrating project intelligence',
        'calibrating glass interface',
        'ready to explore'
      ];

      let currentText = '';
      for (const line of sequence) {
        currentText += `${line}\n`;
        setBootText(currentText);
        await new Promise(r => setTimeout(r, 260));
      }

      await new Promise(r => setTimeout(r, 400));
      setIsBooting(false);
      localStorage.setItem(BOOT_SEQUENCE_KEY, 'true');
    };

    runBootSequence();
  }, [isBooting, hasVisited]);

  const skipBoot = () => {
    setIsBooting(false);
    localStorage.setItem(BOOT_SEQUENCE_KEY, 'true');
  };

  const handleOpenTerminal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate the center of the button relative to the viewport
    setTerminalOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setShowTerminal(true);
  };

  return (
    <div>
      <AnimatePresence>
        {isBooting && !hasVisited && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#07070b] p-6"
          >
            <motion.div
              className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[90px]"
              animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[12%] right-[15%] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-[100px]"
              animate={{ scale: [1.1, 0.92, 1.1], opacity: [0.6, 0.32, 0.6] }}
              transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <button
              onClick={skipBoot}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-tech text-xs uppercase tracking-widest text-white/70 backdrop-blur-xl hover:border-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Skip
            </button>
            <div className="glass-panel relative w-full max-w-3xl overflow-hidden p-7 sm:p-9">
              <div className="relative z-10 mb-7 flex items-center justify-between gap-4">
                <div>
                  <div className="font-tech text-xs uppercase tracking-[0.35em] text-cyan-200/75">Portfolio OS</div>
                  <div className="mt-2 font-display text-3xl text-white sm:text-4xl">Anshul's Portfolio</div>
                </div>
                <motion.div
                  className="h-12 w-12 rounded-full border border-cyan-200/30 bg-cyan-200/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div className="relative z-10 mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className="h-full bg-gradient-to-r from-fuchsia-300 via-cyan-200 to-emerald-200"
                  initial={{ width: '12%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.3, ease: 'easeOut' }}
                />
              </div>
              <div className="relative z-10 whitespace-pre-wrap font-mono text-sm leading-relaxed text-white/78 sm:text-base" aria-live="polite">
                {bootText}
                <span className="cursor-blink ml-1 inline-block h-4 w-2 bg-cyan-200/80 align-middle" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />

      <main
         className={isBooting && !hasVisited ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}
      >
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[#0a0a0f]" />
          <div className="absolute top-0 left-1/3 h-[520px] w-[520px] rounded-full bg-purple-900/[0.03] blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[480px] w-[480px] rounded-full bg-blue-900/[0.025] blur-[130px]" />
        </div>

        <Hero />

        <div className="section-divider" />
        <About />

        <div className="section-divider" />
        <Projects />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Blog />

        <div className="section-divider" />
        <Certificates />

        <div className="section-divider" />
        <CodingStats />

        <div className="section-divider" />
        <Contact />

        <footer className="border-t border-white/[0.04] py-10 text-center">
          <p className="text-xs text-white/35">
            Built with Next.js + Tailwind · Made to learn
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {showTerminal ? (
          <Terminal
             originX={terminalOrigin.x}
             originY={terminalOrigin.y}
             onMinimize={() => setShowTerminal(false)}
          />
        ) : (
          <motion.button
            key="terminal-btn"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleOpenTerminal}
            className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1d]/90 text-white/75 shadow-2xl shadow-black/40 backdrop-blur-xl hover:border-white/20 hover:text-white"
            aria-label="Open interactive terminal"
            title="Open terminal"
          >
            <TerminalIcon className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
