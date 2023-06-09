import Image from 'next/image';
import Link from 'next/link';

const ContentCard = () => {
  return (
    <div className='mb-8'>
      <div>
        <Link href={'/nba'}>
          <h3 className='text-2xl font-medium pb-3'>Title</h3>
        </Link>
        <p className='text-xl mb-4'>Story Description</p>
      </div>
      <div>
        <Link href={'/nba'}>Image Placeholder</Link>
      </div>
      <div className='text-sm text-gray-400 pt-3'>via Source</div>
    </div>
  );
};

export default ContentCard;
