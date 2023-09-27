'use client';

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import CommentReplyDialog from './CommentReplyDialog';
import { useRef, useState } from 'react';
interface CommentActionsProps {
  voteCount: number;
}

const CommentActions = ({ voteCount }: CommentActionsProps) => {
  const [open, setOpen] = useState(false);

  const openCommentReply = () => {
    setOpen(true);
  };

  const closeCommentReply = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='flex items-center gap-2'>
        <button>
          <HandThumbUpIcon className='h-6 w-6' />
        </button>
        <span className='mr-2'>{voteCount}</span>
        <button>
          <HandThumbDownIcon className='h-6 w-6' />
        </button>
        <button className='text-xs font-bold ml-2' onClick={openCommentReply}>
          Reply
        </button>
      </div>
      {open ? <CommentReplyDialog closeDialog={closeCommentReply} /> : null}
    </div>
  );
};

export default CommentActions;
