import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'

function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_-50px,rgba(255,255,255,0.08),transparent)]" />
        </div>

        <Navbar />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
