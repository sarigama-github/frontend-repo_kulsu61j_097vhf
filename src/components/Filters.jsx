import { useEffect, useState } from 'react'

const categories = ['Tops', 'Bottoms', 'Outerwear']
const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = ['black', 'white', '#f472b6', '#22d3ee', '#a78bfa']

export default function Filters({ onChange }) {
  const [state, setState] = useState({ category: '', size: '', color: '', q: '' })

  useEffect(() => {
    const t = setTimeout(() => onChange(state), 250)
    return () => clearTimeout(t)
  }, [state, onChange])

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select className="bg-white/10 rounded-xl px-3 py-2" value={state.category} onChange={(e) => setState(s => ({...s, category: e.target.value}))}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="bg-white/10 rounded-xl px-3 py-2" value={state.size} onChange={(e) => setState(s => ({...s, size: e.target.value}))}>
          <option value="">Any Size</option>
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="bg-white/10 rounded-xl px-3 py-2" value={state.color} onChange={(e) => setState(s => ({...s, color: e.target.value}))}>
          <option value="">Any Color</option>
          {colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="bg-white/10 rounded-xl px-3 py-2" placeholder="Search" value={state.q} onChange={(e) => setState(s => ({...s, q: e.target.value}))} />
      </div>
    </div>
  )
}
