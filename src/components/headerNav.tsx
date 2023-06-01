'use client';
import Link from 'next/link';

export default function HeaderNav() {
  return (
    <>
      <Link href='/' className='nav-link'>
        Home
      </Link>
      <Link href='/nba' className='nav-link'>
        NBA
      </Link>

      <Link href='/nfl' className='nav-link'>
        NFL
      </Link>

      <Link href='/mlb' className='nav-link'>
        MLB
      </Link>

      <Link href='/nhl' className='nav-link'>
        NHL
      </Link>

      <Link href='/sign-up' className='nav-link'>
        Sign Up
      </Link>

      <Link href='/login' className='nav-link'>
        Login
      </Link>
    </>
  );
}
