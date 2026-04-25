'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;
    
    setIsAdding(true);
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`, 'success');
    
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 overflow-hidden border border-slate-100">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="relative aspect-[4/3] w-full bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/95 backdrop-blur text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
              {product.category}
            </span>
            {product.stock < 10 && product.stock > 0 && (
              <span className="bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                Only {product.stock} left
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick View Button - appears on hover */}
          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`absolute bottom-4 right-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out ${
                isAdding 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white text-slate-900 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {isAdding ? <Check className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </button>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6">
        {/* Rating & Stock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="ml-1.5 text-sm font-semibold text-amber-700">{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400">({Math.floor(Math.random() * 500) + 50} reviews)</span>
          </div>
          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
            {product.stock > 0 ? 'In Stock' : 'Unavailable'}
          </span>
        </div>
        
        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Price</span>
            <p className="text-2xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              product.stock === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAdding
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
