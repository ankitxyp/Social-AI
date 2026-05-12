'use client';

import Link from 'next/link';
import { Home, History, User, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'History', icon: History, path: '/history' },
    { name: 'Premium', icon: Sparkles, path: '/premium' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 sm:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? 'text-purple-500' : 'text-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-[10px] mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
