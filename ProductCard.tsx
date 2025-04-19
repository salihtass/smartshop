import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  image?: string;
  name: string;
  store?: string;
  discount?: string;
  expiryInfo?: string;
  count?: number;
  onSave?: () => void;
}

export default function ProductCard({
  image,
  name,
  store,
  discount,
  expiryInfo,
  count,
  onSave
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex">
        <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0 relative">
          {image && (
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover rounded-md" 
              sizes="64px"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{name}</h3>
          {store && discount && (
            <p className="text-gray-600">{store} - {discount}</p>
          )}
          {expiryInfo && (
            <p className="text-blue-500">{expiryInfo}</p>
          )}
          {count !== undefined && (
            <p className="text-gray-500 text-sm">{count} times</p>
          )}
        </div>
        {onSave && (
          <button 
            onClick={onSave}
            className="bg-green-500 text-white px-4 py-2 rounded-full h-10 self-center"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
