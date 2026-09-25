'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/src/components/common/Logo';
import { cn } from '@/lib/utils';

export function NavBar() {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isLanding
          ? 'bg-transparent'
          : 'border-b border-border/60 bg-background/80 backdrop-blur-lg'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo variant={isLanding ? 'light' : 'default'} />

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isLanding
                ? 'text-white/80 hover:text-white'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Home
          </Link>
          <Link
            href="/journey"
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              pathname.startsWith('/journey')
                ? 'text-foreground'
                : isLanding
                  ? 'text-white/80 hover:text-white'
                  : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Journey
          </Link>
          <Link
            href="/#how-it-works"
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isLanding
                ? 'text-white/80 hover:text-white'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            How It Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className={cn(
              'hidden text-sm font-medium transition-colors sm:block',
              isLanding
                ? 'text-white/80 hover:text-white'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Sign in
          </Link>
          <Link href="/auth/signup">
            <Button
              variant={isLanding ? 'secondary' : 'default'}
              size="sm"
              className={cn(isLanding && 'bg-white text-primary hover:bg-white/90')}
            >
              Begin Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
