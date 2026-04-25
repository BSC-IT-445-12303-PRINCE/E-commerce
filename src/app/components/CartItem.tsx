'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-blue-600 font-medium">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>
        
        <span className="w-8 text-center font-medium">{quantity}</span>
        
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          disabled={quantity >= product.stock}
          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <div className="text-right min-w-[80px]">
        <p className="text-lg font-bold text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
      
      <button
        onClick={() => removeFromCart(product.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
