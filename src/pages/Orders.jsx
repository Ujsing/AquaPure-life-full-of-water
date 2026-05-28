// src/pages/Orders.jsx
import { useState } from 'react'
import { Package, RefreshCcw, MapPin } from 'lucide-react'
import { message } from 'antd'
import { useCart } from '../context/CartContext'

// Mock orders data
const MOCK_ORDERS = [
  {
    id: '#APL-003',
    date: 'Today · Est. 6 PM',
    status: 'In Transit',
    items: ['Classic Still ×2', 'Mineral Boost ×1', 'Sparkling ×2'],
    total: 77,
    progress: 65,
  },
  {
    id: '#APL-002',
    date: '19 May 2025',
    status: 'Delivered',
    items: ['Classic Still ×4', 'Family Pack ×1'],
    total: 62,
    progress: 100,
  },
  {
    id: '#APL-001',
    date: '12 May 2025',
    status: 'Delivered',
    items: ['Mineral Boost ×3', 'Sparkling ×2'],
    total: 66,
    progress: 100,
  },
]

const STATUS_STYLE = {
  'In Transit': { bg: 'rgba(251,191,36,.15)', color: '#fbbf24' },
  'Delivered':  { bg: 'rgba(52,211,153,.15)', color: '#34d399' },
  'Placed':     { bg: 'rgba(79,142,247,.15)', color: '#4f8ef7' },
}

export default function Orders() {
  const [orders, setOrders] = useState(MOCK_ORDERS)

  function reorder(order) {
    message.success(`Reordering ${order.id} — added to cart!`)
  }

  return (
    <div className="page-enter py-4 space-y-4">

      {/* Header */}
      <div>
        <h2 className="font-sora text-xl font-bold text-white">My Orders</h2>
        <p className="text-xs text-white/40 mt-1">Track, reorder or return</p>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <Package size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No orders yet</p>
        </div>
      )}

      {orders.map(order => {
        const st = STATUS_STYLE[order.status] || STATUS_STYLE['Placed']
        return (
          <div key={order.id} className="glass rounded-2xl p-4 space-y-3">

            {/* Top row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/50">{order.id}</p>
                <p className="text-xs text-white/35 mt-0.5">{order.date}</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                    style={{ background: st.bg, color: st.color }}>
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="flex gap-2 flex-wrap">
              {order.items.map(item => (
                <span key={item} className="glass px-2.5 py-1 rounded-lg text-xs font-semibold text-white/60">
                  {item}
                </span>
              ))}
            </div>

            {/* Progress bar (for In Transit) */}
            {order.status === 'In Transit' && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-white/35">
                  <span>Order picked up</span><span>On the way</span><span>Delivered</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden"
                     style={{ background: 'rgba(255,255,255,.06)' }}>
                  <div className="h-full rounded-full transition-all"
                       style={{ width: `${order.progress}%`, background: 'linear-gradient(90deg, #00d4aa, #4f8ef7)' }} />
                </div>
              </div>
            )}

            {/* Bottom row */}
            <div className="flex justify-between items-center pt-1 border-t"
                 style={{ borderColor: 'rgba(255,255,255,.06)' }}>
              <span className="font-sora text-base font-extrabold text-white">₹{order.total}</span>
              <button
                onClick={() => reorder(order)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(0,212,170,.1)', border: '1px solid rgba(0,212,170,.25)', color: '#00d4aa' }}
              >
                {order.status === 'In Transit'
                  ? <><MapPin size={12} /> Track Live</>
                  : <><RefreshCcw size={12} /> Reorder</>
                }
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}