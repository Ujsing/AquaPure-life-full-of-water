// src/pages/Payment.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, message } from 'antd'
import { Banknote, Smartphone, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

const UPI_APPS = ['GPay', 'PhonePe', 'Paytm', 'BHIM']

// Progress steps shown at top
const STEPS = ['Cart', 'Address', 'Payment', 'Done']

export default function Payment() {
  const navigate = useNavigate()
  const { subtotal, totalItems, clearCart } = useCart()
  const [method, setMethod] = useState('cod')  // 'cod' | 'upi'
  const [upiId, setUpiId]   = useState('')
  const [placing, setPlacing] = useState(false)

  const total = subtotal + 15 + Math.round(subtotal * 0.05)

  function placeOrder() {
    if (method === 'upi' && !upiId) return message.warning('Enter your UPI ID or select an app')
    setPlacing(true)
    setTimeout(() => {
      clearCart()
      message.success('Order placed! Arriving today 🚀')
      navigate('/orders')
    }, 1200)
  }

  return (
    <div className="page-enter py-4 space-y-5">

      {/* ── Step progress ── */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                   style={i < 2
                     ? { background: '#00d4aa', color: '#06101e' }
                     : i === 2
                     ? { background: 'rgba(0,212,170,.2)', border: '2px solid #00d4aa', color: '#00d4aa' }
                     : { background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.3)' }
                   }>
                {i < 2 ? <Check size={12} strokeWidth={3} /> : i + 1}
              </div>
              <span className="text-[9px] mt-1 font-semibold"
                    style={{ color: i === 2 ? '#00d4aa' : 'rgba(255,255,255,.3)' }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mb-4"
                   style={{ background: i < 2 ? 'rgba(0,212,170,.3)' : 'rgba(255,255,255,.08)' }} />
            )}
          </div>
        ))}
      </div>

      {/* ── Order summary ── */}
      <div className="glass rounded-2xl p-4 space-y-2">
        <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Order Summary</p>
        {[
          { label: `${totalItems} items`, value: `₹${subtotal}` },
          { label: 'Delivery',           value: 'Free', green: true },
          { label: 'Bottle deposit',     value: '₹15' },
          { label: 'GST 5%',             value: `₹${Math.round(subtotal * 0.05)}` },
        ].map(r => (
          <div key={r.label} className="flex justify-between text-xs py-1">
            <span className="text-white/40">{r.label}</span>
            <span className={`font-semibold ${r.green ? 'text-emerald-400' : 'text-white/70'}`}>{r.value}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-3 border-t"
             style={{ borderColor: 'rgba(255,255,255,.08)' }}>
          <span className="text-sm font-bold text-white/60">Total</span>
          <span className="font-sora text-xl font-extrabold text-white">₹{total}</span>
        </div>
      </div>

      {/* ── Payment methods ── */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Payment Method</p>

        {/* COD */}
        <div onClick={() => setMethod('cod')}
             className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer mb-3 transition-all"
             style={method === 'cod'
               ? { background: 'rgba(0,212,170,.08)', border: '1px solid rgba(0,212,170,.28)' }
               : { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }
             }>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
               style={{ background: 'rgba(249,115,22,.15)', border: '1px solid rgba(249,115,22,.25)' }}>
            <Banknote size={24} color="#f97316" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Cash on Delivery</p>
            <p className="text-xs text-white/40 mt-0.5">Pay when your order arrives. No extra charges.</p>
          </div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
               style={method === 'cod'
                 ? { background: 'rgba(0,212,170,.15)', border: '2px solid #00d4aa' }
                 : { border: '2px solid rgba(255,255,255,.2)' }
               }>
            {method === 'cod' && <div className="w-2 h-2 rounded-full bg-acc" />}
          </div>
        </div>

        {/* UPI */}
        <div onClick={() => setMethod('upi')}
             className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all"
             style={method === 'upi'
               ? { background: 'rgba(0,212,170,.08)', border: '1px solid rgba(0,212,170,.28)' }
               : { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }
             }>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
               style={{ background: 'rgba(79,142,247,.15)', border: '1px solid rgba(79,142,247,.25)' }}>
            <Smartphone size={24} color="#4f8ef7" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">UPI Payment</p>
            <p className="text-xs text-white/40 mt-0.5">GPay, PhonePe, Paytm, BHIM. Instant & secure.</p>
          </div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
               style={method === 'upi'
                 ? { background: 'rgba(0,212,170,.15)', border: '2px solid #00d4aa' }
                 : { border: '2px solid rgba(255,255,255,.2)' }
               }>
            {method === 'upi' && <div className="w-2 h-2 rounded-full bg-acc" />}
          </div>
        </div>

        {/* UPI input — shown only when UPI selected */}
        {method === 'upi' && (
          <div className="mt-3 p-4 rounded-xl space-y-3"
               style={{ background: 'rgba(79,142,247,.06)', border: '1px solid rgba(79,142,247,.15)' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-acc2/80">Enter UPI ID</p>
            <div className="flex gap-2">
              <Input placeholder="yourname@upi" value={upiId}
                     onChange={e => setUpiId(e.target.value)} className="h-10 flex-1" />
              <button className="px-3 rounded-lg text-xs font-bold"
                      style={{ background: 'rgba(79,142,247,.2)', border: '1px solid rgba(79,142,247,.3)', color: '#4f8ef7' }}>
                Verify
              </button>
            </div>
            {/* Quick UPI app shortcuts */}
            <div className="flex gap-2 flex-wrap">
              {UPI_APPS.map(app => (
                <button key={app}
                        onClick={() => setUpiId(`me@${app.toLowerCase()}`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold glass"
                        style={{ color: 'rgba(255,255,255,.55)' }}>
                  {app}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Place order CTA ── */}
      <div className="p-4 rounded-2xl space-y-4"
           style={{ background: 'rgba(0,212,170,.08)', border: '1px solid rgba(0,212,170,.2)' }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-white/50">Delivering to Gomti Nagar · Today</p>
            <p className="font-sora text-xl font-extrabold text-white mt-0.5">₹{total}</p>
          </div>
          <span className="px-3 py-1 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(52,211,153,.12)', border: '1px solid rgba(52,211,153,.2)', color: '#34d399' }}>
            Saving ₹{Math.round(subtotal * 1.5)}
          </span>
        </div>
        <Button type="primary" block size="large" loading={placing} onClick={placeOrder}
                className="rounded-2xl font-extrabold h-14 text-base">
          Place Order 🚀
        </Button>
      </div>
    </div>
  )
}