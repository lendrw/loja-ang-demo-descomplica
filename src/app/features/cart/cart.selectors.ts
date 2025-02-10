import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

export const selectCartTotal = createSelector(
  selectCartItems,
  items => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  items => items.reduce((count, item) => count + item.quantity, 0)
); 