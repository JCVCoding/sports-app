import { Avatar, Button, Input } from '@material-tailwind/react';

const CommentReplyDialog = ({ closeDialog }: { closeDialog: () => void }) => {
  return (
    <div className='flex'>
      <Avatar src='/next.svg' size='xs' className='relative top-4' />
      <div className='flex-1 pl-4'>
        <Input
          crossOrigin={undefined}
          variant='static'
          placeholder='Add a reply...'
        />
        <div className='flex items-center justify-end gap-x-2 pt-2'>
          <Button
            variant='text'
            size='sm'
            className='rounded-full normal-case text-sm'
            onClick={() => closeDialog()}
          >
            Cancel
          </Button>
          <Button
            variant='filled'
            size='sm'
            className='rounded-full normal-case text-sm'
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyDialog;
