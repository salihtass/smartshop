"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const router = useRouter();
  
  React.useEffect(() => {
    // Redirect to home page
    router.push('/home');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading SpendSmart...</p>
      </div>
    </div>
  );
}
