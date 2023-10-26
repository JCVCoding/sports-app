'use client';

import { Avatar, Button, Input } from '@material-tailwind/react';
import { useReducer, useState } from 'react';
import commentReducer from '@/reducers/commentReducer';
import { CommentActions } from '../../../reducers/commentReducer';

const CommentBox = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [state, dispatch] = useReducer(commentReducer, { text: inputValue });

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
          onClick={openOnFocus}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Add a comment...'
          value={inputValue}
          variant='static'
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
              type='button'
              variant='filled'
              onClick={() =>
                dispatch({ type: CommentActions.ADD, payload: inputValue })
              }
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
