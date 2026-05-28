// import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
// import { Badge } from "antd"
// import { Link,} from "react-router-dom"
// import { useCart } from "../context/CartContext"
// import useDebounce from "../hooks/useDebounce"
// import { useEffect, useState } from "react"
// // import { useAuth } from "../context/AuthContext"


// export default function Topbar() {
//   const { totalItems } = useCart()
//     const[search, setSearch] = useState('')
//   const debounceValue = useDebounce(search, 500)
   
//   useEffect(()=>{
//     if(debounceValue){
//       console.log("cll api", debounceValue)
//     }
//   },[debounceValue])

//   // const { user, setShowSignIn } = useAuth()

//   return (
//     <div className="sticky top-0 z-50 px-4 pt-3 pb-1 w-full
//       bg-black/20 backdrop-blur-xl border-b border-white/10">

//       <div className="max-w-full mx-auto">

//         <div className="flex items-center justify-between gap-3">
//           <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
//             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400
//               shadow-[0_0_6px_4px_rgba(52,211,153,0.5)]" />
//             <span className="text-white font-bold text-lg">AquaPure</span>
//           </Link>
//           <div className="flex items-center gap-3 flex-shrink-0">

//             {/* Cart icon — clicking goes to /cart */}
//             <Link to="/cart" className="relative">
//               <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-white/10
//                 flex items-center justify-center cursor-pointer hover:bg-cyan-500/30 transition-all">
//                 <Badge count={totalItems} size="small"
//                   styles={{ indicator: { background: '#34d399', color: '#000', fontWeight: 700, fontSize: 10 } }}>
//                   <ShoppingCartOutlined className="text-xl text-white" />
//                 </Badge>
//               </div>
//             </Link>

//             {/* User avatar or Sign In button */}
//             {/* {user ? (
//               <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-white/10
//                 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
//                 {user.initials.toUpperCase()}
//               </div>
//             ) : (
//               <button
//                 onClick={() => setShowSignIn(true)}
//                 className="px-3 py-1.5 rounded-full text-xs font-semibold
//                   bg-emerald-500/15 border border-emerald-400/30 text-emerald-300
//                   hover:bg-emerald-500/25 transition-all">
//                 Sign In
//               </button>
//             )} */}
//           </div>
//         </div>

//       </div>
//       {/* Search */}
//       <div className=" mt-2  item-4 bg-trasparent backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
//             <div className="">             
//                 <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 border border-white/10">
//                  <SearchOutlined className="text-2xl !text-white"/>
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e)=>setSearch(e.target.value)}
//                   placeholder="Search water cans..."
//                   className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
//                   autoFocus
//                 />
//               </div>
//             </div>
//             </div>
//     </div>
//   )
// }

// src/components/Topbar.jsx
import { useEffect, useState, useRef } from "react"
import { Badge, Dropdown } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCartOutlined, SearchOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useAddress } from "../context/AddressContext"
import useDebounce from "../hooks/useDebounce"
import { products } from "../data/products"

export default function Topbar() {
  const { totalItems }          = useCart()
  const { user, setShowSignIn } = useAuth()
  const { selectedAddress }     = useAddress()
  const navigate                = useNavigate()

  // ── Search state ──────────────────────────────────────────
  const [searchVal, setSearchVal] = useState("")
  const [results,   setResults]   = useState([])
  const [showDrop,  setShowDrop]  = useState(false)
  const searchRef = useRef(null)  // detect click outside to close dropdown

  // useDebounce: waits 400ms AFTER user stops typing before updating
  // Without debounce: search runs on every single keystroke
  // With debounce:    search runs only when user pauses (better UX + saves API calls)
  const debouncedSearch = useDebounce(searchVal, 400)

  // ── Runs when debouncedSearch changes (not on every keystroke) ──
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([])
      setShowDrop(false)
      return
    }

    // Case-insensitive search across name, type, and category
    const q = debouncedSearch.toLowerCase()
    const filtered = products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )

    setResults(filtered)
    setShowDrop(true)
  }, [debouncedSearch])

  // ── Close dropdown on outside click ──────────────────────
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDrop(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function clearSearch() {
    setSearchVal("")
    setResults([])
    setShowDrop(false)
  }

  function handleSelectResult(product) {
    clearSearch()
    navigate("/")   // later: navigate(`/products/${product.id}`)
  }

  // ── Address dropdown menu ─────────────────────────────────
  const addressMenu = {
    items: [
      {
        key: "header",
        type: "group",
        label: <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">Saved Addresses</span>,
      },
      { type: "divider" },
      {
        key: "add-new",
        label: (
          <div onClick={() => navigate("/address")}
            className="flex items-center gap-2 text-emerald-400 text-xs font-semibold cursor-pointer">
            <span className="text-base">+</span> Add new address
          </div>
        ),
      },
    ],
  }

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-full mx-auto px-4 pt-3 pb-2">

          {/* ── Row 1: Logo | Address | Cart + User ── */}
          <div className="flex justify-between items-center gap-3 px-1">

            <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00d4aa, #0891b2)" }}>
                💧
              </div>
              <span className="text-white font-bold text-base hidden sm:block">AquaPure</span>
            </Link>

            <Dropdown menu={addressMenu} trigger={["click"]} placement="bottomCenter"
              overlayStyle={{ minWidth: 300 }} overlayClassName="addr-dd">
              <button className="flex-1 max-w-xl flex items-center gap-2 px-3 py-2 rounded-xl
                border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer min-w-0">
                <EnvironmentOutlined className="!text-emerald-400 text-sm flex-shrink-0" />
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-white text-[10px] font-semibold truncate">
                    {selectedAddress?.city ?? "Select Address"}
                  </span>
                  <span className="text-white/40 text-[10px] truncate">
                    {selectedAddress?.line1 ?? "Tap to choose"}
                  </span>
                </div>
                <svg className="w-3 h-3 text-white/30 flex-shrink-0" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Dropdown>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link to="/cart">
                <div className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-cyan-500/15 border border-white/10 hover:bg-cyan-500/25 transition-all">
                  <Badge count={totalItems} size="small"
                    styles={{ indicator: { background: "#34d399", color: "#000", fontWeight: 700, fontSize: 10 } }}>
                    <ShoppingCartOutlined className="text-white text-lg" />
                  </Badge>
                </div>
              </Link>

              <button onClick={() => navigate("/orders")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                  border border-white/15 bg-white/6 hover:bg-white/12 transition-all">
                <span className="text-white/50 text-xs">Orders</span>
              </button>

              {user ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
                  bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#00d4aa,#4f8ef7)" }}>
                    {user.initials}
                  </div>
                  <span className="text-white/70 text-sm font-medium hidden sm:block">{user.name}</span>
                </div>
              ) : (
                <button onClick={() => setShowSignIn(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold
                    bg-emerald-500/15 border border-emerald-400/30 text-emerald-300
                    hover:bg-emerald-500/25 transition-all whitespace-nowrap">
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* ── Row 2: Search bar with dropdown results ── */}
          <div ref={searchRef} className="relative mt-2.5">

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/8 border border-white/10">
              <SearchOutlined className="text-white/40 text-base flex-shrink-0" />
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onFocus={() => results.length > 0 && setShowDrop(true)}
                placeholder="Search water, filters, bottles..."
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/30"
              />
              {searchVal && (
                <button onClick={clearSearch}
                  className="text-white/30 hover:text-white/70 text-sm transition-all">
                  ✕
                </button>
              )}
            </div>

            {/* Results dropdown — absolute, appears below search input */}
            {showDrop && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50
                border border-white/12"
                style={{ background: "#0d1a2e", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}>

                {results.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <p className="text-2xl mb-2">🔍</p>
                    <p className="text-white/50 text-sm">No results for "{debouncedSearch}"</p>
                    <p className="text-white/25 text-xs mt-1">Try "mineral" or "sparkling"</p>
                  </div>
                ) : (
                  <>
                    <div className="px-4 pt-3 pb-1">
                      <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                        {results.length} result{results.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    {results.map(product => (
                      <button key={product.id} onClick={() => handleSelectResult(product)}
                        className="w-full flex items-center gap-3 px-4 py-3
                          hover:bg-white/6 transition-all text-left border-b border-white/5 last:border-b-0">
                        <div className="w-9 h-9 rounded-xl flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${product.gradientFrom}88, ${product.gradientTo}44)` }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold">
                            <Highlight text={product.name} query={debouncedSearch} />
                          </p>
                          <p className="text-white/35 text-xs mt-0.5">{product.type} · {product.size}</p>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm flex-shrink-0">
                          ₹{product.price}
                        </span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .addr-dd .ant-dropdown-menu {
          background: #0d1a2e !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 16px !important;
          padding: 8px !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important;
        }
        .addr-dd .ant-dropdown-menu-item { border-radius: 10px !important; padding: 4px 8px !important; }
        .addr-dd .ant-dropdown-menu-item:hover { background: rgba(255,255,255,0.06) !important; }
        .addr-dd .ant-dropdown-menu-item-group-title { padding: 4px 12px !important; }
        .addr-dd .ant-dropdown-menu-item-divider { background: rgba(255,255,255,0.08) !important; }
      `}</style>
    </>
  )
}

// Highlights the matching part of search result text in teal
// e.g. query="min" + text="Mineral" → renders "Min" in emerald-400 color
function Highlight({ text, query }) {
  if (!query) return <span>{text}</span>

  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return <span>{text}</span>

  return (
    <span>
      {text.slice(0, index)}
      <span className="text-emerald-400 font-bold">
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </span>
  )
}


// import { useEffect, useState } from "react"
// import { Badge, Dropdown } from "antd"
// import { Link, useNavigate } from "react-router-dom"
// import {
//   ShoppingCartOutlined, SearchOutlined,
//   EnvironmentOutlined,
// } from "@ant-design/icons"
// import { useCart } from "../context/CartContext"
// import { useAuth } from "../context/AuthContext"
// import useDebounce from "../hooks/useDebounce"
// import { useAddress } from "../context/AddressContext"


// export default function Topbar() {
//   const { totalItems } = useCart()
//   const { user, setShowSignIn }  = useAuth()
//   const {selectedAddress} =  useAddress()
//   // const { addresses, selectedAddressId, setSelectedAddressId, selectedAddress } = useCheckout()
//   const navigate = useNavigate()

//   // const [drawerOpen, setDrawerOpen] = useState(false)
//   const [searchVal,  setSearchVal]  = useState("")
// const [results, setResults] = useState([])
// const debounceSearch = useDebounce(searchVal, 500)
// const products = [
//   "Mineral Water",
//   "Cold Water",
//   "Water Bottle",
//   "RO Filter",
// ]
// useEffect(()=>{
//   if(!debounceSearch.trim()){
//     setResults([])
//     return
//   }
//   const s = debounceSearch.toLowerCase()
//   const filter =  products.filter(item =>
      
//         item.name.toLowerCase().includes(s) ||
//         item.type.toLowerCase().includes(s) ||
//         item.category.toLowerCase().includes(s)

//   )
//   setResults(filter)
// },[debounceSearch])
   

//   const openOrderpage=()=>{
//   navigate('/orders')
//   }
//   // ── Address dropdown items for Ant Design Dropdown ──
//   const addressMenu = {
//     items: [
//       // Header label (not clickable)
//       {
//         key: "header",
//         type: "group",
//         label: <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">Saved Addresses</span>,
//       },
     
//       { type: "divider" },
//       {
//         key: "add-new",
//         label: (
//           <div onClick={() => navigate("/address")}
//             className="flex items-center gap-2 text-emerald-400 text-xs font-semibold cursor-pointer">
//             <span className="text-base">+</span> Add new address
//           </div>
//         ),
//       },
//     ],
//   }

//   return (
//     <>
//       <div className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10">
//         <div className="max-w-full mx-auto px-4 pt-3 pb-2">

//           {/* ── Main row ── */}
//           <div className="flex justify-between items-center gap-3 px-1">

//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//                 style={{ background: "linear-gradient(135deg, #00d4aa, #0891b2)" }}>
//                 💧
//               </div>
//               <span className="text-white font-bold text-base hidden sm:block">AquaPure</span>
//             </Link>

//             {/* ── Address dropdown pill ── */}
//             <Dropdown menu={addressMenu} trigger={["click"]} placement="bottomCenter"
//               overlayStyle={{ minWidth: 300 }} overlayClassName="addr-dd">
//               <button className="flex-1 max-w-xl flex items-center gap-2 px-3 py-2 rounded-xl
//                 border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer min-w-0">
//                 <EnvironmentOutlined className="!text-emerald-400 text-sm flex-shrink-0" />
//                   <div className="flex flex-col items-start min-w-0 flex-1">
//                 <span className="!text-white text-[10px] font-semibold truncate">
//                  {selectedAddress?.city}
//                 </span>

//                 <span className="text-white/40 text-[10px] truncate">
//                  {/* {selectAddress.line1} */}
//                  </span>   
//                  </div>            
//                 {/* Chevron */}
//                 <svg className="w-3 h-3 text-white/30 flex-shrink-0" viewBox="0 0 12 12" fill="none">
//                   <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </Dropdown>

//             {/* ── Right actions ── */}
//             <div className="flex items-center gap-2 flex-shrink-0">

//               {/* Search toggle */}
//               {/* <button onClick={() => { setSearchOpen(item => !item); setSearchVal("") }}
//                 className="lw-9 h-9 rounded-full flex items-center justify-center
//                   bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
//                 <SearchOutlined className="text-white/70 text-base" />
//               </button> */}

//               {/* Cart */}
//               <Link to="/cart">
//                 <div className="w-9 h-9 rounded-full flex items-center justify-center
//                   bg-cyan-500/15 border border-white/10 hover:bg-cyan-500/25 transition-all">
//                   <Badge count={totalItems} size="small"
//                     styles={{ indicator: { background: "#34d399", color: "#000", fontWeight: 700, fontSize: 10 } }}>
//                     <ShoppingCartOutlined className="text-white text-lg" />
//                   </Badge>
//                 </div>
//               </Link>

//               {/* ── ORDER SUMMARY button — the Flipkart-style trigger ── */}
//               <button onClick={openOrderpage}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl
//                   border border-white/15 bg-white/6 hover:bg-white/12 transition-all">
//                 <div className="hidden sm:flex flex-col items-start leading-none">
//                   <span className="text-white/50 text-[10px]">Order</span>
//                   {/* <span className="text-white font-bold text-xs">
//                     {subtotal > 0 ? `₹${subtotal}` : "View"}
//                   </span> */}
//                 </div>
//               </button>

//               {/* User chip */}
//               {user ? (
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
//                   bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
//                   <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
//                     style={{ background: "linear-gradient(135deg,#00d4aa,#4f8ef7)" }}>
//                     {user.initials}
//                   </div>
//                   <span className="text-white/70 text-sm font-medium hidden sm:block">{user.name}</span>
//                 </div>
//               ) : (
//                 <button onClick={() => setShowSignIn(true)}
//                   className="px-3 py-1.5 rounded-full text-xs font-semibold
//                     bg-emerald-500/15 border border-emerald-400/30 text-emerald-300
//                     hover:bg-emerald-500/25 transition-all whitespace-nowrap">
//                   Sign In
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* ── Search bar — slides open ── */}
//             <div className="mt-2.5 flex items-center gap-3 px-4 py-2.5 rounded-xl
//               bg-white/8 border border-white/10">
//               <SearchOutlined className="text-white/40 text-base flex-shrink-0" />
//               <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)}
//                 placeholder="Search water, filters, bottles..."
//                 className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/30" />
//               {searchVal && (
//                 <button onClick={() => setSearchVal("")} className="text-white/30 hover:text-white/60 text-xs">✕</button>
//               )}
//             </div>

            
            
//         </div>
//       </div>

//       {/* Dropdown dark theme override */}
//       <style>{`
//         .addr-dd .ant-dropdown-menu {
//           background: #0d1a2e !important;
//           border: 1px solid rgba(255,255,255,0.12) !important;
//           border-radius: 16px !important;
//           padding: 8px !important;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important;
//         }
//         .addr-dd .ant-dropdown-menu-item { border-radius: 10px !important; padding: 4px 8px !important; }
//         .addr-dd .ant-dropdown-menu-item:hover { background: rgba(255,255,255,0.06) !important; }
//         .addr-dd .ant-dropdown-menu-item-group-title { padding: 4px 12px !important; }
//         .addr-dd .ant-dropdown-menu-item-divider { background: rgba(255,255,255,0.08) !important; }
//       `}</style>

//       {/* The Flipkart-style drawer */}
//       {/* <OrderSummaryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} /> */}
//     </>
//   )
// }