import './globals.css';
import { Inter } from 'next/font/google';

import { NextAuthProvider } from './providers';

import HeaderNav from '@/components/navBar_components/headerNav';
import ScoreBoard from '@/components/scoreboard/scoreboard';
import ScoreCard from '@/components/scoreboard/scorecard';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sports App',
  description: 'Sports App created by Joshua Vladia using Next JS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <header className='container mx-auto p-4'>
            <HeaderNav />
          </header>
          <ScoreBoard>
            <ScoreCard />
            <ScoreCard />
            <ScoreCard />
          </ScoreBoard>
          <div className='container mx-auto mt-5 px-16 flex flex-col'>
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
