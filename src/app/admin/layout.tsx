import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Dashboard | Cicada Cove',
  description: 'Manage your Cicada Cove vintage clothing store',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-cicada-black text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/admin" className="text-xl font-bold">
              Cicada Cove Admin
            </Link>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-6">
              <li>
                <Link 
                  href="/admin/products" 
                  className="hover:text-cicada-red transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/orders" 
                  className="hover:text-cicada-red transition-colors"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="hover:text-cicada-red transition-colors"
                >
                  View Site
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow bg-gray-50">
        {children}
      </main>

      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Cicada Cove Admin Panel</p>
        </div>
      </footer>
    </div>
  );
}