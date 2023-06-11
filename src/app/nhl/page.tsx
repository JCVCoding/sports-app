import Image from 'next/image';

import ContentCard from '@/components/layout_components/contentCard';

import clientPromise from '@/lib/mongodb';

async function getData() {
  try {
    const client = await clientPromise;
    const db = client.db('ArticleData');
    const data = await db.collection('NHL_Articles').find({}).toArray();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export default async function NHL() {
  const data = await getData();
  return (
    <section>
      <div className='flex flex-col items-center gap-y-3 mt-4'>
        <Image
          src='https://cdn.bleacherreport.net/images/team_logos/328x328/nhl.png'
          alt='NHL logo'
          width={80}
          height={80}
        ></Image>
        <h2 className='text-5xl font-bold text-center mb-4'>NHL</h2>
      </div>
      <ol>
        <li className='my-8 mx-auto'>
          {data?.map((NHL) => (
            <ContentCard key={NHL._id.toString()} {...NHL} />
          ))}
        </li>
      </ol>
    </section>
  );
}
