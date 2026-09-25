'use client';

import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'light';
  showText?: boolean;
  className?: string;
}

export function Logo({
  variant = 'default',
  showText = true,
  className,
}: LogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-2.5 transition-opacity hover:opacity-90',
        className
      )}
    >
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-soft">
        <Sprout
          className={cn(
            'h-5 w-5 transition-transform group-hover:scale-110',
            isLight ? 'text-white' : 'text-primary-foreground'
          )}
          strokeWidth={2.2}
        />
      </div>
      {showText && (
        <span
          className={cn(
            'font-display text-lg font-bold tracking-tight',
            isLight ? 'text-white' : 'text-foreground'
          )}
        >
          TERRAFORM
        </span>
      )}
    </Link>
  );
}
