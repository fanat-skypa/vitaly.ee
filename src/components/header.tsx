'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { User as UserIcon } from 'lucide-react';
import { AdminPopup } from './AdminPopup';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [popupHidden, setPopupHidden] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 z-50 w-full p-4 flex justify-center">
      <div className="w-full max-w-5xl flex items-center justify-center gap-6 relative">
        {/* Навигация */}
        <nav className="flex gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-all duration-300 hover:bg-white/30 hover:text-foreground px-4 py-2 rounded-full',
                typeof window !== 'undefined' && window.location.pathname === link.href
                  ? 'bg-white/50 text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Кнопка логина/выхода */}
        {mounted && (
          <div className="absolute right-0">
            {user ? (
              <div className="flex items-center gap-2 glass-card p-1 rounded-full">
                <span className="text-sm text-muted-foreground pl-3">{user.displayName}</span>
                <Button onClick={logout} variant="ghost" size="sm" className="rounded-full">
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setPopupHidden(false)}
                variant="ghost"
                size="sm"
                className="glass-card rounded-full flex items-center gap-1"
              >
                <UserIcon className="h-4 w-4" />
                Admin
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Попап */}
      {mounted && <AdminPopup hidden={popupHidden} onClose={() => setPopupHidden(true)} />}
    </header>
  );
}
