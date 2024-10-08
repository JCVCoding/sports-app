import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type CardType = {
  title: string;
  description: string;
  image_url: string | StaticImageData;
  source: string;
  article_id: string;
  league: string;
  image_alt: string;
};

const ContentCard = ({
  title,
  description,
  image_url,
  source,
  article_id,
  league,
  image_alt,
}: CardType) => {
  return (
    <div className="mb-8">
      <div>
        <Link
          href={`/${league.toLocaleLowerCase()}/article/${encodeURIComponent(
            article_id
          )}`}
        >
          <h3 className="text-lg md:text-2xl font-medium pb-3">{title}</h3>
          <p className="text-sm md:text-base mb-4">
            {description.substring(0, 100) + "..."}
          </p>
          <Image src={image_url} alt={image_alt} width={900} height={900} />
        </Link>
      </div>
      <div className="md:text-sm text-xs text-gray-600 pt-3">via {source}</div>
    </div>
  );
};

export default ContentCard;
