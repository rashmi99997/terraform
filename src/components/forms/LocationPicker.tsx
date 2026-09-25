'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, LocateFixed, Loader2, Check } from 'lucide-react';
import { locationService } from '@/src/services';
import type { LocationInfo } from '@/src/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationPickerProps {
  onSelect: (location: LocationInfo) => void;
  selected: LocationInfo | null;
}

export function LocationPicker({ onSelect, selected }: LocationPickerProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationInfo[]>([]);
  const [searching, setSearching] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setHasSearched(true);
    const locations = await locationService.searchLocations(query);
    setResults(locations);
    setSearching(false);
  };

  const handleDetect = async () => {
    setDetecting(true);
    const location = await locationService.getCurrentLocation();
    onSelect(location);
    setDetecting(false);
  };

  return (
    <div className="space-y-6">
      {/* Use my location */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleDetect}
          disabled={detecting}
          className="group flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-6 transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-60"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
            {detecting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <LocateFixed className="h-6 w-6" />
            )}
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">
              {detecting ? 'Detecting your location...' : 'Use my current location'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;ll detect your approximate location automatically
            </p>
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm font-medium text-muted-foreground">or search manually</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Search */}
      <div className="mx-auto max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by region, country, or area name..."
            className="h-11 pl-10"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={searching || !query.trim()}
          className="mt-3 w-full"
          size="lg"
        >
          {searching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search locations'
          )}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto max-w-md space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {results.length} location{results.length > 1 ? 's' : ''} found
            </p>
            {results.map((loc) => (
              <LocationResultCard
                key={loc.label}
                location={loc}
                isSelected={selected?.label === loc.label}
                onClick={() => onSelect(loc)}
              />
            ))}
          </motion.div>
        )}
        {hasSearched && !searching && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-md rounded-xl border border-border bg-muted/50 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              No locations found for &ldquo;{query}&rdquo;. Try a different search term.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected location */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-md rounded-2xl border-2 border-primary/30 bg-primary/5 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{selected.label}</p>
                <p className="text-sm text-muted-foreground">
                  {selected.region}, {selected.country} · {selected.climateZone}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocationResultCard({
  location,
  isSelected,
  onClick,
}: {
  location: LocationInfo;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all',
        isSelected
          ? 'border-primary bg-primary/5 shadow-soft'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-soft'
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
          isSelected
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        <MapPin className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{location.label}</p>
        <p className="truncate text-sm text-muted-foreground">
          {location.region}, {location.country}
        </p>
      </div>
      <div className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-dark">
        {location.climateZone}
      </div>
    </button>
  );
}
