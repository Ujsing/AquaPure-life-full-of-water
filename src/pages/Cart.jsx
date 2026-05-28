import { useNavigate } from "react-router-dom"
import { Button, Empty } from "antd"
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { useCart } from "../context/CartContext"

// Constants for order calculation
const BOTTLE_DEPOSIT = 15    // refundable per order
const GST            = 0.05  // 5%

export default function Cart() {
  const { items, updateQty, removeItem, clearCart, subtotal, totalItems } = useCart()
  const navigate = useNavigate()

  const deposit   = items.length > 0 ? BOTTLE_DEPOSIT : 0
  const gst       = Math.round(subtotal * GST)
  const total     = subtotal + deposit + gst
  // How much saved vs plastic (plastic avg ₹20/L, we charge ₹8–15)
  const saved     = items.reduce((s, i) => s + (20 - i.product.price) * i.qty, 0)

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-4">
        <Empty description={<span className="text-white/40">Your cart is empty</span>} />
        <Button type="primary" onClick={() => navigate("/")} className="!rounded-xl !font-bold">
          Browse Products
        </Button>
      </div>
    )
  }

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-xl">My Cart</h2>
          <p className="text-white/40 text-xs mt-0.5">
            {totalItems} item{totalItems > 1 ? "s" : ""} · Free delivery today
          </p>
        </div>
        <button onClick={clearCart}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          style={{ color: "rgba(255,100,100,0.8)", background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.15)" }}>
          Clear all
        </button>
      </div>

      {/* ── Cart Items ── */}
      <div className="rounded-2xl p-4 space-y-3"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>

        {items.map(({ product, qty }) => (
          <div key={product.id}
            className="flex items-center gap-3 pb-3 border-b last:border-b-0 last:pb-0"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}>

            {/* Bottle color thumb */}
            <div className="w-12 h-14 rounded-xl flex-shrink-0"
              style={{ background: `linear-gradient(180deg, ${product.gradientFrom}99, ${product.gradientTo}55)` }} />

            {/* Name + type */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{product.name}</p>
              <p className="text-white/35 text-[11px] mt-0.5">{product.type} · {product.size}</p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => updateQty(product.id, qty - 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center
                  bg-white/8 border border-white/10 hover:bg-white/15 transition-all">
                <MinusOutlined className="text-white/60 text-xs" />
              </button>
              <span className="text-white font-bold text-sm w-5 text-center">{qty}</span>
              <button onClick={() => updateQty(product.id, qty + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center
                  bg-white/8 border border-white/10 hover:bg-emerald-500/20 transition-all">
                <PlusOutlined className="text-emerald-400 text-xs" />
              </button>
            </div>

            {/* Line total */}
            <span className="text-emerald-400 font-bold text-sm w-12 text-right flex-shrink-0">
              ₹{product.price * qty}
            </span>

            {/* Delete button */}
            <button onClick={() => removeItem(product.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                hover:bg-red-500/20 transition-all"
              style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.15)" }}>
              <DeleteOutlined className="text-red-400 text-xs" />
            </button>
          </div>
        ))}
      </div>

      {/* ── Savings callout ── */}
      {saved > 0 && (
        <div className="flex justify-between items-center px-4 py-3 rounded-xl"
          style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)" }}>
          <span className="text-xs text-emerald-400/80">You're saving vs cheap plastic bottles</span>
          <span className="text-sm font-bold text-emerald-400">₹{saved} saved 🎉</span>
        </div>
      )}

      {/* ── Order summary ── */}
      <div className="rounded-2xl p-4 space-y-0"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {[
          { label: "Subtotal",                    value: `₹${subtotal}` },
          { label: "Delivery",                     value: "Free", green: true },
          { label: "Bottle deposit (refundable)",  value: `₹${deposit}` },
          { label: "GST 5%",                       value: `₹${gst}` },
        ].map(row => (
          <div key={row.label}
            className="flex justify-between py-2.5 border-b last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <span className="text-white/40 text-xs">{row.label}</span>
            <span className={`text-xs font-semibold ${row.green ? "text-emerald-400" : "text-white/70"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Total row ── */}
      <div className="flex justify-between items-center px-4 py-4 rounded-xl"
        style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.18)" }}>
        <span className="text-white/60 font-semibold text-sm">Total</span>
        <span className="text-white font-bold text-2xl">₹{total}</span>
      </div>

      {/* ── CTA ── */}
      <Button type="primary" block size="large"
        onClick={() => navigate("/address")}
        className="!rounded-2xl !font-bold !h-14 !text-base">
        Select Delivery Address →
      </Button>

    </div>
  )
}