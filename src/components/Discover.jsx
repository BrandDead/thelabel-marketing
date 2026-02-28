/**
 * Discover Component
 * 
 * Marketplace discovery page showing:
 * - Explore Stores: Browse all creator stores
 * - Trending Products: Popular POD items
 * - Search & Filter: Find specific products
 * - Store Links: Navigate to individual stores
 */

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, TrendingUp, Store, ChevronRight, Loader } from 'lucide-react';
import { ScrollReveal } from './Animations';

export default function Discover() {
  const [stores, setStores] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch stores and products on mount
  useEffect(() => {
    fetchDiscoveryData();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = trendingProducts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.creatorName.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, trendingProducts]);

  const fetchDiscoveryData = async () => {
    try {
      setLoading(true);

      // TODO: Replace with actual API calls to tl-store
      // const storesResponse = await fetch('/api/storefront/stores');
      // const productsResponse = await fetch('/api/storefront/trending');

      // Mock data for MVP
      const mockStores = [
        {
          id: 1,
          name: 'Luna Beats',
          creatorName: 'Luna Chen',
          category: 'musician',
          productCount: 12,
          imageUrl: 'https://via.placeholder.com/400x300?text=Luna+Beats',
          storeUrl: 'https://store.thelabelai.com/luna-beats'
        },
        {
          id: 2,
          name: 'Neon Vibes',
          creatorName: 'Alex Rivera',
          category: 'musician',
          productCount: 8,
          imageUrl: 'https://via.placeholder.com/400x300?text=Neon+Vibes',
          storeUrl: 'https://store.thelabelai.com/neon-vibes'
        },
        {
          id: 3,
          name: 'Cosmic Threads',
          creatorName: 'Jordan Smith',
          category: 'brand',
          productCount: 15,
          imageUrl: 'https://via.placeholder.com/400x300?text=Cosmic+Threads',
          storeUrl: 'https://store.thelabelai.com/cosmic-threads'
        },
        {
          id: 4,
          name: 'Sonic Dreams',
          creatorName: 'Maya Patel',
          category: 'musician',
          productCount: 10,
          imageUrl: 'https://via.placeholder.com/400x300?text=Sonic+Dreams',
          storeUrl: 'https://store.thelabelai.com/sonic-dreams'
        },
      ];

      const mockProducts = [
        {
          id: 1,
          name: 'Luna Beats Premium Hoodie',
          creatorName: 'Luna Chen',
          category: 'tops',
          price: 4999,
          imageUrl: 'https://via.placeholder.com/300x300?text=Luna+Hoodie',
          sales: 234,
          storeUrl: 'https://store.thelabelai.com/luna-beats/product/1'
        },
        {
          id: 2,
          name: 'Neon Vibes T-Shirt',
          creatorName: 'Alex Rivera',
          category: 'tops',
          price: 2499,
          imageUrl: 'https://via.placeholder.com/300x300?text=Neon+Tee',
          sales: 512,
          storeUrl: 'https://store.thelabelai.com/neon-vibes/product/2'
        },
        {
          id: 3,
          name: 'Cosmic Threads Cap',
          creatorName: 'Jordan Smith',
          category: 'accessories',
          price: 1999,
          imageUrl: 'https://via.placeholder.com/300x300?text=Cosmic+Cap',
          sales: 189,
          storeUrl: 'https://store.thelabelai.com/cosmic-threads/product/3'
        },
        {
          id: 4,
          name: 'Sonic Dreams Joggers',
          creatorName: 'Maya Patel',
          category: 'bottoms',
          price: 3499,
          imageUrl: 'https://via.placeholder.com/300x300?text=Sonic+Joggers',
          sales: 156,
          storeUrl: 'https://store.thelabelai.com/sonic-dreams/product/4'
        },
        {
          id: 5,
          name: 'Luna Beats Canvas Tote',
          creatorName: 'Luna Chen',
          category: 'accessories',
          price: 1499,
          imageUrl: 'https://via.placeholder.com/300x300?text=Luna+Tote',
          sales: 298,
          storeUrl: 'https://store.thelabelai.com/luna-beats/product/5'
        },
        {
          id: 6,
          name: 'Neon Vibes Snapback',
          creatorName: 'Alex Rivera',
          category: 'accessories',
          price: 1799,
          imageUrl: 'https://via.placeholder.com/300x300?text=Neon+Cap',
          sales: 423,
          storeUrl: 'https://store.thelabelai.com/neon-vibes/product/6'
        },
      ];

      setStores(mockStores);
      setTrendingProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Failed to fetch discovery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glassmorphism border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors">
              theLABEL Discover
            </a>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal animation="fade-up">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 neon-glow">
              Discover Creator Stores
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-xl text-gray-300 mb-8">
              Explore print-on-demand products from independent artists and creators. 
              Support the artists you love while rocking exclusive merch.
            </p>
          </ScrollReveal>

          {/* Search Bar */}
          <ScrollReveal animation="fade-up" delay={400}>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal animation="fade-up" delay={600}>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Explore Stores Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-12">
              <Store className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl font-black text-white neon-glow">
                Featured Stores
              </h2>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stores.map((store, idx) => (
                <ScrollReveal key={store.id} animation="fade-up" delay={idx * 100}>
                  <a
                    href={store.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glassmorphism rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={store.imageUrl}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">
                        {store.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{store.creatorName}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{store.productCount} products</span>
                        <ChevronRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-12">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h2 className="text-4xl font-black text-white neon-glow">
                Trending Products
              </h2>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No products found matching your search</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} animation="fade-up" delay={idx * 100}>
                  <a
                    href={product.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glassmorphism rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.sales} sold
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">{product.creatorName}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-400">
                          ${(product.price / 100).toFixed(2)}
                        </span>
                        <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-4xl font-black text-white mb-6 neon-glow">
              Ready to Launch Your Store?
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators selling POD merch with theLABEL. 
              Design, publish, and earn from day one.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.thelabelai.com/login"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-12 py-4 rounded-lg transition-colors font-bold"
              >
                GET STARTED FREE
              </a>
              <a
                href="/"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-lg px-12 py-4 rounded-lg transition-colors font-bold"
              >
                Learn More
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">theLABEL</div>
              <p className="text-gray-400">
                Empowering independent artists with AI-powered tools and industry connections.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Discover</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Stores</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} theLABEL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
