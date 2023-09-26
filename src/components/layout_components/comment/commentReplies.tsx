'use client';

import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Comment from './comment';

const CommentReplies = () => {
  return (
    <Menu as='div'>
      <Menu.Button className='inline-flex w-28 justify-center items-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 ml-6 text-sm font-semibold text-blue-600 hover:ring-1 hover:ring-inset hover:bg-blue-50'>
        {({ open }) => (
          <>
            {!open ? (
              <ChevronDownIcon
                className='h-4 w-4 text-blue-600'
                aria-hidden='true'
              />
            ) : (
              <ChevronUpIcon
                className='h-4 w-4 text-blue-600'
                aria-hidden='true'
              />
            )}
            <span>7 replies</span>
          </>
        )}
      </Menu.Button>
      <Menu.Items className='ml-10 pointer-events-none'>
        <Menu.Item>
          <Comment
            author='Josh'
            avatar='Josh'
            voteCount={2}
            text='this is a comment'
            timestamp='Today at 1:59pm'
          />
        </Menu.Item>
        <Menu.Item>
          <Comment
            author='Josh'
            avatar='Josh'
            voteCount={2}
            text='this is a comment'
            timestamp='Today at 1:59pm'
          />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default CommentReplies;
