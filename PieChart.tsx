import React from 'react';

interface PieChartProps {
  data: {
    category: string;
    value: number;
    color: string;
  }[];
}

export default function PieChart({ data }: PieChartProps) {
  // In a real implementation, we would use a charting library like Recharts
  // This is a placeholder visualization
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="w-full">
      <div className="w-48 h-48 mx-auto rounded-full bg-gray-100 relative">
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">Total: {total}</span>
        </div>
        {/* Placeholder for pie segments */}
        {data.map((item, index) => (
          <div 
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ 
              clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos(index * Math.PI / 2)}% ${50 + 40 * Math.sin(index * Math.PI / 2)}%, ${50 + 40 * Math.cos((index + 1) * Math.PI / 2)}% ${50 + 40 * Math.sin((index + 1) * Math.PI / 2)}%)`,
              backgroundColor: item.color,
              opacity: 0.8
            }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
