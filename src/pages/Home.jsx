import { ExperimentOutlined } from '@ant-design/icons'
import Topbar from '../components/Topbar'
import ProductCard from '../components/ProductCard'
import SignInModal from '../components/SignInModal'

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
    
<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 mt-8 p-3"> 
     {products.map((i)=>(
      <ProductCard key={i.id}/>
    ))}

    </div>
    </div>
    </>
  )
}
