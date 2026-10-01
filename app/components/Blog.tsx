'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { posts, Post } from '../data/posts';
import { BookOpen, Clock, Tag, X, ArrowRight, Sparkles } from 'lucide-react';
import GlowCard from './GlowCard';

export default function Blog() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Lock body scroll when post modal is open
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [activePost]);

  return (
    <section id="blog" className="px-6 py-32">
      <div className="mx-auto max-w-6xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center sm:text-left"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Engineering Notes</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-white">Technical </span>
              <span className="font-handlee text-cyan-300">articles</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/60">
              Deep dives into computer vision tracking math, ONNX model optimization, and local-first software architectures.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/65">
            {posts.length} engineering notes · Vision & Systems
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <GlowCard
                glow={index === 0 ? '#38bdf8' : index === 1 ? '#a78bfa' : '#34d399'}
                onClick={() => setActivePost(post)}
                className="group flex h-full cursor-pointer flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16]"
              >
                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between text-xs text-white/45">
                    <span className="inline-flex items-center gap-1.5 text-cyan-300 font-tech uppercase tracking-widest text-[11px]">
                      <Sparkles className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold leading-snug text-white group-hover:text-cyan-200 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/65">
                    {post.summary}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="font-medium text-cyan-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post Modal Reader */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#121216] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
                <div>
                  <div className="mb-1 flex items-center gap-3 text-xs uppercase tracking-widest text-cyan-300">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {activePost.category}
                    </span>
                    <span>•</span>
                    <span>{activePost.date}</span>
                    <span>•</span>
                    <span>{activePost.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{activePost.title}</h3>
                </div>
                <button
                  onClick={() => setActivePost(null)}
                  className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                  aria-label="Close article"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 p-6 sm:p-8 font-sans leading-relaxed text-white/80">
                {activePost.content.map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed text-white/78">
                    {paragraph}
                  </p>
                ))}

                <div className="mt-8 border-t border-white/[0.06] pt-6 flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-white/40" />
                  {activePost.tags.map((tag) => (
                    <span key={tag} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
