import StoryCard, {
  StoryCardProps,
} from '@/components/layout_components/storyCard';
import PageSection from '@/components/layout_components/pageSection';

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

export default function Home() {
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
      <PageSection header='nba' />
      <PageSection header='nfl' />
      <PageSection header='mlb' />
      <PageSection header='nhl' />
    </>
  );
}
