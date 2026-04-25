'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg bg-gray-200 text-gray-400 cursor-not-allowed"
      >
        <span>Out of Stock</span>
      </button>
    );
  }

  return (
    <>
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg transition ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
          </>
        )}
      </button>
    </>
  );
}
