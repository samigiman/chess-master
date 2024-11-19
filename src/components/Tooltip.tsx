import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 w-48 px-2 py-1 -mt-1 text-sm text-white transform -translate-y-full bg-gray-900 rounded-lg shadow-lg top-0 left-1/2 -translate-x-1/2">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1/2 left-1/2 -translate-x-1/2 bottom-0"></div>
        </div>
      )}
    </div>
  );
}