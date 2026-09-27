// @ts-ignore
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { JourneyProvider } from '@/src/store/journey-store';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TERRAFORM — From bare soil to a full harvest',
  description:
    'TERRAFORM is an intelligent agricultural guidance system that helps you understand your land, choose the right crop, and reach a successful harvest.',
  openGraph: {
    title: 'TERRAFORM — From bare soil to a full harvest',
    description:
      'An intelligent agricultural guidance system that guides you from understanding your land to choosing a suitable crop and eventually reaching harvest.',
    images: [
      {
        url: 'https://images.pexels.com/photos/33557780/pexels-photo-33557780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://images.pexels.com/photos/33557780/pexels-photo-33557780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <JourneyProvider>{children}</JourneyProvider>
        <Toaster />
      </body>
    </html>
  );
}
