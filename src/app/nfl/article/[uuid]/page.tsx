import Image from 'next/image';
import { getArticleById } from '@/lib/getArticleData';

export default async function Page({ params }: { params: { uuid: string } }) {
  const [data] = await getArticleById(params.uuid, 'NFL_Articles');
  return (
    <>
      <h3 className='text-4xl font-medium mb-3'>{data.title}</h3>
      <div className='text-gray-400 pb-3'>{data.source}</div>
      <div className='relative mb-3' style={{ height: '800px' }}>
        <Image src={data.image_url} alt='' fill />
      </div>
      <div className='mb-6'>{data.description}</div>
    </>
  );
}
