import { getArticleById } from '@/lib/getArticleData';

export default async function Page({ params }: { params: { uuid: string } }) {
  const [data] = await getArticleById(params.uuid, 'NFL_Articles');
  return (
    <div>
      <h3 className='text-2xl font-medium pb-3'>{data.title}</h3>
      {data.description}
    </div>
  );
}
