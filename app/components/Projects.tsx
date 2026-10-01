'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, Project } from '../data/projects';
import { Github, ExternalLink, X, Cpu, Gauge, Lightbulb, Wrench } from 'lucide-react';
import GlowCard from './GlowCard';

const projectColors = [
  { gradient: 'from-violet-400 to-cyan-300', accent: '#a78bfa', bg: 'rgba(139, 92, 246, 0.07)' },
  { gradient: 'from-blue-400 to-emerald-300', accent: '#60a5fa', bg: 'rgba(59, 130, 246, 0.07)' },
  { gradient: 'from-emerald-400 to-cyan-300', accent: '#34d399', bg: 'rgba(16, 185, 129, 0.07)' },
  { gradient: 'from-orange-300 to-rose-300', accent: '#fb923c', bg: 'rgba(249, 115, 22, 0.07)' },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<{ project: Project; colorIndex: number } | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-6xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Work</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-white">Featured </span>
              <span className="font-handlee text-purple-300">projects</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/60">
              Three shipped end-to-end projects. Click any card for the engineering write-up — what broke, how I fixed it, what I'd build next.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/65">
            {projects.length} projects · Python, OpenCV & Web
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              colorIndex={index}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject({ project, colorIndex: index })}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#141416] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
                <div>
                  <div className="mb-1 text-xs uppercase tracking-widest text-white/40">{selectedProject.project.artifact.label}</div>
                  <h3 className="text-2xl font-semibold text-white">{selectedProject.project.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg p-1.5 text-white/45 hover:bg-white/5 hover:text-white"
                  aria-label="Close project details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-7 p-6">
                <ProjectPreview project={selectedProject.project} colorIndex={selectedProject.colorIndex} large />
                <p className="leading-relaxed text-white/70">{selectedProject.project.description}</p>

                <div className="grid gap-4 md:grid-cols-3">
                  {selectedProject.project.metrics.map(m => (
                    <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                      <div className="text-xl font-semibold" style={{ color: projectColors[selectedProject.colorIndex % 4].accent }}>
                        {m.value}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-white/45">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Insight icon={Wrench} label="Challenge" text={selectedProject.project.challenge} />
                  <Insight icon={Cpu} label="Solution" text={selectedProject.project.solution} />
                  <Insight icon={Gauge} label="Result" text={selectedProject.project.result} />
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-white/45">
                    <Lightbulb className="h-4 w-4" />
                    What I learned
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{selectedProject.project.learned}</p>
                </div>

                <div>
                  <div className="mb-3 text-[11px] uppercase tracking-wider text-white/45">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {[...selectedProject.project.tech, ...selectedProject.project.proof].map(t => (
                      <span key={t} className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-xs text-white/62">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  {selectedProject.project.github && (
                    <a href={selectedProject.project.github} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-medium text-black hover:bg-white/90">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {selectedProject.project.demo && (
                    <a href={selectedProject.project.demo} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-white/70 hover:border-white/20 hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  colorIndex,
  index,
  isInView,
  onClick,
}: {
  project: Project;
  colorIndex: number;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const colors = projectColors[colorIndex % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
      whileHover={{ y: -8 }}
    >
      <GlowCard
        glow={colors.accent}
        onClick={onClick}
        className="group h-full cursor-pointer p-5 transition-all duration-300 hover:border-white/[0.20] hover:shadow-2xl hover:shadow-black/30"
      >
        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ProjectPreview project={project} colorIndex={colorIndex} />
          </motion.div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <motion.h3
                className="font-display mb-2 text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors"
                whileHover={{ x: 5 }}
              >
                {project.name}
              </motion.h3>
              <p className="max-w-xl text-base leading-relaxed text-white/66">{project.description}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="rounded-lg p-2 text-white/50 hover:bg-white/[0.08] hover:text-white transition-all" aria-label={`${project.name} GitHub`}>
                  <Github className="h-4 w-4" />
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="rounded-lg p-2 text-white/50 hover:bg-white/[0.08] hover:text-white transition-all" aria-label={`${project.name} demo`}>
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-5 rounded-xl border border-white/[0.07] bg-black/20 p-4 backdrop-blur-xl transition-all"
          >
            <div className="font-tech mb-1 text-[12px] uppercase tracking-[0.2em] text-white/50">Engineering challenge</div>
            <p className="text-base leading-relaxed text-white/76">{project.challenge}</p>
          </motion.div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, backgroundColor: `${colors.accent}20` }}
                className="font-tech rounded-full border border-white/[0.09] bg-white/[0.045] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/62 transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
            <div className="flex-1" />
            {project.metrics.slice(0, 2).map(m => (
              <motion.div
                key={m.label}
                whileHover={{ scale: 1.05 }}
                className="text-right"
              >
                <span className="text-sm font-semibold" style={{ color: colors.accent }}>{m.value}</span>
                <span className="ml-1 text-[11px] text-white/45">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

function ProjectPreview({ project, colorIndex, large = false }: { project: Project; colorIndex: number; large?: boolean }) {
  const colors = projectColors[colorIndex % 4];
  const height = large ? 'h-64' : 'h-48';

  return (
    <div className={`${height} overflow-hidden rounded-xl border border-white/[0.1] bg-[#101014]/80 p-4 backdrop-blur-xl`} style={{ background: `linear-gradient(135deg, ${colors.bg}, rgba(255,255,255,0.035))` }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="font-tech text-[11px] uppercase tracking-[0.22em] text-white/55">{project.artifact.label}</span>
      </div>

      {project.artifact.type === 'dashboard' && <DashboardPreview accent={colors.accent} items={project.artifact.items ?? []} />}
      {project.artifact.type === 'architecture' && <ArchitecturePreview projectId={project.id} accent={colors.accent} />}
    </div>
  );
}

function DashboardPreview({ accent, items }: { accent: string; items: string[] }) {
  return (
    <div className="grid h-[calc(100%-32px)] grid-cols-[0.7fr_1fr] gap-4">
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item} className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-3">
            <div className="mb-2 text-[10px] uppercase text-white/45">{item}</div>
            <div className="h-1.5 rounded-full bg-white/[0.08]">
              <div className="h-full rounded-full" style={{ width: `${42 + i * 22}%`, backgroundColor: i === 2 ? accent : 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
        <svg viewBox="0 0 220 120" className="h-full w-full" role="img" aria-label="Evaluation chart preview">
          <polyline fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" points="0,82 28,74 56,88 84,50 112,62 140,38 168,48 196,28 220,34" />
          <polyline fill="none" stroke={accent} strokeWidth="3" points="0,92 28,80 56,78 84,66 112,58 140,52 168,40 196,36 220,26" />
        </svg>
      </div>
    </div>
  );
}

const projectArchitectures: Record<string, string[]> = {
  'currency-counter': ['Webcam Feed', 'OpenCV Preprocess', 'YOLOv8 ONNX', 'IoU Temporal Tracker', 'Verified Count'],
  'neural-rag': ['User Query', 'Qdrant Vector DB', 'BGE Reranker', 'Llama 3.2 LLM', 'Ragas Score'],
  'batua': ['Natural Input', 'NLP Parser', 'Ollama + ML', 'MongoDB Primary', 'SQLite Failover'],
  'format-flow': ['Raw Document', 'Flask Engine', 'PyMuPDF → docx', 'LibreOffice Fallback', 'ZIP Packaging'],
};

function ArchitecturePreview({ projectId, accent }: { projectId: string; accent: string }) {
  const steps = projectArchitectures[projectId] ?? ['Input', 'Model', 'Pipeline', 'Output'];

  return (
    <div className="flex h-[calc(100%-32px)] items-center justify-between gap-2 overflow-x-auto py-1">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center gap-2 min-w-0">
          <div
            className="flex h-16 flex-1 items-center justify-center text-center rounded-xl border border-white/[0.09] bg-black/40 px-2 py-1 text-[11px] font-medium leading-tight text-white/85 shadow-sm transition-all"
            style={{
              borderColor: i === steps.length - 1 ? `${accent}80` : undefined,
              boxShadow: i === steps.length - 1 ? `0 0 20px ${accent}25` : undefined,
            }}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: `${accent}99` }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Insight({ icon: Icon, label, text }: { icon: typeof Wrench; label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/45">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-white/70">{text}</p>
    </div>
  );
}
