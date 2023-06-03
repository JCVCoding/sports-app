'use client';
import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const NavDropdown = () => {
  const dropdownOptions: { id: number; option: string; pageLink: string }[] = [
    { id: 0, option: 'sign up', pageLink: 'sign-up' },
    { id: 1, option: 'login', pageLink: 'login' },
    { id: 2, option: 'logout', pageLink: 'logout' },
  ];
  let [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className='relative'>
      <button
        type='button'
        className='rounded-full hover:bg-gray-50'
        id='nav-dropdown'
        aria-expanded='true'
        aria-haspopup='true'
        onClick={toggleOptions}
      >
        <UserCircleIcon className='h-12 w-12' />
      </button>
      {showOptions ? (
        <ul
          className='absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300'
          aria-labelledby='nav-dropdown'
          aria-orientation='vertical'
          id='nav-dropdown-list'
          role='listbox'
          tabIndex={-1}
        >
          {dropdownOptions.map(({ id, option, pageLink }) => (
            <li
              key={id}
              className='py-1 px-2 flex items-center cursor-pointer capitalize'
              id='nav-dropdown-list_item'
              role='option'
              tabIndex={0}
              aria-selected='true'
            >
              <Link href={pageLink}>{option}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default NavDropdown;
