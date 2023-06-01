'use client';
import Link from 'next/link';
interface StoryCardProps {
  header: string;
  title: string;
  text: string;
  author: string;
}

const StoryCard = (props: StoryCardProps) => {
  return (
    <div>
      <div>{props.header}</div>
      <div>
        <Link href='#'>
          <div>{props.title}</div>
        </Link>
        <Link href='#'>
          <div>{props.text}</div>
        </Link>
        <div>by {props.author}</div>
      </div>
    </div>
  );
};

export default StoryCard;
