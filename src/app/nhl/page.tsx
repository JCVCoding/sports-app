import Image from 'next/image';

import ContentCard from '@/components/layout_components/contentCard';

import flPanthers from '../../images/Florida_Panthers.jpg';
import nhlOffSeason from '../../images/NHL_2023_Offseason.jpg';

import { ArticleData } from '@/lib/getAPIArticleData';
import { getAIGeneratedData, getAPIData } from '@/lib/getArticleData';

async function getData() {
  try {
    const apiData = await getAPIData('NHL_Articles');
    const aiData = await getAIGeneratedData('NHL_Articles');
    return [aiData, apiData];
  } catch (e) {
    console.error(e);
  }
}

export default async function NHL() {
  const data = await getData();
  const aiData = data![0] as [];
  const apiData = data![1] as [];
  const imageArray = [flPanthers, nhlOffSeason];
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
          {aiData?.map(
            ({ uuid, description, source, title }: ArticleData, index) => (
              <ContentCard
                key={uuid}
                description={description}
                image_url={imageArray[index]}
                source={source}
                title={title}
                article_id={uuid}
                league='nhl'
              />
            )
          )}
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
                league='nhl'
              />
            )
          )}
        </li>
      </ol>
    </section>
  );
}
