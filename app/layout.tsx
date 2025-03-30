import { Layout } from '../src/components/layout/Layout';
import { Providers } from '../components/layout/Providers';
import './globals.css';

export const metadata = {
  title: 'Cicada Cove - Vintage Designer Menswear',
  description: 'Rare European designer menswear from the 1970s-1990s',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}