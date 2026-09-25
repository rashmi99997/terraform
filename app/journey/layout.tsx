'use client';

import { NavBar } from '@/src/components/layout/NavBar';
import { ProgressStepper } from '@/src/components/navigation/ProgressStepper';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function JourneyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Progress bar */}
      <div className="fixed inset-x-0 top-16 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <ProgressStepper />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
