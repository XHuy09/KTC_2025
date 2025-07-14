import React from 'react';
import { useCart } from './useCart';

const Products = [
  { id: 1, name: 'Áo', price: 199000 },
  { id: 2, name: 'Quần', price: 399000 },
  { id: 3, name: 'Giày', price: 599000 },
  { id: 4, name: 'Áo Khoát', price: 799000 },
  { id: 5, name: 'Mũ', price: 149000 },
  { id: 6, name: 'Ba Lô', price: 299000 },
];

const ProductList: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto my-6">
      {Products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price.toLocaleString()}VNĐ</p>
          <button
            onClick={() => {
            addToCart(product);
            alert(`${product.name} đã được thêm vào giỏ hàng!`);
          }}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
