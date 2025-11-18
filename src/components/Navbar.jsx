import { Menu, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400" />
          <span className="text-white font-semibold tracking-tight">VibeWear</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#" className="hover:text-white transition-colors">New</a>
          <a href="#" className="hover:text-white transition-colors">Men</a>
          <a href="#" className="hover:text-white transition-colors">Women</a>
          <a href="#" className="hover:text-white transition-colors">Sale</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="relative text-slate-200 hover:text-white">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-fuchsia-500 text-white text-[10px] w-4 h-4 rounded-full grid place-items-center">2</span>
          </button>
          <button className="md:hidden text-slate-200 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
