// import { ExperimentOutlined} from "@ant-design/icons";

// export default function ProductCard() {
//   return (
// <>
// <div className="relative w-full min-h-52 rounded-[28px] glass
// bg-gradient-to-br from-[#03122b] to-[#020617] border border-emerald-400/80 !important
// p-5 overflow-hidden flex flex-col justify-between">

//   {/* Top */}
//   <div className="flex items-start justify-between">

//     {/* Icon */}
//     <div className="max-w-14 max-h-14 rounded-2xl 
//     bg-emerald-500/10 
//     border border-emerald-400/20
//     flex items-center justify-center
//     shadow-[0_0_25px_rgba(16,185,129,0.12)]">

//       <ExperimentOutlined className="text-2xl text-emerald-300" />
//     </div>

//     {/* Badge */}
//     <div className="px-3 py-1 rounded-full 
//     border border-emerald-400/20
//     bg-emerald-500/10">

//       <span className="text-[11px] text-emerald-300 font-medium">
//         Best Seller
//       </span>
//     </div>
//   </div>

//   {/* Middle Content */}
//   <div className="mt-3">

//     <h2 className="text-white text-2xl font-semibold tracking-tight ">
//       Classic Still
//     </h2>

//     <p className="text-slate-400 text-base mt-1">
//       RO + UV · 1 Litre
//     </p>

//     {/* Price */}
//     <div className="mt-4">

//       <h3 className="text-white text-3xl font-bold leading-none">
//         ₹8
//       </h3>

//       <p className="text-slate-500 text-sm mt-1">
//         per litre
//       </p>
//     </div>
//   </div>

//   {/* Add Button */}
//   <button className="absolute bottom-5 right-5
//   w-12 h-12 rounded-2xl
//   border border-emerald-400/20
//   bg-emerald-500/10
//   text-emerald-300 text-3xl
//   flex items-center justify-center
//   shadow-[0_0_20px_rgba(16,185,129,0.15)]
//   hover:scale-105 transition-all">

//     +
//   </button>

// </div>

// </> 
//  )
// }


import { ExperimentOutlined, PlusOutlined } from "@ant-design/icons"
import { message } from "antd"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

// Accepts a product object from products.js
export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { user, setShowSignIn } = useAuth()

  function handleAdd() {
    // If not signed in → open sign in modal first
    if (!user) {
      setShowSignIn(true)
      return
    }
    addItem(product)
    message.success({ content: `${product.name} added to cart!`, duration: 1.5 })
  }

  return (
    <div className="relative w-full min-h-52 rounded-[28px]
      bg-gradient-to-br from-[#03122b] to-[#020617]
      border border-white/10
      p-5 overflow-hidden flex flex-col justify-between
      hover:border-emerald-400/40 transition-all duration-200">

      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between">

        {/* Bottle icon with product color */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
          {/* // style={{ */}
          {/* //   background: `linear-gradient(135deg, ${product.gradientFrom}22, ${product.gradientTo}11)`,
          //   border: `1px solid ${product.gradientFrom}33` */}
          {/* // }}> */}
          <ExperimentOutlined className="text-2xl" style={{ color:'red' }} />
        </div>

        {/* Tag badge — only shown if product has a tag */}
        {product.tag && (
          <div className="px-2.5 py-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 whitespace-nowrap">
            <span className="text-[11px] text-emerald-300 font-medium">{product.tag}</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="mt-3">
        <h2 className="text-white text-xl font-semibold tracking-tight">{product.name}</h2>
        <p className="text-slate-400 text-sm mt-1">{product.type} · {product.size}</p>

        {/* Price */}
        <div className="mt-3">
          <h3 className="text-white text-2xl font-bold">₹{product.price}</h3>
          <p className="text-slate-500 text-xs mt-0.5">per unit</p>
        </div>
      </div>

      {/* Add to Cart button — bottom right */}
      <button
        onClick={handleAdd}
        className="absolute bottom-5 right-5
          w-11 h-11 rounded-2xl
          border border-emerald-400/30
          bg-emerald-500/10
          text-emerald-300 text-2xl
          flex items-center justify-center
          hover:bg-emerald-500/20 hover:scale-105 transition-all">
        <PlusOutlined />
      </button>
    </div>
  )
}