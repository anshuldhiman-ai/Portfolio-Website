'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlowCard from './GlowCard';
import { GraduationCap, MapPin } from 'lucide-react';

const timeline = [
  {
    year: 'Late 2026',
    event: 'Built & Deployed NeuralRAG: multi-stage vector search with BGE re-ranking and Ragas automated evaluation benchmark',
    marker: '2026',
    color: '#34D399',
  },
  {
    year: 'Mid 2026',
    event: 'Shipped Currency Counter with custom YOLOv8 model (1.45k dataset, 98.4% mAP@0.5) and hardware-aware ONNX Runtime pipeline',
    marker: '2026',
    color: '#38BDF8',
  },
  {
    year: 'Early 2026',
    event: 'Developed Batua: local-first finance manager with MongoDB → SQLite dual-database failover and offline Llama 3.2 assistant',
    marker: '2026',
    color: '#A78BFA',
  },
  {
    year: '2025',
    event: 'Enrolled in B.Tech CSE (AI & ML) at Lovely Professional University; built foundational computer vision and deep learning pipelines',
    marker: '2025',
    color: '#FBBF24',
  },
  {
    year: '2024',
    event: 'Built first OpenCV image processing scripts and algorithms in Python & C++, starting hands-on software development journey',
    marker: '2024',
    color: '#F472B6',
  },
];

const education = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'B.Tech – CSE (AI & ML)',
    period: '2025 – Present',
    highlight: '2nd Year Student',
    badgeColor: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  },
  {
    institution: 'Montessori Cambridge School',
    location: 'Pathankot, Punjab',
    degree: 'Senior Secondary (Class XII)',
    period: '2023 – 2025',
    highlight: 'Non-Medical (CS)',
    badgeColor: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
  },
  {
    institution: 'Montessori Cambridge School',
    location: 'Pathankot, Punjab',
    degree: 'Secondary School (Class X)',
    period: '2022 – 2023',
    highlight: 'Matriculation',
    badgeColor: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300',
  },
];

const highlights = [
  { label: 'Location', value: 'LPU Phagwara / HP', glow: '#a78bfa' },
  { label: 'Degree', value: 'B.Tech CSE (AI & ML)', glow: '#22d3ee' },
  { label: 'Specialization', value: 'Vision & Systems', glow: '#34d399' },
  { label: 'Target', value: 'ML Engineering', glow: '#f59e0b' },
];

const proof = [
  'Goal: Machine Learning & Computer Vision Engineer',
  'Primary Focus: YOLOv8, OpenCV, ONNX Runtime, PyTorch, RAG Pipelines',
  'Engineering Approach: Learning by building real, benchmarked software',
  'Available for Summer 2026 ML & Systems Internships',
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-6xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">About & Education</span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              <span className="text-white">Who I </span>
              <span className="font-handlee text-purple-300 hover:text-cyan-300 transition-colors duration-300">am</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 max-w-2xl"
            >
              <p className="mb-4 text-lg leading-relaxed text-white/68">
                I'm Anshul Dhiman, a 2nd-year B.Tech CSE (AI & ML) student at Lovely Professional University, Phagwara, originally from Hamirpur, Himachal Pradesh. My passion for technology started early, which led me to choose B.Tech to turn my curiosity into real-world software.
              </p>
              <p className="text-base leading-relaxed text-white/58">
                I strongly believe in learning by implementing. I love building practical solutions for myself and the people around me, taking concepts into real life, building projects around them, and understanding them deeply from the inside out.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <GlowCard glow={item.glow} className="h-full p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30">
                    <div className="relative z-10">
                      <div className="font-tech mb-1 text-[11px] uppercase tracking-[0.2em] text-white/50">{item.label}</div>
                      <div className="text-base text-white/78">{item.value}</div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -4 }}
          >
            <GlowCard glow="#34d399" className="h-full p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30">
              <div className="relative z-10">
                <div className="font-tech mb-5 text-sm uppercase tracking-[0.24em] text-white/50">In one screen</div>
                <div className="space-y-3">
                  {proof.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex gap-3 rounded-xl border border-white/[0.07] bg-black/25 p-4 backdrop-blur-xl transition-all"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300"
                      />
                      <span className="text-base leading-relaxed text-white/74">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* EDUCATION SECTION */}
        <div className="section-divider my-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-10"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Academic History</span>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white/90">
            Education
          </h3>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.4 + idx * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${edu.badgeColor}`}>
                    {edu.highlight}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {edu.degree}
                </h4>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-white/70">
                  <GraduationCap className="h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{edu.institution}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-white/35" />
                  <span>{edu.location}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-3 text-xs text-white/45">
                {edu.period}
              </div>
            </motion.div>
          ))}
        </div>

        {/* TIMELINE SECTION (REVERSE CHRONOLOGICAL) */}
        <div className="section-divider my-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Timeline</span>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white/80">
            How I got here (Latest First)
          </h3>
        </motion.div>

        <div className="relative ml-6 sm:ml-12">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.06]" />

          <div className="space-y-14">
            {timeline.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative pl-10"
    >
      <div className="absolute left-0 top-0 h-full w-px overflow-hidden">
        <motion.div
          className="w-full origin-top"
          style={{
            background: `linear-gradient(180deg, ${item.color}cc, ${item.color}40 70%, transparent)`,
            boxShadow: `0 0 12px ${item.color}55`,
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.7, delay: 0.05 * index + 0.15, ease: 'easeOut' }}
        />
      </div>

      <div className="absolute left-0 top-1 flex -translate-x-1/2 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute h-10 w-10 rounded-full"
          style={{ backgroundColor: item.color, opacity: 0.35 }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={isInView ? { scale: [0.6, 2.2, 2.2], opacity: [0, 0.35, 0] } : {}}
          transition={{ duration: 1.1, delay: 0.05 * index + 0.25, ease: 'easeOut' }}
        />
        <motion.span
          aria-hidden
          className="absolute h-10 w-10 rounded-full"
          style={{ backgroundColor: item.color, opacity: 0.18 }}
          animate={
            isInView
              ? { scale: [1, 1.35, 1], opacity: [0.18, 0.05, 0.18] }
              : {}
          }
          transition={{ duration: 2.4, delay: 0.05 * index + 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
          transition={{
            type: 'spring',
            damping: 12,
            stiffness: 220,
            delay: 0.05 * index + 0.3,
          }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-full opacity-40 blur-md"
            style={{ backgroundColor: item.color }}
          />
          <div
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#0a0a0f] text-[11px] font-bold tracking-wider"
            style={{ borderColor: `${item.color}80`, color: item.color }}
          >
            {item.marker}
          </div>
        </motion.div>
      </div>

      <div className="pt-1">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.05 * index + 0.45, ease: 'easeOut' }}
          className="inline-block text-sm font-semibold tracking-wide"
          style={{ color: item.color }}
        >
          {item.year}
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 * index + 0.55, ease: 'easeOut' }}
          className="mt-1.5 max-w-xl text-base leading-relaxed text-white/72"
        >
          {item.event}
        </motion.p>
      </div>
    </motion.div>
  );
}