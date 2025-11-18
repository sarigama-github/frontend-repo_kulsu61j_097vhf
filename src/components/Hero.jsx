import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_-20%,rgba(255,255,255,0.08),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            >
              Cool fits. Bold colors. Your vibe.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-lg text-slate-300 max-w-xl"
            >
              Streetwear and everyday essentials crafted for comfort and motion.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 flex items-center gap-3"
            >
              <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-medium shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/30 transition">Shop new drops</button>
              <button className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition border border-white/10">Explore</button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6}}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop" alt="Model" className="w-full h-[460px] object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
