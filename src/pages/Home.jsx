// import Topbar from '../components/Topbar'
// import ProductCard from '../components/ProductCard'
// import AquaPureBanner from '../components/AquaPureBanner'
// import { useState } from 'react';
// import HorizontalScrollContainer from '../components/HorizontalScrollContainer';
// import CapsuleTab from '../components/CapsuleTab';

// export default function Home() {
//     const [activeCategory, setActiveCategory] = useState('All');
//      const categories = [
//     'All',
//     'Still Water',
//     'Mineral',
//     'Sparkling',
//     'Alkaline',
//     'Subscriptions'
//   ];

//   const products = [
//     { id: 1, name: "Classic Still" },
//     { id: 2, name: "Mineral Water" },
//     { id: 3, name: "Cold Water" },
//     { id: 4, name: "RO Water" },
//     { id: 5, name: "Fresh Water" },
//     { id: 6, name: "Pure Water" },
//   ]
  
//   return (
    
//     <>
//     <div className="overflow-x-hidden">

//       {/* <Topbar /> */}
//       <AquaPureBanner/>
    
      
//       <div className='container py-1'>
//           <div className="w-full mx-1.5">
//       <HorizontalScrollContainer>
//         {categories.map((category) => (
//           <CapsuleTab
//             key={category}
//             label={category}
//             isActive={activeCategory === category}
//             onClick={() => setActiveCategory(category)}
//           />
//         ))}
//       </HorizontalScrollContainer>
//     </div>
//        <div className="flex  w-screen justify-between items-center px-10">
//           <h2 className="text-2xl font-bold text-gray-500">
//             {activeCategory}
//           </h2>
//           <span className="text-gray-500 text-sm">
//             {products.length} products
//           </span>
//         </div>
    
//       <div className="w-screen grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3  p-10"> 
//      {products.map((i)=>(
//       <ProductCard key={i.id}/>
//     ))}

//     </div>
//       </div>
//     </div>
//     </>
//   )
// }

import { useState } from "react"
import { Link } from "react-router-dom"
import { Tag } from "antd"
import AquaPureBanner from "../components/AquaPureBanner"
import ProductCard from "../components/ProductCard"
import HorizontalScrollContainer from "../components/HorizontalScrollContainer"
import CapsuleTab from "../components/CapsuleTab"
import { products } from "../data/products"

const CATEGORIES = ["All", "Still Water", "Mineral", "Sparkling", "Alkaline", "Subscriptions"]

const STATS = [
  { value: "12K+", label: "Happy Customers", color: "#00d4aa" },
  { value: "60%",  label: "Cheaper vs Plastic", color: "#34d399" },
  { value: "4.9★", label: "Avg Rating",       color: "#fbbf24" },
  { value: "0",    label: "Plastic Waste",     color: "#818cf8" },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All")


  // Filter products by selected category
  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="overflow-x-hidden">

      {/* Hero banner */}
      <AquaPureBanner />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 mb-6">
        {STATS.map(s => (
          <div key={s.label}
            className="rounded-2xl p-4 text-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category tabs — horizontal scroll */}
      <div className="px-4 mb-4">
        <HorizontalScrollContainer>
          {CATEGORIES.map(cat => (
            <CapsuleTab
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </HorizontalScrollContainer>
      </div>

      {/* Section header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-white font-bold text-lg">{activeCategory}</h2>
        <span className="text-white/40 text-sm">{filtered.length} products</span>
      </div>

      {/* Products grid — 2 col on mobile, 3 on md, 4 on xl */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 px-4 mb-8">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Why AquaPure section */}
      <div className="mx-4 mb-8 p-5 rounded-3xl"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <h3 className="text-white font-bold text-base mb-4">Why AquaPure?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { emoji: "♻️", title: "Recycled Glass", desc: "Zero BPA. Zero microplastics. Refillable every delivery." },
            { emoji: "💧", title: "Hospital Grade", desc: "RO + UV + Mineral filter. Lab tested every batch." },
            { emoji: "💰", title: "Save 60%",       desc: "₹8/L vs ₹20/L plastic. Better for you and your wallet." },
          ].map(item => (
            <div key={item.title} className="p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-white font-semibold text-sm mt-2">{item.title}</p>
              <p className="text-white/40 text-xs mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}