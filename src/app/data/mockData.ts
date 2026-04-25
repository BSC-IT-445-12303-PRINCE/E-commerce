import { Product, Order, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@shophub.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'customer',
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'customer',
  },
  {
    id: '4',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    role: 'customer',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 30,
    rating: 4.3,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Leather Backpack',
    description: 'Genuine leather backpack with laptop compartment and multiple pockets.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 25,
    rating: 4.7,
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning technology.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 40,
    rating: 4.4,
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-brew feature.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1517914309578-2742d2f5672e?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 20,
    rating: 4.6,
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with extra cushioning for joint protection.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 60,
    rating: 4.2,
    createdAt: '2024-02-20',
  },
  {
    id: '7',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 35,
    rating: 4.1,
    createdAt: '2024-03-01',
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 360-degree sound.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 45,
    rating: 4.5,
    createdAt: '2024-03-05',
  },
  {
    id: '9',
    name: 'Sunglasses',
    description: 'UV protection polarized sunglasses with lightweight frame.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 15,
    rating: 4.3,
    createdAt: '2024-03-10',
  },
  {
    id: '10',
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 80,
    rating: 4.6,
    createdAt: '2024-03-15',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerAddress: '123 Main St, New York, NY 10001',
    items: [
      { productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 199.99 },
      { productId: '3', productName: 'Leather Backpack', quantity: 1, price: 149.99 },
    ],
    total: 349.98,
    status: 'delivered',
    createdAt: '2024-03-10T10:30:00Z',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerAddress: '456 Oak Ave, Los Angeles, CA 90001',
    items: [
      { productId: '2', productName: 'Smart Watch', quantity: 1, price: 299.99 },
      { productId: '6', productName: 'Yoga Mat', quantity: 2, price: 39.99 },
    ],
    total: 379.97,
    status: 'shipped',
    createdAt: '2024-03-15T14:20:00Z',
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    customerAddress: '789 Pine Rd, Chicago, IL 60601',
    items: [
      { productId: '4', productName: 'Running Shoes', quantity: 1, price: 129.99 },
      { productId: '8', productName: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
      { productId: '10', productName: 'Water Bottle', quantity: 3, price: 34.99 },
    ],
    total: 314.95,
    status: 'processing',
    createdAt: '2024-03-20T09:15:00Z',
  },
];

let products = [...mockProducts];
let orders = [...mockOrders];
let users = [...mockUsers];

export const db = {
  getProducts: () => products,
  getProductById: (id: string) => products.find(p => p.id === id),
  addProduct: (product: Product) => {
    products.push(product);
    return product;
  },
  updateProduct: (id: string, updates: Partial<Product>) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      return products[index];
    }
    return null;
  },
  deleteProduct: (id: string) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      return true;
    }
    return false;
  },
  getOrders: () => orders,
  getOrderById: (id: string) => orders.find(o => o.id === id),
  addOrder: (order: Order) => {
    orders.push(order);
    return order;
  },
  updateOrderStatus: (id: string, status: Order['status']) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  },
  getUsers: () => users,
};
