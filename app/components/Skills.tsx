'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BrainCircuit, Code2, GraduationCap, Languages, Server, Wrench } from 'lucide-react';
import GlowCard from './GlowCard';
import { usedInProjects, currentlyLearning } from '../data/skills';

const groupStyles: Record<string, { icon: typeof Code2; glow: string }> = {
  'Languages': { icon: Languages, glow: '#7c83e0' },
  'AI Integration': { icon: BrainCircuit, glow: '#38bdf8' },
  'Backend': { icon: Server, glow: '#34d399' },
  'Frontend': { icon: Code2, glow: '#f472b6' },
  'Tooling': { icon: Wrench, glow: '#f59e0b' },
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="px-6 py-32">
      <div className="mx-auto max-w-6xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Skills</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="mb-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            What's actually shipped
          </h2>
          <p className="text-base leading-relaxed text-white/62">
            Every tool below is in at least one project on my GitHub — nothing here is just a logo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {usedInProjects.map((group, idx) => {
            const style = groupStyles[group.title] ?? { icon: Code2, glow: '#38bdf8' };
            const Icon = style.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 * idx }}
                whileHover={{ y: -8 }}
              >
                <GlowCard glow={style.glow} className="h-full p-6 transition-all duration-300 hover:border-white/[0.20] hover:shadow-2xl hover:shadow-black/30">
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="mb-5 flex items-start gap-4"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-200/15 bg-cyan-200/10 text-cyan-200"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors">{group.title}</h3>
                        <p className="mt-1 text-base leading-relaxed text-white/60">{group.summary}</p>
                      </div>
                    </motion.div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIdx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.08 * idx + skillIdx * 0.05 }}
                          whileHover={{ scale: 1.1, backgroundColor: `${style.glow}25` }}
                          className="rounded-lg border border-white/[0.08] bg-black/25 px-2.5 py-1.5 text-sm text-white/72 backdrop-blur-xl transition-all cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}

          {/* Currently learning */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 * usedInProjects.length }}
            whileHover={{ y: -8 }}
          >
            <GlowCard glow="#a78bfa" className="h-full p-6 transition-all duration-300 hover:border-white/[0.20] hover:shadow-2xl hover:shadow-black/30">
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="mb-5 flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-200/15 bg-purple-200/10 text-purple-200"
                  >
                    <GraduationCap className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors">Studying now</h3>
                    <p className="mt-1 text-base leading-relaxed text-white/60">In progress — not in any shipped project yet.</p>
                  </div>
                </motion.div>
                <div className="flex flex-wrap gap-2">
                  {currentlyLearning.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.08 * usedInProjects.length + skillIdx * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(167, 139, 250, 0.25)' }}
                      className="rounded-lg border border-purple-300/[0.15] bg-purple-300/[0.05] px-2.5 py-1.5 text-sm text-purple-100/70 backdrop-blur-xl transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
