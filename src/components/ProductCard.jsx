import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition relative"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold">{product.title}</h3>
          <span className="text-cyan-300 font-medium">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-slate-300/80 text-sm mt-1">{product.category}</p>
        <div className="flex gap-2 mt-3">
          {product.colors?.slice(0,4).map((c, i) => (
            <span key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
      {product.badge && (
        <span className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-full bg-fuchsia-500 text-white">{product.badge}</span>
      )}
    </motion.div>
  )
}
