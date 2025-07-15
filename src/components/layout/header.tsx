'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mountain, BarChart3, Plus, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: BarChart3 },
  { name: '記録一覧', href: '/records', icon: List },
  { name: '記録追加', href: '/records/new', icon: Plus },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ClimbTracker</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2",
                      isActive && "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button - to be implemented later */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              メニュー
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}