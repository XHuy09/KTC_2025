// src/context/CartProvider.tsx
import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from './CartContext';
import type { Product } from './types';

type CartState = {
  cart: Product[];
};

type Action = { type: 'ADD_TO_CART'; payload: Product };

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { cart: [...state.cart, action.payload] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
