'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, Calendar, ExternalLink, X, Maximize2 } from 'lucide-react';
import { certificates, type Certificate } from '../data/certificates';

export default function Certificates() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [active]);

  // Close modal on Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  // Show top 4 certificates by default, all when expanded
  const displayedCertificates = showAll ? certificates : certificates.slice(0, 4);
  // Duplicate list for seamless infinite looping marquee
  const loopedCertificates = [...displayedCertificates, ...displayedCertificates];

  return (
    <section id="certificates" className="px-6 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center sm:text-left"
        >
          <span className="text-sm uppercase tracking-widest text-white/45">Credentials</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="mb-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              <span className="font-handlee text-emerald-300">Certificates</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/60">
              Direct previews of verified course credentials and academic achievements. Hover to pause auto-scroll; click any card to expand.
            </p>
          </div>
        </motion.div>

        {certificates.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center text-white/55">
            Certificates coming soon.
          </div>
        ) : (
          <>
            <div
              className="relative overflow-hidden py-2"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              <div
                className="flex w-max gap-6"
                style={{
                  animation: `cert-marquee ${Math.max(24, displayedCertificates.length * 8)}s linear infinite`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                {loopedCertificates.map((cert, index) => (
                  <CertCard
                    key={`${cert.id}-${index}`}
                    cert={cert}
                    onOpen={() => setActive(cert)}
                    aria-hidden={index >= displayedCertificates.length}
                  />
                ))}
              </div>
            </div>

            {certificates.length > 4 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-2.5 text-sm font-medium text-white/75 hover:border-white/22 hover:bg-white/[0.05] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  {showAll ? 'Show Less' : `View All (${certificates.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <CertModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

function CertCard({ cert, onOpen, ariaHidden }: { cert: Certificate; onOpen: () => void; ariaHidden?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex w-[310px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-hidden={ariaHidden ? 'true' : undefined}
      tabIndex={ariaHidden ? -1 : 0}
      role="button"
    >
      {/* Certificate Image Preview */}
      <div className="relative h-44 w-full overflow-hidden bg-black/50 border-b border-white/[0.06]">
        {cert.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cert.image}
            alt={cert.title}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/35">
            <Award className="h-10 w-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-60" />
        
        {/* Zoom hint overlay icon */}
        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/75 backdrop-blur-md transition-all group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-black">
          <Maximize2 className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Card Body Info */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.24em] text-emerald-300/80">
            {cert.issuer}
          </div>
          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-white/90 group-hover:text-white">
            {cert.title}
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-xs text-white/50">
          <span className="flex items-center gap-1 text-[11px]">
            <Calendar className="h-3 w-3 text-emerald-300/70" />
            {cert.date}
          </span>
          <span className="text-[11px] font-medium text-emerald-300/80 group-hover:underline">
            Expand →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CertModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={cert.title}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#121216] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[3px] bg-gradient-to-r from-emerald-300 via-cyan-200 to-purple-300" />

            <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300">
                  <Award className="h-3.5 w-3.5" />
                  {cert.issuer}
                </div>
                <h3 className="text-2xl font-semibold text-white">{cert.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-white/55">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {cert.date}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                aria-label="Close certificate"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {cert.image && (
                <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    className="mx-auto max-h-[70vh] w-auto object-contain"
                  />
                </div>
              )}

              {cert.description && (
                <p className="leading-relaxed text-white/75">{cert.description}</p>
              )}

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <ExternalLink className="h-4 w-4" />
                  Verify credential
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
