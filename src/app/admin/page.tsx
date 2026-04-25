'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { db } from '../data/mockData';
import { Product, Order } from '../types';

function StatCard({ title, value, icon: Icon, color }: { 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState(db.getProducts());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      db.deleteProduct(id);
      setProducts(db.getProducts());
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    if (editingId && editForm) {
      db.updateProduct(editingId, editForm);
      setProducts(db.getProducts());
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover mr-3" />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editForm.stock || ''}
                      onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <span className={`${product.stock < 10 ? 'text-red-600 font-medium' : ''}`}>
                      {product.stock}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <div className="flex space-x-2">
                      <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                        Save
                      </button>
                      <button onClick={handleCancel} className="text-gray-600 hover:text-gray-700">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState(db.getOrders());

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    db.updateOrderStatus(orderId, newStatus);
    setOrders(db.getOrders());
  };

  const statusOptions: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Orders</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm">{order.customerEmail}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {order.items.length} item(s)
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersTab() {
  const users = db.getUsers();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">User Management</h2>
        <span className="text-sm text-gray-500">{users.length} registered users</span>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-medium">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');
  
  const products = db.getProducts();
  const orders = db.getOrders();
  
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  
  const lowStockProducts = products.filter(p => p.stock < 10);
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Products"
                    value={products.length.toString()}
                    icon={Package}
                    color="bg-blue-500"
                  />
                  <StatCard
                    title="Total Orders"
                    value={orders.length.toString()}
                    icon={ShoppingBag}
                    color="bg-green-500"
                  />
                  <StatCard
                    title="Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    color="bg-purple-500"
                  />
                  <StatCard
                    title="Pending Orders"
                    value={pendingOrders.length.toString()}
                    icon={TrendingUp}
                    color="bg-orange-500"
                  />
                </div>

                {lowStockProducts.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">Low Stock Alert</h3>
                    <p className="text-yellow-700">
                      {lowStockProducts.length} product(s) have less than 10 items in stock.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'users' && <UsersTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
