import ScoreBoard from "@/components/scoreboard/scoreboard";
import { getGameData } from "@/lib/getGameData";

export default async function NBALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let gameData = await JSON.parse(
    JSON.stringify(await getGameData("NBA_Data"))
  );
  return (
    <>
      <ScoreBoard gameData={gameData} />
      <div className="container md:mx-auto mt-5 md:px-10 flex flex-col">
        {children}
      </div>
    </>
  );
}
