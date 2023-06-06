import Image from 'next/image';
import ContentCard from '@/components/layout_components/contentCard';

export default function NBA() {
  return (
    <section>
      <div className='flex flex-col items-center gap-y-3 mt-4'>
        <Image
          src='https://cdn.bleacherreport.net/images/team_logos/328x328/nba.png'
          alt='NBA logo'
          width={80}
          height={80}
        ></Image>
        <h2 className='text-5xl font-bold text-center mb-4'>NBA</h2>
      </div>
      <ol>
        <li className='my-8 mx-auto'>
          <ContentCard />
        </li>
      </ol>
    </section>
  );
}
