import { PropsWithChildren } from 'react';

type NavDropdownType = {
  dropdownOptions: string[];
};

const NavDropdown = ({
  children,
  dropdownOptions,
}: PropsWithChildren<NavDropdownType>) => {
  return (
    <div className='relative'>
      <button
        type='button'
        className='rounded-full hover:bg-gray-50'
        id='nav-dropdown'
        aria-expanded='true'
        aria-haspopup='true'
      >
        {children}
      </button>
      <ul
        className='absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300'
        aria-labelledby='nav-dropdown'
        aria-orientation='vertical'
        id='nav-dropdown-list'
        role='listbox'
        tabIndex={-1}
      >
        {dropdownOptions.map((option, index) => (
          <li
            key={index}
            className='py-1 px-2 flex items-center cursor-pointer capitalize'
            id='nav-dropdown-list_item'
            role='option'
            tabIndex={0}
            aria-selected='true'
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavDropdown;
