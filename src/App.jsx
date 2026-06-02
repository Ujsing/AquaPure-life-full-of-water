

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

// export default function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Home/>} />
//       <Route path='/signin' element={<SignInModal/>} />

//     </Routes>
//     </BrowserRouter>
//     // <AuthProvider>
//     //   <CartProvider>
//     //     <BrowserRouter>
//     //       <Layout>
//     //         <Routes>
//     //           <Route path="/"         element={<Home />}    />
//     //           <Route path="/cart"     element={<Cart />}    />
//     //           <Route path="/address"  element={<Address />} />
//     //           <Route path="/payment"  element={<Payment />} />
//     //           <Route path="/orders"   element={<Orders />}  />
//     //         </Routes>
//     //       </Layout>
//     //     </BrowserRouter>
//     //   </CartProvider>
//     // </AuthProvider>
//   )
// }


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Topbar from './components/Topbar'
import SignInModal from './components/SignInModal'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Address from './pages/Address'
import Payment from './pages/Payment'
import Orders from './pages/Orders'
import { AddressProvider } from './context/AddressContext'
import SignUpModals from './components/SignUpModals'
// import Cart from './pages/Cart'
// import Payment from './pages/Payment'
// import Orders from './pages/Orders'

// Layout wraps every page — topbar stays on all pages
function Layout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Topbar />
      <main className="max-w-full mx-auto  pb-16">
        {children}
      </main>
      {/* SignInModal is available on every page, controlled by AuthContext */}
      <SignInModal />
      <SignUpModals/>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
            <AddressProvider>

        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/"         element={<Home />}    />
               <Route path='/signin' element={<SignInModal/>} />
               <Route path='/signup' element={<SignUpModals/>} />

              <Route path="/cart"     element={<Cart />}    />
              <Route path="/address"  element={<Address />} />
              <Route path="/payment"  element={<Payment />} />
              <Route path="/orders"   element={<Orders />}  />
            </Routes>
          </Layout>
        </BrowserRouter>
            </AddressProvider>

      </CartProvider>
    </AuthProvider>
  )
}

