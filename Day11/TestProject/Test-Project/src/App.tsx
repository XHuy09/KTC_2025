import { Link, Route, Routes } from 'react-router-dom'
import BuyerForm from './cart/BuyerForm'
import CartList from './cart/CartList'
import { CartProvider } from './CartProvider'
import ProductList from './ProductList'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <nav className="bg-gray-800 p-4 text-white flex justify-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={
            <div className="max-w-4xl mx-auto p-4">
              <CartList />
              <div className="mt-6">
                <BuyerForm />
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
