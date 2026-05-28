// src/components/OrderSummaryDrawer.jsx
// Flipkart-style right-side drawer that shows full checkout summary:
// Cart items → Address → Payment method → User → Total
import { Drawer} from "antd"
import {
  ShoppingCartOutlined, EnvironmentOutlined,
  WalletOutlined, UserOutlined,
  CheckCircleFilled, CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useCheckout } from "../context/CheckoutContext"

const DEPOSIT  = 15
const GST_RATE = 0.05

export default function OrderSummaryDrawer({ open, onClose }) {
  const { items, subtotal, totalItems } = useCart()
  const { user } = useAuth()
  const { selectedAddress, paymentMethod, upiId } = useCheckout()

  const gst   = Math.round(subtotal * GST_RATE)
  const deposit = items.length > 0 ? DEPOSIT : 0
  const total = subtotal + gst + deposit

  // Progress: how far through checkout the user is
  // 0=nothing in cart, 1=has items, 2=address set, 3=payment set
  const progress =
    totalItems === 0        ? 0 :
    !selectedAddress        ? 1 :
    !paymentMethod          ? 2 : 3

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={380}
      title={null}
      closable={false}
      styles={{
        wrapper: { boxShadow: "-8px 0 40px rgba(0,0,0,0.6)" },
        body:    { padding: 0, background: "#080f1e" },
        mask:    { backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.5)" },
      }}
    >
      {/* ── Drawer header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8"
        style={{ background: "linear-gradient(135deg, #0d1a2e, #0a1420)" }}>
        <div>
          <p className="text-white font-bold text-base">Order Summary</p>
          <p className="text-white/40 text-xs mt-0.5">
            {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? "s" : ""} in cart` : "Cart is empty"}
          </p>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center
            bg-white/8 hover:bg-white/15 transition-all text-white/50 hover:text-white">
          ✕
        </button>
      </div>

      <div className="overflow-y-auto h-full pb-32">

        {/* ── 1. CHECKOUT PROGRESS ── */}
        <div className="px-5 py-4 border-b border-white/6">
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider mb-3">Checkout Progress</p>
          <div className="flex items-center gap-0">
            {["Cart", "Address", "Payment"].map((step, i) => {
              const done   = progress > i
              const active = progress === i
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={done
                        ? { background: "#00d4aa", color: "#06101e" }
                        : active
                        ? { background: "rgba(0,212,170,0.15)", border: "2px solid #00d4aa", color: "#00d4aa" }
                        : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.3)" }
                      }>
                      {done ? "✓" : i + 1}
                    </div>
                    <span className="text-[10px] font-semibold"
                      style={{ color: done ? "#00d4aa" : active ? "#00d4aa" : "rgba(255,255,255,0.3)" }}>
                      {step}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="flex-1 h-px mx-1 mb-4"
                      style={{ background: progress > i ? "rgba(0,212,170,0.4)" : "rgba(255,255,255,0.08)" }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 2. CART ITEMS ── */}
        <Section
          icon={<ShoppingCartOutlined />}
          title="Cart Items"
          badge={totalItems > 0 ? totalItems : null}
          editPath="/cart"
          onClose={onClose}
        >
          {items.length === 0 ? (
            <EmptyState text="No items in cart yet" />
          ) : (
            <div className="space-y-2">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3">
                  {/* Colour dot */}
                  <div className="w-8 h-8 rounded-lg flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${product.gradientFrom}88, ${product.gradientTo}44)` }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                    <p className="text-white/35 text-[10px]">{product.size} × {qty}</p>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs flex-shrink-0">
                    ₹{product.price * qty}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* ── 3. DELIVERY ADDRESS ── */}
        <Section
          icon={<EnvironmentOutlined />}
          title="Delivery Address"
          editPath="/address"
          onClose={onClose}
          status={selectedAddress ? "done" : "pending"}
        >
          {selectedAddress ? (
            <div className="rounded-xl p-3"
              style={{ background: "rgba(0,212,170,0.07)", border: "1px solid rgba(0,212,170,0.18)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{ background: "rgba(0,212,170,0.15)", color: "#00d4aa" }}>
                  {selectedAddress.type}
                </span>
                <span className="text-white font-semibold text-xs">{selectedAddress.name}</span>
              </div>
              <p className="text-white/50 text-[11px] leading-relaxed">
                {selectedAddress.line1}<br />
                {selectedAddress.city} · {selectedAddress.pin}<br />
                {selectedAddress.phone}
              </p>
            </div>
          ) : (
            <EmptyState text="No address selected" action={{ label: "Select address →", path: "/address" }} onClose={onClose} />
          )}
        </Section>

        {/* ── 4. PAYMENT METHOD ── */}
        <Section
          icon={<WalletOutlined />}
          title="Payment Method"
          editPath="/payment"
          onClose={onClose}
          status={paymentMethod ? "done" : "pending"}
        >
          {paymentMethod ? (
            <div className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={paymentMethod === "cod"
                  ? { background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)" }
                  : { background: "rgba(79,142,247,0.15)", border: "1px solid rgba(79,142,247,0.25)" }
                }>
                {paymentMethod === "cod" ? "💵" : "📱"}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment"}
                </p>
                {paymentMethod === "upi" && upiId && (
                  <p className="text-white/40 text-[11px] mt-0.5">{upiId}</p>
                )}
              </div>
              <CheckCircleFilled className="ml-auto text-emerald-400" />
            </div>
          ) : (
            <EmptyState text="Payment not selected" action={{ label: "Choose payment →", path: "/payment" }} onClose={onClose} />
          )}
        </Section>

        {/* ── 5. USER DETAILS ── */}
        <Section
          icon={<UserOutlined />}
          title="Account"
          status={user ? "done" : "pending"}
        >
          {user ? (
            <div className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#00d4aa,#4f8ef7)" }}>
                {user.initials}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-white/40 text-[11px] mt-0.5">
                  {user.phone ? `+91 ${user.phone}` : user.email}
                </p>
              </div>
              <CheckCircleFilled className="ml-auto text-emerald-400" />
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl cursor-pointer"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <CloseCircleOutlined className="text-red-400" />
              <span className="text-white/50 text-xs">Not signed in</span>
            </div>
          )}
        </Section>

        {/* ── 6. PRICE BREAKDOWN ── */}
        {totalItems > 0 && (
          <div className="mx-4 mb-4 p-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider mb-3">Price Breakdown</p>
            {[
              { label: "Subtotal",                    value: `₹${subtotal}` },
              { label: "Delivery",                     value: "FREE",     green: true },
              { label: "Bottle deposit (refundable)",  value: `₹${deposit}` },
              { label: `GST (5%)`,                     value: `₹${gst}` },
            ].map(row => (
              <div key={row.label} className="flex justify-between py-1.5 border-b last:border-b-0 text-xs"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span className="text-white/40">{row.label}</span>
                <span className={row.green ? "text-emerald-400 font-bold" : "text-white/65 font-semibold"}>{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
              <span className="text-white font-bold text-sm">Total</span>
              <span className="text-white font-bold text-xl">₹{total}</span>
            </div>
          </div>
        )}

      </div>

      {/* ── Fixed bottom CTA ── */}
      {totalItems > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/8"
          style={{ background: "rgba(8,15,30,0.97)", backdropFilter: "blur(12px)" }}>
          <Link to={progress < 2 ? "/address" : progress < 3 ? "/payment" : "/payment"}
            onClick={onClose}>
            <button className="w-full py-4 rounded-2xl font-bold text-sm text-[#06101e] transition-all
              hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #00d4aa, #0891b2)" }}>
              {progress === 0 ? "Go to Cart" :
               progress === 1 ? "Select Address →" :
               progress === 2 ? "Choose Payment →" :
               "Place Order 🚀"}
            </button>
          </Link>
          {total > 0 && (
            <p className="text-center text-white/30 text-xs mt-2">
              Total ₹{total} · Free delivery · Arrives today
            </p>
          )}
        </div>
      )}
    </Drawer>
  )
}

// ── Reusable section block ─────────────────────────────────────
function Section({ icon, title, badge, editPath, onClose, status, children }) {
  return (
    <div className="px-4 py-4 border-b border-white/6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-white/50 text-sm">{icon}</span>
          <span className="text-white font-semibold text-sm">{title}</span>
          {badge && (
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#06101e]"
              style={{ background: "#00d4aa" }}>
              {badge}
            </span>
          )}
          {status === "done" && <CheckCircleFilled className="text-emerald-400 text-xs" />}
          {status === "pending" && <span className="text-[10px] text-orange-400 font-semibold">Pending</span>}
        </div>
        {editPath && onClose && (
          <Link to={editPath} onClick={onClose}
            className="flex items-center gap-1 text-[11px] font-semibold no-underline"
            style={{ color: "rgba(0,212,170,0.8)" }}>
            <EditOutlined /> Edit
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}

// ── Empty state inside a section ──────────────────────────────
function EmptyState({ text, action, onClose }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-white/30 text-xs">{text}</span>
      {action && onClose && (
        <Link to={action.path} onClick={onClose}
          className="text-xs font-semibold no-underline" style={{ color: "#00d4aa" }}>
          {action.label}
        </Link>
      )}
    </div>
  )
}