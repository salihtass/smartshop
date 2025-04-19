import React from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = "Search product...", 
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-gray-100 rounded-full p-2 flex items-center">
        <svg className="ml-2 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder={placeholder} 
          className="bg-transparent flex-1 outline-none p-2"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="text-blue-500 mr-2">🔍</button>
      </div>
    </form>
  );
}
