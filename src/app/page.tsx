import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-center mb-8">
          <span className="text-cicada-black">Cicada</span>{" "}
          <span className="text-cicada-red">Cove</span>
        </h1>
        
        <p className="text-lg sm:text-xl mb-8 text-center max-w-2xl">
          Curated archival fashion pieces from the golden era of European 
          menswear design, 1970s-1990s.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Placeholder for product grid */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="border border-gray-200 rounded-md p-4 flex flex-col items-center"
            >
              <div className="bg-gray-100 w-full h-64 flex items-center justify-center mb-4">
                <p className="text-gray-400">Product Image</p>
              </div>
              <h2 className="text-xl font-medium mb-2">Product Title</h2>
              <p className="text-gray-500 mb-2">Designer</p>
              <p className="font-bold">$XXX.XX</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cicada Cove. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}