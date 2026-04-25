'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Package, LayoutDashboard, Store, Search, Home, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: Search },
  { href: '/orders', label: 'Orders', icon: Package },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-xl group-hover:shadow-blue-600/30 transition-all duration-300">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-2xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  pathname === '/admin'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-sm">Admin</span>
              </Link>
            )}
          </div>

          {/* Cart & Auth */}
          <div className="flex items-center space-x-3">
            <Link
              href="/cart"
              className="relative flex items-center space-x-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg ring-2 ring-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-slate-700 font-medium hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-700" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    pathname === '/admin'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
              )}
              
              {/* Mobile Auth */}
              <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user?.name}</p>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
