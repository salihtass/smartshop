import React from 'react';
import Link from 'next/link';
import InstallButton from '@/components/features/InstallButton';

export default function Header() {
  return (
    <header className="bg-white py-4 px-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-2xl font-bold text-blue-600">
          SpendSmart
        </Link>
        <div className="flex items-center space-x-4">
          <InstallButton />
          <Link href="/profile" className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600">P</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
