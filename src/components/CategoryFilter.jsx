// import { useState, useRef, useEffect } from 'react';

// const CategoryFilter = ({ 
//   categories = [],        // Array of category names
//   activeCategory = '',    // Currently selected category
//   onCategoryChange,       // Function called when category changes
//   showScrollButtons = true // Show left/right scroll buttons
// }) => {
//   const [active, setActive] = useState(activeCategory || categories[0]);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const scrollContainerRef = useRef(null);

//   // Handle category click
//   const handleCategoryClick = (category) => {
//     setActive(category);
//     if (onCategoryChange) {
//       onCategoryChange(category);
//     }
//   };

//   // Check scroll position to show/hide arrows
//   const checkScrollPosition = () => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const { scrollLeft, scrollWidth, clientWidth } = container;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
//   };

//   // Scroll functions
//   const scroll = (direction) => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const scrollAmount = 200; // Pixels to scroll
//     const newScrollLeft = direction === 'left' 
//       ? container.scrollLeft - scrollAmount 
//       : container.scrollLeft + scrollAmount;
    
//     container.scrollTo({
//       left: newScrollLeft,
//       behavior: 'smooth'
//     });
//   };

//   // Listen to scroll events
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScrollPosition);
//       window.addEventListener('resize', checkScrollPosition);
//       checkScrollPosition(); // Initial check
      
//       return () => {
//         container.removeEventListener('scroll', checkScrollPosition);
//         window.removeEventListener('resize', checkScrollPosition);
//       };
//     }
//   }, []);

//   // Re-check when categories change
//   useEffect(() => {
//     checkScrollPosition();
//   }, [categories]);

//   return (
//     <div className="relative w-full">
//       {/* Left Scroll Arrow */}
//       {showScrollButtons && showLeftArrow && (
//         <button
//           onClick={() => scroll('left')}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
//           style={{ transform: 'translateY(-50%)' }}
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//       )}

//       {/* Scrollable Categories Container */}
//       <div
//         ref={scrollContainerRef}
//         className="overflow-x-auto scrollbar-hide"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         <div className="flex gap-3 px-4 pb-3 min-w-max">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => handleCategoryClick(category)}
//               className={`
//                 px-6 py-2 rounded-full text-base font-medium whitespace-nowrap
//                 transition-all duration-300 transform hover:scale-105
//                 ${active === category 
//                   ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md' 
//                   : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-500'
//                 }
//               `}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right Scroll Arrow */}
//       {showScrollButtons && showRightArrow && (
//         <button
//           onClick={() => scroll('right')}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// export default CategoryFilter;