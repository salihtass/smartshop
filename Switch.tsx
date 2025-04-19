import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Switch({ checked, onChange, className = '' }: SwitchProps) {
  return (
    <button
      type="button"
      className={`${className} relative inline-flex h-6 w-11 items-center rounded-full ${
        checked ? 'bg-blue-500' : 'bg-gray-200'
      }`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </button>
  );
}
