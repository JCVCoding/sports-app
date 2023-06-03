import Link from 'next/link';
export interface StoryCardProps {
  header: string;
  title: string;
  text: string;
  author: string;
  id: number;
}

const StoryCard = ({ author, header, text, title }: StoryCardProps) => {
  return (
    <div className='border border-gray-300'>
      <div className='bg-teal-400 pl-2'>{header}</div>
      <div className='p-2'>
        <Link href='#'>
          <div className='text-3xl mb-2'>{title}</div>
        </Link>
        <Link href='#'>
          <div>{text}</div>
        </Link>
        <div>by {author}</div>
      </div>
    </div>
  );
};

export default StoryCard;
