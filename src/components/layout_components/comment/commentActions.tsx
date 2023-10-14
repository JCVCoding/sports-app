'use client';

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import CommentReplyDialog from './commentReplyDialog';
import { useRef, useState } from 'react';
interface CommentActionsProps {
  author: string;
  voteCount: number;
}

const CommentActions = ({ voteCount, author }: CommentActionsProps) => {
  const [open, setOpen] = useState(false);
  let inputReference = useRef<HTMLInputElement>(null);

  const openCommentReply = () => {
    setOpen(true);
  };

  const closeCommentReply = () => {
    setOpen(false);
  };

  const focusReplyDialogInput = () => {
    setTimeout(() => {
      inputReference.current?.focus();
    }, 0);
  };

  return (
    <div>
      <div className='flex items-center gap-2'>
        <Button className='rounded-full px-2' size='sm' variant='text'>
          <HandThumbUpIcon className='h-6 w-6' />
        </Button>
        <span className='mr-2'>{voteCount}</span>
        <Button className='rounded-full px-2' size='sm' variant='text'>
          <HandThumbDownIcon className='h-6 w-6' />
        </Button>
        <Button
          className='rounded-full font-bold normal-case'
          onClick={() => {
            openCommentReply();
            focusReplyDialogInput();
          }}
          size='sm'
          variant='text'
        >
          Reply
        </Button>
      </div>
      {open ? (
        <CommentReplyDialog
          closeDialog={closeCommentReply}
          ref={inputReference}
        />
      ) : null}
    </div>
  );
};

export default CommentActions;
