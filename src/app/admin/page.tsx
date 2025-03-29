'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productService, orderService } from '@/lib/supabase';
import { Product, Order } from '@/types/database';

// Card component for dashboard stats
const StatCard = ({ title, value, icon, linkTo }: { title: string; value: string | number; icon: string; linkTo: string }) => (
  <Link 
    href={linkTo}
    className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      </div>
      <div className="text-2xl text-cicada-red">{icon}</div>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        
        // Fetch products
        const allProducts = await productService.getAllProducts();
        setProductCount(allProducts.length);
        setRecentProducts(allProducts.slice(0, 5)); // Get 5 most recent products
        
        // We'll need to implement this method in the orderService
        const allOrders = []; // Placeholder until we implement orders functionality
        setOrderCount(0);
        setRecentOrders([]);
        
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cicada-red"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Products" 
          value={productCount || 0} 
          icon="👕" 
          linkTo="/admin/products" 
        />
        
        <StatCard 
          title="Active Products" 
          value={productCount ? recentProducts.filter(p => p.status === 'active').length : 0} 
          icon="🏷️" 
          linkTo="/admin/products" 
        />
        
        <StatCard 
          title="Total Orders" 
          value={orderCount || 0} 
          icon="📦" 
          linkTo="/admin/orders" 
        />
        
        <StatCard 
          title="Revenue" 
          value="$0.00" 
          icon="💰" 
          linkTo="/admin/orders" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Products</h2>
            <Link href="/admin/products" className="text-cicada-red hover:underline text-sm">
              View All
            </Link>
          </div>
          
          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No products yet.</p>
          ) : (
            <ul className="divide-y">
              {recentProducts.map((product) => (
                <li key={product.id} className="py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{product.title}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-gray-500">{product.designer}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Recent Orders - Placeholder for now */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-cicada-red hover:underline text-sm">
              View All
            </Link>
          </div>
          
          <p className="text-gray-500 text-center py-4">No orders yet.</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/products/new" 
            className="bg-cicada-red text-white text-center py-2 px-4 rounded hover:opacity-90 transition-opacity"
          >
            Add New Product
          </Link>
          
          <Link 
            href="/admin/orders" 
            className="bg-gray-800 text-white text-center py-2 px-4 rounded hover:opacity-90 transition-opacity"
          >
            Manage Orders
          </Link>
          
          <Link 
            href="/" 
            className="bg-gray-100 text-gray-800 text-center py-2 px-4 rounded hover:bg-gray-200 transition-colors"
          >
            View Store
          </Link>
        </div>
      </div>
    </div>
  );
}