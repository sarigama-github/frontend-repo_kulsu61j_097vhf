import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || ''
        const res = await fetch(`${base}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        // Fallback demo items if DB empty
        if (!data || data.length === 0) {
          setProducts([
            { id: '1', title: 'Prism Hoodie', price: 79, category: 'Outerwear', image_url: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1600&auto=format&fit=crop', colors: ['#ec4899', '#22d3ee', '#a78bfa'], badge: 'New' },
            { id: '2', title: 'Neon Joggers', price: 69, category: 'Bottoms', image_url: 'https://images.unsplash.com/photo-1520975922284-7b10d3f4f643?q=80&w=1600&auto=format&fit=crop', colors: ['#22d3ee', '#06b6d4'] },
            { id: '3', title: 'Gradient Tee', price: 39, category: 'Tops', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop', colors: ['#f472b6', '#60a5fa', '#34d399'], badge: 'Hot' },
            { id: '4', title: 'Aurora Jacket', price: 129, category: 'Outerwear', image_url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1600&auto=format&fit=crop', colors: ['#a78bfa', '#22d3ee'] }
          ])
        } else {
          setProducts(data)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="text-slate-300">Loading products…</div>
  if (error) return <div className="text-rose-300">{error}</div>

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-xl">Featured</h2>
          <a href="#" className="text-cyan-300 text-sm">See all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
