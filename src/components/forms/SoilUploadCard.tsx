'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
} from 'lucide-react';
import { soilAnalysisService } from '@/src/services';
import type { SoilAnalysisPlaceholder } from '@/src/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SoilUploadCardProps {
  imageUrl?: string;
  onImageChange: (url: string | undefined) => void;
  analysisResult?: SoilAnalysisPlaceholder;
  onAnalysisComplete: (result: SoilAnalysisPlaceholder) => void;
}

export function SoilUploadCard({
  imageUrl,
  onImageChange,
  analysisResult,
  onAnalysisComplete,
}: SoilUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(url);
    },
    [onImageChange]
  );

  const handleAnalyze = async () => {
    if (!previewUrl) return;
    setAnalyzing(true);
    const result = await soilAnalysisService.analyzeSoilImage(previewUrl);
    onAnalysisComplete(result);
    setAnalyzing(false);
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onImageChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Optional badge */}
      <div className="flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 w-fit">
        <Sparkles className="h-3.5 w-3.5 text-accent-dark" />
        <span className="text-xs font-medium text-accent-dark">
          Optional — skip if you already know your soil type
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-hover:scale-110">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">
                  Upload a soil photo
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Take a close-up of your soil and let TERRAFORM analyze it
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ImageIcon className="h-3.5 w-3.5" />
                JPG or PNG · Up to 10MB
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Image preview */}
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Soil sample"
                className="h-56 w-full object-cover"
              />
              <button
                onClick={handleRemove}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Analyze button */}
            {!analysisResult && (
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full gap-2"
                size="lg"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing soil image...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Analyze my soil
                  </>
                )}
              </Button>
            )}

            {/* Analysis result */}
            <AnimatePresence>
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-primary/30 bg-primary/5 p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Soil Analysis Result
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mock analysis · will be replaced by real AI
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <AnalysisItem
                      label="Predicted type"
                      value={
                        analysisResult.predictedType.charAt(0).toUpperCase() +
                        analysisResult.predictedType.slice(1)
                      }
                    />
                    <AnalysisItem
                      label="Confidence"
                      value={`${Math.round(analysisResult.confidence * 100)}%`}
                    />
                    <AnalysisItem label="pH level" value={analysisResult.pH} />
                    <AnalysisItem
                      label="Organic matter"
                      value={analysisResult.organicMatter}
                    />
                  </div>

                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent/10 p-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
                    <p className="text-sm text-accent-dark">
                      {analysisResult.note}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnalysisItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn('rounded-lg bg-card p-3')}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}
