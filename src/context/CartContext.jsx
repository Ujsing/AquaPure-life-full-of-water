// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])   // [{ product, qty }]

  // ── CREATE ──
  function addItem(product) {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id)
      if (exists) {
        // Already in cart → just increase qty
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { product, qty: 1 }]
    })
  }

  // ── UPDATE qty ──
  function updateQty(productId, qty) {
    if (qty < 1) return removeItem(productId)
    setItems(prev =>
      prev.map(i => i.product.id === productId ? { ...i, qty } : i)
    )
  }

  // ── DELETE ──
  function removeItem(productId) {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }

  // ── CLEAR all ──
  function clearCart() { setItems([]) }

  // ── Derived values ──
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal   = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook
export function useCart() {
  return useContext(CartContext)
}