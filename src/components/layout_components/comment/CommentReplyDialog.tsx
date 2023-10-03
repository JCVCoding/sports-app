import { Avatar, Button, Input } from '@material-tailwind/react';
import { forwardRef } from 'react';
import { Ref } from 'react';

const CommentReplyDialog = (
  { closeDialog }: { closeDialog: () => void },
  ref: Ref<HTMLInputElement>
) => {
  return (
    <div className='flex'>
      <Avatar src='/next.svg' size='xs' className='relative top-4' />
      <div className='flex-1 pl-4'>
        <Input
          crossOrigin={undefined}
          variant='static'
          placeholder='Add a reply...'
          inputRef={ref}
        />
        <div className='flex items-center justify-end gap-x-2 pt-2'>
          <Button
            className='rounded-full normal-case text-sm'
            onClick={() => closeDialog()}
            size='sm'
            variant='text'
          >
            Cancel
          </Button>
          <Button
            className='rounded-full normal-case text-sm'
            ripple={false}
            size='sm'
            type='submit'
            variant='filled'
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CommentReplyDialog);
