import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type CardType = {
  title: string;
  description: string;
  image_url: string | StaticImageData;
  source: string;
  article_id: string;
  league: string;
};

const ContentCard = ({
  title,
  description,
  image_url,
  source,
  article_id,
  league,
}: CardType) => {
  return (
    <div className='mb-8'>
      <div>
        <Link href={`/${league}/${encodeURIComponent(article_id)}`}>
          <h3 className='text-2xl font-medium pb-3'>{title}</h3>
        </Link>
        <p className='text-xl mb-4'>{description.substring(0, 100) + '...'}</p>
      </div>
      <div>
        <Link href={`/${league}/${encodeURIComponent(article_id)}`}>
          <Image src={image_url} alt='' width={900} height={900} />
        </Link>
      </div>
      <div className='text-sm text-gray-400 pt-3'>via {source}</div>
    </div>
  );
};

export default ContentCard;
