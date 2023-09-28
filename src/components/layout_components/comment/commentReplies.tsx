'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Button, Collapse } from '@material-tailwind/react';
import Comment from './comment';
import { useState } from 'react';

const CommentReplies = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className='ml-8'>
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
        <span>3 replies</span>
      </Button>
      <Collapse open={open}>
        <Comment
          author='Josh'
          avatar='Josh'
          text='This is a test comment'
          timestamp='Today at 8:30pm'
          voteCount={3}
        />
        <Comment
          author='Josh'
          avatar='Josh'
          text='This is a test comment'
          timestamp='Today at 8:30pm'
          voteCount={3}
        />
        <Comment
          author='Josh'
          avatar='Josh'
          text='This is a test comment'
          timestamp='Today at 8:30pm'
          voteCount={3}
        />
      </Collapse>
    </div>
  );
};

export default CommentReplies;
