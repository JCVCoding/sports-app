import Image from 'next/image';
import ContentCard from '@/components/layout_components/contentCard';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

type Repo = {
  item: string;
};

export const getStaticProps: GetStaticProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch(
    'https://us-east-2.aws.data.mongodb-api.com/app/data-ksuni/endpoint/data/v1'
  );
  const repo = await res.json();
  return { props: { repo } };
};

export default function NBA({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(repo);
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
          <ContentCard />
          <ContentCard />
        </li>
      </ol>
    </section>
  );
}
