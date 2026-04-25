'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, Check, AlertCircle, Wallet, Banknote, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db } from '../data/mockData';
import { Order } from '../types';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  if (cart.items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = cart.total >= 50 ? 0 : 5;
  const tax = cart.total * 0.08;
  const codFee = paymentMethod === 'cod' ? 30 : 0;
  const total = cart.total + shipping + tax + codFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate order processing
    setTimeout(() => {
      const paymentInfo = {
        method: paymentMethod,
        details: paymentMethod === 'upi' ? formData.upiId : 
                 paymentMethod === 'card' ? 'Card ending in ' + formData.cardNumber.slice(-4) : 
                 'Cash on Delivery'
      };

      const newOrder: Order = {
        id: `ORD-${String(db.getOrders().length + 1).padStart(3, '0')}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        items: cart.items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      db.addOrder(newOrder);
      setOrderId(newOrder.id);
      setShowSuccess(true);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-lg font-semibold text-gray-900 mb-6">Order ID: {orderId}</p>
          <Link
            href="/orders"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cart</span>
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Shipping Address</span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Payment Method</span>
                </h2>

                {/* Payment Options */}
                <div className="space-y-3 mb-6">
                  {/* Card Payment */}
                  <label className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, RuPay</p>
                    </div>
                  </label>

                  {/* UPI Payment */}
                  <label className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">UPI</p>
                      <p className="text-sm text-gray-500">Pay with Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Banknote className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when your order arrives</p>
                    </div>
                  </label>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-semibold text-gray-900">Card Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        required={paymentMethod === 'card'}
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required={paymentMethod === 'card'}
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        required={paymentMethod === 'card'}
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-semibold text-gray-900">UPI ID</h3>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      required={paymentMethod === 'upi'}
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500">Enter your UPI ID (e.g., name@okaxis, name@ybl)</p>
                  </div>
                )}

                {/* Cash on Delivery Info */}
                {paymentMethod === 'cod' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 animate-fade-in">
                    <p className="text-amber-800 text-sm">
                      <strong>Note:</strong> Please keep exact change ready. Cash on Delivery orders may have an additional convenience fee of ₹30.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Place Order - ${total.toFixed(2)}</span>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Cash on Delivery Fee</span>
                    <span>₹{codFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 pb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {paymentMethod === 'card' && 'Credit/Debit Card'}
                    {paymentMethod === 'upi' && `UPI (${formData.upiId || 'yourname@upi'})`}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </p>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
