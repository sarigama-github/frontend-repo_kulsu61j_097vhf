import { useMemo, useState } from 'react'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart()
  const [email, setEmail] = useState('')
  const shipping = useMemo(() => (subtotal > 0 ? 6.99 : 0), [subtotal])
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping])
  const base = import.meta.env.VITE_BACKEND_URL || ''

  const checkout = async () => {
    if (!email) return alert('Enter your email')
    const payload = {
      email,
      items: items.map(i => ({ ...i })),
      subtotal,
      shipping,
      total,
    }
    const res = await fetch(`${base}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = await res.json()
      alert(`Order placed! ID: ${data.id}`)
      clear()
    } else {
      alert('Checkout failed')
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-slate-300 mt-2">Add some items to get started.</p>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-white text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((i, idx) => (
            <div key={idx} className="flex gap-4 items-center bg-white/5 border border-white/10 rounded-2xl p-4">
              <img src={i.image_url} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">{i.title}</h3>
                    <p className="text-slate-300 text-sm">{i.size} • <span className="inline-flex items-center gap-2">Color <span className="w-3 h-3 rounded-full border inline-block" style={{background:i.color}}></span></span></p>
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-slate-400 hover:text-white">Remove</button>
                </div>
                <div className="flex justify-between mt-3">
                  <div className="text-cyan-300 font-medium">${(i.price * i.quantity).toFixed(2)}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(idx, Math.max(1, i.quantity - 1))} className="px-2 py-1 bg-white/10 rounded">-</button>
                    <input className="w-14 bg-white/10 rounded px-2 py-1 text-center" type="number" min="1" value={i.quantity} onChange={(e)=>updateQty(idx, parseInt(e.target.value||'1'))} />
                    <button onClick={() => updateQty(idx, i.quantity + 1)} className="px-2 py-1 bg-white/10 rounded">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-fit">
          <h3 className="text-white font-semibold mb-3">Summary</h3>
          <div className="flex justify-between text-slate-300 mb-1"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-slate-300 mb-3"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between text-white font-semibold text-lg mb-4"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <input type="email" placeholder="Email for receipt" className="w-full bg-white/10 rounded-xl px-3 py-2 mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button onClick={checkout} className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-medium">Checkout</button>
        </div>
      </div>
    </div>
  )
}
