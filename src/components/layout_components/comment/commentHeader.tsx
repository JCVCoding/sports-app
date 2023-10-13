'use client';

import CommentBox from './commentBox';
import {
  Button,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
} from '@material-tailwind/react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
const CommentHeader = () => {
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value: number) => setSelected(value);

  return (
    <div className='flex flex-col my-8 gap-y-4'>
      <div className='flex flex-row gap-x-8 items-center'>
        <div>268 Comments</div>
        <Menu placement='bottom-start'>
          <MenuHandler>
            <Button
              className='flex items-center gap-x-2 rounded-full px-2'
              size='sm'
              variant='text'
            >
              <Bars3BottomLeftIcon className='h-6 w-6' />
              Sort By
            </Button>
          </MenuHandler>
          <MenuList className='px-0 py-1'>
            <List>
              <ListItem
                selected={selected === 1}
                onClick={() => setSelectedItem(1)}
              >
                Top Comments
              </ListItem>
              <ListItem
                selected={selected === 2}
                onClick={() => setSelectedItem(2)}
              >
                Newest First
              </ListItem>
            </List>
          </MenuList>
        </Menu>
      </div>
      <div>
        <CommentBox />
      </div>
    </div>
  );
};

export default CommentHeader;
