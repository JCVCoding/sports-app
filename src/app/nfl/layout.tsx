import ScoreBoard from "@/components/scoreboard/scoreboard";
import { getGameData } from "@/lib/getGameData";

export default async function NFLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let gameData = await JSON.parse(
    JSON.stringify(await getGameData("NFL_Data"))
  );
  return (
    <>
      <ScoreBoard gameData={gameData} />
      <div className="container mx-auto mt-5 sm:px-8 px-4 flex flex-col">
        {children}
      </div>
    </>
  );
}
