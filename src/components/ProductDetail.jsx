import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || ''
        const res = await fetch(`${base}/api/products/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setProduct(data)
        setSize(data.sizes?.[0] || '')
        setColor(data.colors?.[0] || '')
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const addToCart = () => {
    if (!size || !color) return
    addItem({
      product_id: product.id,
      title: product.title,
      price: product.price,
      quantity: qty,
      size,
      color,
      image_url: product.image_url,
    })
    navigate('/cart')
  }

  if (loading) return <div className="text-slate-300 p-6">Loading…</div>
  if (error || !product) return <div className="text-rose-300 p-6">Product not found</div>

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img src={product.image_url} alt={product.title} className="w-full h-[520px] object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          <p className="text-slate-300 mt-2">{product.description || product.category}</p>
          <div className="text-cyan-300 text-2xl font-semibold mt-4">${product.price.toFixed(2)}</div>

          <div className="mt-6">
            <label className="block text-sm text-slate-300 mb-1">Size</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map(s => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 rounded-xl border ${size===s ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-slate-300 mb-1">Color</label>
            <div className="flex gap-2">
              {product.colors?.map(c => (
                <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full border ${color===c ? 'ring-2 ring-white' : ''}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm text-slate-300">Qty</label>
            <input type="number" min="1" value={qty} onChange={(e)=>setQty(parseInt(e.target.value||'1'))} className="w-20 bg-white/10 rounded-xl px-3 py-2" />
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={addToCart} className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-medium">Add to cart</button>
            <button onClick={()=>navigate(-1)} className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/10">Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}
