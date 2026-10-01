'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Code, Brain, Cpu, Database, GitBranch, Rocket, Target } from 'lucide-react';
import GlowCard from './GlowCard';
import { tools, toolCategories } from '../data/tools';

const categoryIcons: Record<string, typeof Brain> = {
  'AI Tools': Brain,
  'Development': Code,
};

const proficiencyColors: Record<string, { bg: string; text: string; border: string }> = {
  Expert: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  Advanced: { bg: 'bg-cyan-500/10', text: 'text-cyan-300', border: 'border-cyan-500/30' },
  Intermediate: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30' },
  Learning: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
};

export default function Tools() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="tools" className="px-6 py-32">
      <div className="mx-auto max-w-6xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Tools & Technologies</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="mb-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            <span className="text-white">Tools I'm </span>
            <span className="font-handlee text-cyan-300">friendly with</span>
          </h2>
          <p className="text-base leading-relaxed text-white/62">
            AI-powered development tools and essential development technologies I use daily to build and ship projects efficiently.
          </p>
        </motion.div>

        <div className="space-y-12">
          {toolCategories.map((category, categoryIdx) => {
            const categoryTools = tools.filter(t => t.category === category);
            const Icon = categoryIcons[category] || Code;
            const glow = category === 'AI Tools' ? '#8b5cf6' : '#22d3ee';

            return (
              <div key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + categoryIdx * 0.1 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                    <Icon className="h-5 w-5 text-white/70" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{category}</h3>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {categoryTools.map((tool, idx) => {
                    const colors = proficiencyColors[tool.proficiency];
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.2 + categoryIdx * 0.1 + idx * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                      >
                        <GlowCard
                          glow={glow}
                          className="h-full p-5 transition-all duration-300 hover:border-white/[0.20] hover:shadow-2xl hover:shadow-black/30"
                        >
                          <div className="relative z-10">
                            <div className="mb-4 flex items-start justify-between">
                              <span className="text-3xl">{tool.icon}</span>
                              <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border}`}
                              >
                                {tool.proficiency}
                              </span>
                            </div>
                            <h4 className="mb-2 text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {tool.name}
                            </h4>
                            <p className="text-sm leading-relaxed text-white/60">
                              {tool.description}
                            </p>
                          </div>
                        </GlowCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
