import React from 'react';
import { useCart } from '../useCart';

const CartList: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="max-w-xl mx-auto my-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString()}VNĐ</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
