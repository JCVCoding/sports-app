import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';

interface CommentActionsProps {
  voteCount: number;
}

const CommentActions = ({ voteCount }: CommentActionsProps) => {
  return (
    <div className='flex items-center gap-2'>
      <button>
        <HandThumbUpIcon className='h-6 w-6' />
      </button>
      <span className='mr-2'>{voteCount}</span>
      <button>
        <HandThumbDownIcon className='h-6 w-6' />
      </button>
      <button className='text-xs font-bold ml-2'>Reply</button>
    </div>
  );
};

export default CommentActions;
