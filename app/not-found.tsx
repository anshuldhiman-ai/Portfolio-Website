'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-6 text-center text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:88px_88px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.18),transparent_34%),linear-gradient(180deg,transparent,rgba(10,10,15,0.92)_78%)]" />
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="font-tech text-8xl font-bold bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <h2 className="mb-4 text-3xl font-semibold text-white/90">
          Page Not Found
        </h2>

        <p className="mb-8 max-w-md text-base text-white/60 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-7 py-3 text-sm font-medium text-white/75 hover:border-white/22 hover:bg-white/[0.05] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-white/40">
          <span>Need help?</span>
          <a
            href="mailto:anshul.dhiman.ml@gmail.com"
            className="text-cyan-300 hover:underline transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
