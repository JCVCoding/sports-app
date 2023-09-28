import Image from 'next/image';
import { getArticleById } from '@/lib/getArticleData';
import Comment from '@/components/layout_components/comment/comment';
import CommentReplies from '@/components/layout_components/comment/commentReplies';

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
      <hr />
      <div className='mt-2'>
        <Comment
          author='Josh'
          avatar='Josh'
          voteCount={2}
          text='this is a comment'
          timestamp='Today at 1:59pm'
        />
        <CommentReplies />
      </div>
    </>
  );
}
