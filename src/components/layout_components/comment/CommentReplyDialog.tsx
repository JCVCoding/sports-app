import { Avatar, Button, Input } from '@material-tailwind/react';
import { useRef } from 'react';

const CommentReplyDialog = ({
  closeDialog,
  focusInput,
}: {
  author: string;
  closeDialog: () => void;
  focusInput: boolean;
}) => {
  let inputReference = useRef<HTMLInputElement>(null);
  return (
    <div className='flex'>
      <Avatar src='/next.svg' size='xs' className='relative top-4' />
      <div className='flex-1 pl-4'>
        <Input
          crossOrigin={undefined}
          variant='static'
          placeholder='Add a reply...'
          ref={inputReference}
          inputRef={(ref) => {
            if (focusInput) {
              ref?.focus();
            }
          }}
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

export default CommentReplyDialog;
