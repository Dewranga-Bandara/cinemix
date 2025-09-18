import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-3 max-w-6xl mx-auto
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-gray-100
                       transition-colors duration-300">
      <ul className="flex gap-4">
        <li><Link href="/sign-in">Sign in</Link></li>
        <li className="hidden sm:block"><Link href="/">Home</Link></li>
        <li className="hidden sm:block"><Link href="/about">About</Link></li>
      </ul>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <Link href="/" className="flex gap-1 items-center">
          <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">Cine</span>
          <span className="text-xl hidden sm:inline">Mix</span>
        </Link>
      </div>
    </header>
  );
}
