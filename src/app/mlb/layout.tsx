import ScoreBoard from "@/components/scoreboard/scoreboard";
import { getGameData } from "@/lib/getGameData";

export const metadata = {
  title: "Sports App | MLB",
};

export default async function MLBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let gameData = await JSON.parse(
    JSON.stringify(await getGameData("MLB_Data"))
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
