import ScoreBoard from '@/components/scoreboard/scoreboard';
import { getGameData } from '@/lib/getGameData';

export default async function MLBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let gameData = await JSON.parse(
    JSON.stringify(await getGameData('MLB_Data'))
  );
  return (
    <>
      <ScoreBoard gameData={gameData} />
      <div className='container mx-auto mt-5 sm:px-16 px-8 flex flex-col'>
        {children}
      </div>
    </>
  );
}
