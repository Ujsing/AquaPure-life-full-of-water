

import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import '../App.css'

export default function Topbar() {
  const [isMobileMenuOpen] = useState(true);

  return (
    <div className="sticky top-4 z-50 px-4 w-full">
      <div className="w-full max-w-full mx-auto">
        
        {/* Main Navbar - Always horizontal on desktop */}
        <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4 bg-transparent backdrop-blur-xl shadow-lg">
          
          {/* Logo - Left side */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-[0_0_6px_4px_rgba(52,211,153,0.8)]"></div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">AquaPure</h1>
          </div>

          {/* Search Bar - Center (hidden on mobile, visible on tablet+) */}
          <div className="hidden md:block flex-1 max-w-md lg:max-w-full mx-2 lg:mx-4">
            <div className="flex items-center gap-2 lg:gap-3 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <span className="text-sm lg:text-base">🔍</span>
              <input
                type="text"
                placeholder="Search water cans..."
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-400 text-sm lg:text-base"
              />
            </div>
          </div>

           {/* <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/10"
            >
              {isMobileMenuOpen ? (
                <CloseOutlined className="text-white text-base sm:text-xl" />
              ) : (
                <SearchOutlined className="text-white text-base sm:text-xl" />
              )}
            </button> */}

          {/* Right Icons */}
          <div className="flex flex-shrink-0 items-center gap-3 sm:gap-5">
            <div className="relative rounded-full bg-cyan-500/30 w-8 h-8 sm:w-10 sm:h-10 flex  justify-center">
              <ShoppingCartOutlined className="text-xl sm:text-2xl text-white" />
              <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-400 text-black text-[10px] sm:text-xs flex items-center justify-center font-bold">
                3
              </span>
            </div>
            <div className="flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/30 items-center justify-center text-white font-bold text-sm sm:text-base ml-1">
              UJ
            </div>
            
            {/* Mobile Menu Button */}
           
          </div>
        </div>

        {/* Mobile Menu - Only shows on mobile when clicked */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
            {/* Mobile Search Bar */}
            <div className="mb-4">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 border border-white/10">
                🔍
                <input
                  type="text"
                  placeholder="Search water cans..."
                  className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Mobile User Info */}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
                  UJ
                </div>
                <span className="text-white">John Doe</span>
              </div>
              <button className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium">
                Sign Out
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}