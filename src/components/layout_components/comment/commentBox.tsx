'use client';

import { Avatar, Button, Input } from '@material-tailwind/react';
import { useState } from 'react';

const CommentBox = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const openOnFocus = () => {
    setOpen(true);
  };
  const close = () => {
    setInputValue('');
    setOpen(false);
  };
  return (
    <div className='flex flex-row'>
      <Avatar src='/next.svg' className='mr-4' />
      <div className='flex-1'>
        <Input
          crossOrigin={undefined}
          variant='static'
          placeholder='Add a comment...'
          onClick={openOnFocus}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {open ? (
          <div className='flex items-center justify-end gap-x-2 pt-2'>
            <Button
              className='rounded-full normal-case text-sm'
              size='sm'
              variant='text'
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              className='rounded-full normal-case text-sm disabled:bg-gray-300 disabled:text-gray-600'
              color='blue'
              disabled={inputValue == ''}
              ripple={false}
              size='sm'
              type='submit'
              variant='filled'
            >
              Comment
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentBox;
