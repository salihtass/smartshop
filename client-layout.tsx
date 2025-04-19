"use client";

import React from 'react';
import DbInitializer from '@/components/DbInitializer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DbInitializer>
      {children}
    </DbInitializer>
  );
}
