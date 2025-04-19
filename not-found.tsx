"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 text-center mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <p className="text-blue-500">
        Redirecting to home page...
      </p>
    </div>
  );
}
