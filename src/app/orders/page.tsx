'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, ChevronDown, ChevronUp, Clock, Truck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { db } from '../data/mockData';
import { Order } from '../types';

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
  processing: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'Processing' },
  shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' },
};

function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                <StatusIcon className="h-4 w-4" />
                <span>{status.label}</span>
              </span>
            </div>
            <p className="text-gray-600">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            <p><strong>{order.customerName}</strong></p>
            <p className="truncate max-w-md">{order.customerAddress}</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700">
            {isExpanded ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer Email</span>
              <span className="text-gray-900">{order.customerEmail}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');
  const orders = db.getOrders();
  
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-4">You haven't placed any orders.</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No orders found with status &quot;{filter}&quot;
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
