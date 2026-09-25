'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Layers,
  Eye,
  Sparkles,
  ScanLine,
  Sprout,
  CalendarDays,
  Award,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavBar } from '@/src/components/layout/NavBar';
import { JOURNEY_STEPS } from '@/src/data/journey-steps';

export default function JourneyIntroPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/37206209/pexels-photo-37206209.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Aerial view of farmland at sunrise"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 pt-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              Your Journey Begins
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s understand your land,
              <br />
              <span className="text-accent-light">step by step.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
              TERRAFORM will guide you through a few simple questions about your
              land. You don&apos;t need any agricultural expertise — just tell us
              what you see and what you know.
            </p>

            <Link href="/journey/location" className="mt-8 inline-block">
              <Button
                size="lg"
                className="gap-2 bg-white px-8 text-primary hover:bg-white/90"
              >
                Start the Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Journey preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-3 sm:grid-cols-3"
          >
            {[
              { label: 'Understand', icon: MapPin, steps: ['Location', 'Soil', 'Conditions', 'Intention'] },
              { label: 'Decide', icon: ScanLine, steps: ['Land Profile', 'Analysis', 'Crops'] },
              { label: 'Act', icon: Sprout, steps: ['Growing', 'Harvest'] },
            ].map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-accent-light" />
                    <span className="font-semibold text-white">
                      {phase.label}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {phase.steps.map((step) => (
                      <li
                        key={step}
                        className="text-sm text-white/70"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
