import './globals.css';
import { Inter } from 'next/font/google';

import { NextAuthProvider } from './providers';

import HeaderNav from '@/components/navBar_components/headerNav';
import ScoreBoard from '@/components/scoreboard/scoreboard';
import ScoreCard from '@/components/scoreboard/scorecard';
import { getTeamDataByName } from '@/lib/getTeamData';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sports App',
  description: 'Sports App created by Joshua Vladia using Next JS',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let data = await getTeamDataByName('NBA_Teams', 'Miami Heat');
  let moreData = await getTeamDataByName('NBA_Teams', 'Boston Celtics');
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <header className='container mx-auto p-4'>
            <HeaderNav />
          </header>
          <ScoreBoard>
            {data!.map((item) => (
              <ScoreCard
                team_name={item.team_name}
                abbr={item.team_abbreviation}
                title='Title Placeholder'
                logo_url={item.logo_url}
                score='100'
                state='Final'
                key={item._id.toString()}
              />
            ))}
            {moreData!.map((item) => (
              <ScoreCard
                team_name={item.team_name}
                abbr={item.team_abbreviation}
                title='Title Placeholder'
                logo_url={item.logo_url}
                score='100'
                state='Final'
                key={item._id.toString()}
              />
            ))}
          </ScoreBoard>
          <div className='container mx-auto mt-5 px-16 flex flex-col'>
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
