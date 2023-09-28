'use client';

import CommentActions from './commentActions';
import { Avatar } from '@material-tailwind/react';
export interface commentProps {
  author: string;
  avatar: string;
  comments?: string[];
  text: string;
  timestamp: string;
  voteCount: number;
}

const Comment = ({
  author,
  avatar,
  comments,
  text,
  timestamp,
  voteCount,
}: commentProps) => {
  return (
    <>
      <div className='flex w-full'>
        <Avatar src='/next.svg' size='xs' />
        <div className='px-2'>
          <div>
            {author}
            <span className='ml-1 text-xs text-gray-400'>{timestamp}</span>
          </div>
          <div className='my-1'>{text}</div>
          <CommentActions voteCount={voteCount} />
        </div>
      </div>
    </>
  );
};

export default Comment;
