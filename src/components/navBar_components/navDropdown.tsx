'use client';
import { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const NavDropdown = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  let [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
    setDropdownOpen(dropdownOpen);
  };

  const closeDropdown = ({ target }: MouseEvent) => {
    if (listRef.current) {
      if (
        !listRef.current?.contains(target as Node) &&
        !buttonRef.current?.contains(target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
  };

  const dropdownOptions: { id: number; option: string; pageLink: string }[] = [
    { id: 0, option: 'sign up', pageLink: 'sign-up' },
    { id: 1, option: 'login', pageLink: 'login' },
    { id: 2, option: 'logout', pageLink: 'logout' },
  ];

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mouseup', closeDropdown);
  });

  return (
    <div className='relative'>
      <button
        type='button'
        className='rounded-full hover:bg-gray-50'
        id='nav-dropdown'
        aria-expanded={dropdownOpen}
        aria-haspopup='true'
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <UserCircleIcon className='h-12 w-12' />
      </button>
      {dropdownOpen ? (
        <ul
          className='absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300'
          aria-labelledby='nav-dropdown'
          aria-orientation='vertical'
          id='nav-dropdown-list'
          role='listbox'
          ref={listRef}
        >
          {dropdownOptions.map(({ id, option, pageLink }) => (
            <li
              key={id}
              className='py-1 px-2 flex items-center cursor-pointer capitalize'
              id='nav-dropdown-list_item'
              role='option'
              tabIndex={-1}
              aria-selected='true'
            >
              <Link href={pageLink} onClick={() => setDropdownOpen(false)}>
                {option}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default NavDropdown;
