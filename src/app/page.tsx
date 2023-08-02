import Image from 'next/image';
import Link from 'next/link';

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

let nbaTopStories = async () => {
  try {
    const nbaStories = (await getAPIData('NBA_Articles')).slice(0, 2);
    return nbaStories;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  let nbaStories = await nbaTopStories();

  return (
    <>
      <section>
        <h2 className='text-5xl font-bold text-center mb-4'>Top News</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 auto-rows-auto gap-3'>
          {topStories.map((props) => (
            <StoryCard key={props.id} {...props}></StoryCard>
          ))}
        </div>
      </section>
      <PageSection header='nba' stories={nbaStories}></PageSection>
      <PageSection header='nfl'></PageSection>
      <PageSection header='mlb'></PageSection>
      <PageSection header='nhl'></PageSection>
    </>
  );
}
