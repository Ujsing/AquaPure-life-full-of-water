import Topbar from '../components/Topbar'
import ProductCard from '../components/ProductCard'
import AquaPureBanner from '../components/AquaPureBanner'

export default function Home() {
  const products = [
    { id: 1, name: "Classic Still" },
    { id: 2, name: "Mineral Water" },
    { id: 3, name: "Cold Water" },
    { id: 4, name: "RO Water" },
    { id: 5, name: "Fresh Water" },
    { id: 6, name: "Pure Water" },
  ]
  
  return (
    
    <>
    <div className="overflow-x-hidden">

      <Topbar />
        <AquaPureBanner/>
      
      <div className='container py-1'>

    
       <div className="flex  w-screen justify-between items-center px-10">
          <h2 className="text-2xl font-bold text-gray-500">
            {/* {selectedCategory} */}dbbdfbj
          </h2>
          <span className="text-gray-500 text-sm">
            {products.length} products
          </span>
        </div>
    
      <div className="w-screen grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3  p-10"> 
     {products.map((i)=>(
      <ProductCard key={i.id}/>
    ))}

    </div>
      </div>
    </div>
    </>
  )
}
