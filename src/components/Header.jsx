'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
      <ul className="flex gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <li><Link href="/sign-in">Sign in</Link></li>
        </SignedOut>
        <li className="hidden sm:block"><Link href="/">Home</Link></li>
        <li className='hidden sm:block'>
          <Link href={'/favorites'}>Favorites</Link>
        </li>
        <li className="hidden sm:block"><Link href="/about">About</Link></li>
      </ul>
      <div className='flex items-center gap-4'>
        <DarkModeSwitch />
        <Link href={'/'} className='flex gap-1 items-center'>
          <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg'>
            Cine
          </span>
          <span className='text-xl hidden sm:inline'>Mix</span>
        </Link>
      </div>
    </div>
  );
}
