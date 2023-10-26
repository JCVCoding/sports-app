'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Button, Collapse } from '@material-tailwind/react';
import Comment, { commentProps } from './comment';
import { useState } from 'react';

const CommentReplies = ({ replies }: { replies: commentProps[] }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className='ml-6 sm:ml-8'>
      {replies ? (
        <>
          <Button
            className='rounded-full flex gap-x-3 normal-case text-sm'
            color='blue'
            ripple={false}
            size='sm'
            variant='text'
            onClick={toggleOpen}
          >
            {open ? (
              <ChevronDownIcon className='h-4 w-4' aria-hidden='true' />
            ) : (
              <ChevronUpIcon className='h-4 w-4' aria-hidden='true' />
            )}
            <span>
              {replies.length} {replies.length > 1 ? 'replies' : 'reply'}
            </span>
          </Button>
        </>
      ) : null}
      {replies ? (
        <Collapse open={open}>
          {replies.map(
            ({ author, avatar, text, timestamp, voteCount }, index) => (
              <Comment
                author={author}
                avatar={avatar}
                text={text}
                timestamp={timestamp}
                voteCount={voteCount}
                key={index}
              />
            )
          )}
        </Collapse>
      ) : null}
    </div>
  );
};

export default CommentReplies;
