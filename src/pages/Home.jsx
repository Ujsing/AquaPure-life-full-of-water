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

import {  useState } from "react"

import AquaPureBanner from "../components/AquaPureBanner"
import ProductCard from "../components/ProductCard"
// import HorizontalScrollContainer from "../components/HorizontalScrollContainer"
// import CapsuleTab from "../components/CapsuleTab"
import { products } from "../data/products"
import { SearchOutlined } from "@ant-design/icons"
import useDebounce from "../hooks/useDebounce"
import StatCards from "../components/StatCards"

const CATEGORIES = ["All", "Still Water", "Mineral", "Sparkling", "Alkaline", "Subscriptions"]

const STATS = [
  { value: "12K+", label: "Happy Customers", color: "#00d4aa" },
  { value: "60%",  label: "Cheaper vs Plastic", color: "#34d399" },
  { value: "4.9★", label: "Avg Rating",       color: "#fbbf24" },
  { value: "0",    label: "Plastic Waste",     color: "#818cf8" },
]



export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All")
  const[search, setSearch] = useState("")
  const debounceSearch = useDebounce(search, 500)

   
    
    const filtered = products.filter(i=>{
      const matchedCategory = activeCategory === 'All' || i.category === activeCategory
      const s = (debounceSearch || "").toLowerCase().trim()

        if(!s){
          return matchedCategory
        }
      const searchMatch = debounceSearch === '' || i.name && i.name.toLowerCase().includes(s) || 
      i.category && i.category.toLowerCase().includes(s) || i.description && i.description.toLowerCase().includes(s)

      return matchedCategory && searchMatch
    })
   
  return (
    <div className="overflow-x-hidden">
       <div className="mt-2.5 mx-2.5 flex items-center gap-3 px-4 py-2.5 rounded-xl
              bg-white/8 border border-white/10">
              <SearchOutlined className="text-white/40 text-base flex-shrink-0" />
              <input autoFocus 
              value={search}
              onChange={e=> setSearch(e.target.value)}
                placeholder="Search water, filters, bottles..."
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/30" />
            </div>

      {/* Hero banner */}
      {search? "" : <AquaPureBanner />}

   

      {/* Category tabs — horizontal scroll */}
      {/* <div className="px-4 mb-4 mt-2.5">
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
      </div> */}


      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-11 2xl:grid-cols-11 gap-3 items-center p-4">
  {CATEGORIES.map(c =>(
    <StatCards key={c} level={c} onclick={()=> setActiveCategory(c)}/>
  ))}
  {/* {topproduct.map((i, index) => (
    <StatCards key={index} product={i} />
  ))} */}
</div>

      {/* Section header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-white font-bold text-lg">
           {debounceSearch ? `Search: ${debounceSearch}` : activeCategory} </h2>
        <span className="text-white/40 text-sm">{filtered.length} products</span>
      </div>


      {/* Products grid — 2 col on mobile, 3 on md, 4 on xl */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 px-4 mb-8">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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