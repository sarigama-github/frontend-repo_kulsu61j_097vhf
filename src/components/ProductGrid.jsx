import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Filters from './Filters'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || ''
      const params = new URLSearchParams()
      if (filters.category) params.set('category', filters.category)
      if (filters.size) params.set('size', filters.size)
      if (filters.color) params.set('color', filters.color)
      if (filters.q) params.set('q', filters.q)
      const qs = params.toString() ? `?${params.toString()}` : ''
      const res = await fetch(`${base}/api/products${qs}`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      if (!data || data.length === 0) {
        setProducts([
          { id: '1', title: 'Prism Hoodie', price: 79, category: 'Outerwear', image_url: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1600&auto=format&fit=crop', colors: ['#ec4899', '#22d3ee', '#a78bfa'], sizes: ['S','M','L','XL'], badge: 'New' },
          { id: '2', title: 'Neon Joggers', price: 69, category: 'Bottoms', image_url: 'https://images.unsplash.com/photo-1520975922284-7b10d3f4f643?q=80&w=1600&auto=format&fit=crop', colors: ['#22d3ee', '#06b6d4'], sizes: ['S','M','L','XL'] },
          { id: '3', title: 'Gradient Tee', price: 39, category: 'Tops', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop', colors: ['#f472b6', '#60a5fa', '#34d399'], sizes: ['S','M','L','XL'], badge: 'Hot' },
          { id: '4', title: 'Aurora Jacket', price: 129, category: 'Outerwear', image_url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1600&auto=format&fit=crop', colors: ['#a78bfa', '#22d3ee'], sizes: ['S','M','L','XL'] }
        ])
      } else {
        setProducts(data)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) return <div className="text-slate-300">Loading products…</div>
  if (error) return <div className="text-rose-300">{error}</div>

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-xl">Featured</h2>
          <a href="#" className="text-cyan-300 text-sm">See all</a>
        </div>
        <Filters onChange={setFilters} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(p => (
            <Link to={`/product/${p.id}`} key={p.id}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
