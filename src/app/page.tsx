import StoryCard, {
  StoryCardProps,
} from "@/components/layout_components/storyCard";
import PageSection from "@/components/layout_components/pageSection";
import { getAPIData } from "@/lib/getArticleData";

let topStories: StoryCardProps[] = [
  {
    author: "Andy Bailey",
    header: "NBA",
    id: 0,
    text: "Miami's role players continue to show up when it matters most",
    title: "Miami Heat Proving They're Built Perfectly Around Jimmy Butler",
    uuid: "879debdb-7cc3-480f-82fd-c9bbvghj76",
  },
  {
    author: "Paul Kasabian",
    header: "NBA",
    id: 1,
    text: "Cooking up blockbuster deal where everyone wins (including Dame)",
    title:
      "Haynes: Blazers 'Refusing' to Have Damian Lillard Trade Talks with Heat Amid Rumors",
    uuid: "879debdb-dashdak-4234-doipo0345",
  },
];

let getTopStories = async () => {
  try {
    const nbaStories = (await getAPIData("NBA_Articles")).slice(0, 2);
    const nflStories = (await getAPIData("NFL_Articles")).slice(0, 2);
    const nhlStories = (await getAPIData("NHL_Articles")).slice(0, 2);
    const mlbStories = (await getAPIData("MLB_Articles")).slice(0, 2);
    return { nbaStories, nflStories, nhlStories, mlbStories };
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  let leagueStories = await getTopStories();

  return (
    <div className="container mx-auto mt-5 sm:px-16 px-8 flex flex-col">
      <section>
        <h2 className="text-5xl font-bold text-center mb-4">Top Headlines</h2>
        <div className="grid grid-cols-1 auto-rows-auto gap-1">
          {topStories.map((props) => (
            <StoryCard key={props.id} {...props}></StoryCard>
          ))}
        </div>
      </section>
      <PageSection
        header="nba"
        stories={leagueStories?.nbaStories}
      ></PageSection>
      <PageSection
        header="nfl"
        stories={leagueStories?.nflStories}
      ></PageSection>
      <PageSection
        header="mlb"
        stories={leagueStories?.mlbStories}
      ></PageSection>
      <PageSection
        header="nhl"
        stories={leagueStories?.nhlStories}
      ></PageSection>
    </div>
  );
}
