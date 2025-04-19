import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full ${
            activeCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
