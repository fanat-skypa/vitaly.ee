'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User as UserIcon } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
];

export function Header() {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full p-4 flex justify-center">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <div className="flex-1"></div>
        <nav className="flex-1 flex justify-center">
          <div className="glass-card flex items-center space-x-2 text-sm font-medium p-1 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80 px-4 py-1.5 rounded-full',
                  pathname === link.href ? 'bg-white/50 text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex-1 flex justify-end">
          {user ? (
            <div className="flex items-center gap-2 glass-card p-1 rounded-full">
              <span className="text-sm text-muted-foreground pl-3">
                {user.displayName}
              </span>
              <Button onClick={logout} variant="ghost" size="sm" className="rounded-full">Logout</Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="glass-card rounded-full w-10 h-10">
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <DropdownMenuItem onClick={() => login('user')}>
                  Login as User
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => login('admin')}>
                  Login as Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
