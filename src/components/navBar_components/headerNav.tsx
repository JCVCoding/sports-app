'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import NavDropdown from './navDropdown';

export default function HeaderNav() {
  let [vpSize, setVpSize] = useState(window.innerWidth);
  const getVpSize = () => {
    setVpSize(window.innerWidth);
  };
  useEffect(() => {
    setVpSize(window.innerWidth);
    window.addEventListener('resize', getVpSize);
    return () => {
      window.removeEventListener('resize', getVpSize);
    };
  }, []);

  return (
    <div className='flex justify-between items-center'>
      <div className='flex md:gap-6 gap-3'>
        {vpSize}
        <Link href='/' className='md:text-xl text-base font-medium'>
          Home
        </Link>
        <Link href='/nba' className='md:text-xl text-base font-medium'>
          NBA
        </Link>

        <Link href='/nfl' className='md:text-xl text-base font-medium'>
          NFL
        </Link>

        <Link href='/mlb' className='md:text-xl text-base font-medium'>
          MLB
        </Link>

        <Link href='/nhl' className='md:text-xl text-base font-medium'>
          NHL
        </Link>
      </div>
      <div className='flex md:gap-6 gap-3 items-center'>
        {vpSize > 768 ? (
          <>
            <Link href='/sign-up' className='md:text-xl text-base font-medium'>
              Sign Up
            </Link>
            <Link href='/login' className='md:text-xl text-base font-medium'>
              Login
            </Link>
            <Link href='/login' className='md:text-xl text-base font-medium'>
              Logout
            </Link>
          </>
        ) : (
          <NavDropdown />
        )}
      </div>
    </div>
  );
}
