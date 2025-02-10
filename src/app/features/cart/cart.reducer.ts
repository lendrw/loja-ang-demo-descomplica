import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.model';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => ({
    ...state,
    items: state.items.some(existingItem => existingItem.id === item.id)
      ? state.items.map(existingItem =>
          existingItem.id === item.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : existingItem
        )
      : [...state.items, { ...item, quantity: 1 }]
  })),
  on(CartActions.removeFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),
  on(CartActions.updateQuantity, (state, { id, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  })),
  on(CartActions.clearCart, state => ({
    ...state,
    items: []
  }))
); 