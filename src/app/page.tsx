import StoryCard, {
  StoryCardProps,
} from '@/components/layout_components/storyCard';
import PageSection from '@/components/layout_components/pageSection';
import { getAPIData } from '@/lib/getArticleData';

let topStories: StoryCardProps[] = [
  {
    author: 'Andy Bailey',
    header: 'NBA',
    id: 0,
    text: "Miami's role players continue to show up when it matters most",
    title: "Miami Heat Proving They're Built Perfectly Around Jimmy Butler",
  },
  {
    author: 'Mike Chiari',
    header: 'NBA',
    id: 1,
    text: "Knicks' Julius Randle Has Surgery on Ankle Injury; Reportedly to Be Ready for Season",
    title: 'Julius Randle Had Surgery',
  },
];

let getTopStories = async () => {
  try {
    const nbaStories = (await getAPIData('NBA_Articles')).slice(0, 2);
    const nflStories = (await getAPIData('NFL_Articles')).slice(0, 2);
    const nhlStories = (await getAPIData('NHL_Articles')).slice(0, 2);
    const mlbStories = (await getAPIData('MLB_Articles')).slice(0, 2);
    return { nbaStories, nflStories, nhlStories, mlbStories };
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  let leagueStories = await getTopStories();

  return (
    <div className='container mx-auto mt-5 px-16 flex flex-col'>
      <section>
        <h2 className='text-5xl font-bold text-center mb-4'>Top News</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 auto-rows-auto gap-3'>
          {topStories.map((props) => (
            <StoryCard key={props.id} {...props}></StoryCard>
          ))}
        </div>
      </section>
      <PageSection
        header='nba'
        stories={leagueStories?.nbaStories}
      ></PageSection>
      <PageSection
        header='nfl'
        stories={leagueStories?.nflStories}
      ></PageSection>
      <PageSection
        header='mlb'
        stories={leagueStories?.mlbStories}
      ></PageSection>
      <PageSection
        header='nhl'
        stories={leagueStories?.nhlStories}
      ></PageSection>
    </div>
  );
}
