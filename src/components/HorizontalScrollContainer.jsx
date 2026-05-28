// HorizontalScrollContainer.jsx
import { useRef } from 'react';

const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-none"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScrollContainer;