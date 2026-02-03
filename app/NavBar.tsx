'use client';
import { Box } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiBugAnt } from 'react-icons/hi2';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <HiBugAnt />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                'text-zinc-900': currentPath === link.href,
                'text-zinc-500': currentPath !== link.href,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && <Link href="/api/auth/signout">Logout</Link>}
        {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
      </Box>
    </nav>
  );
};

export default NavBar;
