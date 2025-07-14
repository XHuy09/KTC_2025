// src/context/CartContext.ts
import { createContext } from 'react';
import type { Product } from './types';

export const CartContext = createContext<{
  cart: Product[];
  addToCart: (product: Product) => void;
}>({
  cart: [],
  addToCart: () => {},
});
