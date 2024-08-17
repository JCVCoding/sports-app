import Link from "next/link";
export interface StoryCardProps {
  header: string;
  title: string;
  text: string;
  author: string;
  id: number;
  uuid: string;
}

const StoryCard = ({ header, title, uuid }: StoryCardProps) => {
  return (
    <>
      <div className="text-green-800 text-lg md:text-2xl pl-2">{header}</div>
      <div className="p-2 font-extrabold">
        <Link
          href={`/${header.toLowerCase()}/article/${encodeURIComponent(uuid)}`}
        >
          <div className="text-xl md:text-3xl">{title}</div>
        </Link>
        <Link
          href={`/${header.toLowerCase()}/article/${encodeURIComponent(uuid)}`}
        ></Link>
      </div>
    </>
  );
};

export default StoryCard;
