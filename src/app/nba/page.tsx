import Image from 'next/image';
import ContentCard from '@/components/layout_components/contentCard';

import miamiHeat from '../../images/Miami_Heat_Offseason.webp';

import { ArticleData } from '@/lib/getAPIArticleData';
import { getAIGeneratedData, getAPIData } from '@/lib/getArticleData';

async function getData() {
  try {
    const apiData = await getAPIData('NBA_Articles');
    const aiData = await getAIGeneratedData('NBA_Articles');
    return [aiData, apiData];
  } catch (e) {
    console.error(e);
  }
}

export default async function NBA() {
  const data = await getData();
  const aiData = data![0] as [];
  const apiData = data![1] as [];
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
          {aiData?.map(({ uuid, description, source, title }: ArticleData) => (
            <ContentCard
              key={uuid}
              description={description}
              image_url={miamiHeat}
              source={source}
              title={title}
              article_id={uuid}
              league='nba'
            />
          ))}
        </li>
        <li className='my-8 mx-auto'>
          {apiData?.map(
            ({ uuid, description, image_url, source, title }: ArticleData) => (
              <ContentCard
                key={uuid}
                description={description}
                image_url={image_url}
                source={source}
                title={title}
                article_id={uuid}
                league='nba'
              />
            )
          )}
        </li>
      </ol>
    </section>
  );
}
