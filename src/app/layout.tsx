import './globals.css';
import { Inter } from 'next/font/google';

import { NextAuthProvider } from './providers';

import HeaderNav from '@/components/navBar_components/headerNav';
import ScoreBoard from '@/components/scoreboard/scoreboard';
import ScoreCard from '@/components/scoreboard/scorecard';

import { getGameData } from '@/lib/getGameData';

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
  let data = await getGameData('NBA_Data', 'NBA_Teams', 'Miami Heat');
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
                team_name_home={item.HomeTeamInfo.team_name}
                abbr_home={item.HomeTeamInfo.team_abbreviation}
                title={
                  Number(item.Date) > Date.now() ? 'Title Placeholder' : ''
                }
                logo_url_home={item.HomeTeamInfo.logo_url}
                score_home={item.PTS_Home}
                state='Final'
                abbr_away={item.AwayTeamInfo.team_abbreviation}
                logo_url_away={item.AwayTeamInfo.logo_url}
                score_away={item.PTS_Away}
                team_name_away={item.Visitor}
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
