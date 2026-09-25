'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Layers,
  ScanLine,
  Sprout,
  CalendarDays,
  Award,
  Sun,
  CloudSun,
  Droplets,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/src/components/common/Logo';
import { NavBar } from '@/src/components/layout/NavBar';

const HERO_IMAGE =
  'https://images.pexels.com/photos/33557780/pexels-photo-33557780.jpeg?auto=compress&cs=tinysrgb&w=1920';

const PROCESS_STEPS = [
  {
    icon: MapPin,
    title: 'Understand',
    description:
      'Tell TERRAFORM about your land — location, soil, and what you observe. No agricultural expertise needed.',
  },
  {
    icon: ScanLine,
    title: 'Decide',
    description:
      'Get a clear analysis of your land and crop recommendations tailored to your specific conditions.',
  },
  {
    icon: Sprout,
    title: 'Act',
    description:
      'Follow a step-by-step growing plan from soil preparation to harvest, with guidance at every stage.',
  },
];

const FEATURES = [
  {
    icon: Layers,
    title: 'Soil Intelligence',
    description:
      'Upload a photo of your soil or tell us what you know — we interpret what it means for growing.',
  },
  {
    icon: CloudSun,
    title: 'Climate Awareness',
    description:
      'Your land is analyzed in the context of your local climate and growing conditions.',
  },
  {
    icon: Sprout,
    title: 'Crop Matching',
    description:
      'Get crop recommendations ranked by suitability — or validate a crop you already have in mind.',
  },
  {
    icon: CalendarDays,
    title: 'Guided Growing',
    description:
      'A clear, phase-by-phase plan takes you from bare soil to a full harvest without guesswork.',
  },
];

const STATS = [
  { value: '9', label: 'Guided Journey Steps' },
  { value: '6+', label: 'Crop Recommendations' },
  { value: '7', label: 'Growing Phases' },
  { value: '1', label: 'Full Harvest' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Aerial view of green farmland"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <Logo variant="light" showText={false} />
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                Agricultural Intelligence
              </span>
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              From bare soil
              <br />
              to a{' '}
              <span className="text-accent-light">full harvest.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
              TERRAFORM is an intelligent agricultural guidance system that helps
              you understand your land, choose the right crop, and grow it
              successfully — step by step.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="gap-2 bg-white px-8 text-primary hover:bg-white/90"
                >
                  Begin Your Journey
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="ghost"
                  className="gap-2 text-white hover:bg-white/10 hover:text-white"
                >
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 grid max-w-lg grid-cols-4 gap-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent-dark">
              How It Works
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Understand. Decide. Act.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three stages guide you from knowing nothing about your land to
              reaching a successful harvest.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative rounded-3xl border border-border bg-card p-8 shadow-soft"
                >
                  <div className="absolute right-6 top-6 font-display text-6xl font-bold text-primary/5">
                    0{index + 1}
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-soft">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Everything you need to grow
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              TERRAFORM covers the full journey — no tools, spreadsheets, or
              agricultural background required.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center gap-3">
              <Sun className="h-8 w-8 text-accent-light" />
              <Droplets className="h-8 w-8 text-white/60" />
              <Sprout className="h-8 w-8 text-accent-light" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your land has potential.
              <br />
              Let&apos;s unlock it together.
            </h2>
            <p className="mt-6 text-lg text-white/80">
              Start your guided journey and go from understanding your soil to
              harvesting your first crop.
            </p>
            <Link href="/auth/signup" className="mt-8 inline-block">
              <Button
                size="lg"
                className="gap-2 bg-white px-8 text-primary hover:bg-white/90"
              >
                Begin Your Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <Logo />
          <p className="text-sm text-muted-foreground">
            From bare soil to a full harvest.
          </p>
        </div>
      </footer>
    </div>
  );
}
