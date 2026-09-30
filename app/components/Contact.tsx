'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, CheckCircle, Github, Linkedin, Mail, Loader2, AlertTriangle } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/anshuldhiman-ai' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/anshul-dhiman-ai' },
  { icon: Mail, label: 'Email', href: 'mailto:anshul.dhiman.ml@gmail.com' },
];

const CONTACT_EMAIL = 'anshul.dhiman.ml@gmail.com';
// Get a free access key at https://web3forms.com (takes ~1 min) and set it in .env.local
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>('idle');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Your email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'A message would be nice';
    else if (formData.message.trim().length < 10) newErrors.message = 'Write a bit more (at least 10 characters)';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');

    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `Portfolio message from ${formData.name}`,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        const json = await res.json();
        setStatus(json.success ? 'sent' : 'error');
      } else {
        // Fallback to FormSubmit AJAX endpoint — direct email delivery to anshul.dhiman.ml@gmail.com without API key
        const res = await fetch('https://formsubmit.co/ajax/anshul.dhiman.ml@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `Portfolio Message from ${formData.name}`,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        const json = await res.json();
        if (json.success === 'true' || json.success === true || res.ok) {
          setStatus('sent');
        } else {
          setStatus('error');
        }
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto" ref={sectionRef}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <span className="text-sm tracking-widest uppercase text-white/45">Contact</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-center"
        >
          <span className="font-handlee text-purple-400">Let's connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/60 text-center mb-10"
        >
          Open to internships, collaborations, or just a quick chat about AI projects.
        </motion.p>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/65 hover:text-white bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.16] transition-all text-sm focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <s.icon className="w-4 h-4" />
              <span>{s.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-1.5">Message sent</h3>
                  <p className="text-white/62 text-sm">Thanks — I'll reply within a couple of days.</p>
                </motion.div>
              ) : status === 'mailto' ? (
                <motion.div
                  key="mailto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-1.5">Opening your email app</h3>
                  <p className="text-white/62 text-sm">
                    If nothing opened, email me directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyan-300 hover:underline">{CONTACT_EMAIL}</a>
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Anshul Dhiman"
                      className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/32 focus:ring-2 focus:ring-white/20 ${
                        errors.name ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/[0.08] focus:border-white/[0.18]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                      Your email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="you@university.edu"
                      className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/32 focus:ring-2 focus:ring-white/20 ${
                        errors.email ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/[0.08] focus:border-white/[0.18]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="I saw your Batua project and wanted to collaborate on..."
                      rows={5}
                      className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/32 focus:ring-2 focus:ring-white/20 resize-none ${
                        errors.message ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/[0.08] focus:border-white/[0.18]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>
                        Couldn't send — try again, or email me at{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
                      </span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 rounded-xl text-sm bg-white text-black font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-white/40">
                    Delivered directly to my inbox
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
