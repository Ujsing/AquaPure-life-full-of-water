// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  AuthProvider  from './context/AuthContext'
import  {CartProvider}  from './context/CartContext'
import Topbar from './components/Topbar'
import Home from './pages/Home'

// Wraps every page with the sticky topbar + centered max-width
// function Layout({ children }) {
//   return (
//     <div className="bg-orbs min-h-screen">
//       <div className="relative z-10">
//         <Topbar />
//         {/* max-w-2xl = looks great on mobile, tablet, and iPhone */}
//         <main className="max-w-2xl mx-auto px-4 pb-10">
//           {children}
//         </main>
//       </div>
//       {/* Sign in modal available on every page */}
//       <SignInModal />
//     </div>
//   )
// }

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </BrowserRouter>
    // <AuthProvider>
    //   <CartProvider>
    //     <BrowserRouter>
    //       <Layout>
    //         <Routes>
    //           <Route path="/"         element={<Home />}    />
    //           <Route path="/cart"     element={<Cart />}    />
    //           <Route path="/address"  element={<Address />} />
    //           <Route path="/payment"  element={<Payment />} />
    //           <Route path="/orders"   element={<Orders />}  />
    //         </Routes>
    //       </Layout>
    //     </BrowserRouter>
    //   </CartProvider>
    // </AuthProvider>
  )
}