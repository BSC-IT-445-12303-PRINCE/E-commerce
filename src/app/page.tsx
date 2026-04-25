import Link from 'next/link';
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones, RotateCcw, Sparkles, Zap, TrendingUp, Star } from 'lucide-react';
import ProductCard from './components/ProductCard';
import { db } from './data/mockData';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on orders over $50',
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Bank-grade encryption & security',
    color: 'from-emerald-600 to-emerald-700',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock expert assistance',
    color: 'from-violet-600 to-violet-700',
    bgColor: 'bg-violet-50',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 30-day return policy',
    color: 'from-amber-600 to-amber-700',
    bgColor: 'bg-amber-50',
  },
];

const stats = [
  { value: '10K+', label: 'Products' },
  { value: '50K+', label: 'Customers' },
  { value: '99%', label: 'Satisfaction' },
  { value: '24h', label: 'Delivery' },
];

export default function Home() {
  const featuredProducts = db.getProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium">Premium Collection 2024</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover Quality{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Products
                </span>
                <br />
                At Best Prices
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0">
                Experience seamless shopping with our curated collection of premium products. Quality meets affordability.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <Link
                  href="/products"
                  className="group inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Explore Collection</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>View Bestsellers</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Graphic */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl transform -rotate-3" />
                <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                    alt="Featured Collection"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 px-4 py-3 rounded-xl shadow-xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 bg-slate-200 rounded-full border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">2k+ Happy Customers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why Choose Us</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Experience the difference with our commitment to quality and customer satisfaction</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group relative p-8 ${feature.bgColor} rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Curated Selection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Featured Products</h2>
              <p className="text-slate-500 mt-2">Handpicked premium items for you</p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center space-x-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-slate-400" />
              <span className="text-xl font-bold text-slate-600">Trusted by 50,000+ Customers</span>
            </div>
            <div className="h-8 w-px bg-slate-300 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-slate-400" />
              <span className="text-xl font-bold text-slate-600">Secure Checkout</span>
            </div>
            <div className="h-8 w-px bg-slate-300 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-slate-400" />
              <span className="text-xl font-bold text-slate-600">Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Elevate Your Shopping?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their everyday needs. Premium quality, unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Start Shopping</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center space-x-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ShopHub</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Your trusted destination for premium products. Quality, affordability, and exceptional service in every purchase.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
                <li><Link href="/orders" className="hover:text-white transition-colors">Orders</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 ShopHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-slate-500 text-sm hover:text-white transition-colors cursor-pointer">Twitter</span>
              <span className="text-slate-500 text-sm hover:text-white transition-colors cursor-pointer">Instagram</span>
              <span className="text-slate-500 text-sm hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
