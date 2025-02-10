import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { CartItem } from './cart.model';
import * as CartSelectors from './cart.selectors';
import * as CartActions from './cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div class="container">
      <h1>Carrinho de Compras</h1>
      
      <ng-container *ngIf="cartItems$ | async as items">
        <div class="cart-content" *ngIf="items.length > 0; else emptyCart">
          <div class="cart-items">
            <mat-card *ngFor="let item of items" class="cart-item" appearance="outlined">
              <mat-card-content>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <div class="item-controls">
                    <div class="quantity-controls">
                      <button mat-icon-button color="primary" (click)="updateQuantity(item.id, item.quantity - 1)" [disabled]="item.quantity <= 1">
                        <mat-icon>remove</mat-icon>
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button mat-icon-button color="primary" (click)="updateQuantity(item.id, item.quantity + 1)">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>
                    <span class="price">R$ {{ item.price * item.quantity | number:'1.2-2' }}</span>
                    <button mat-icon-button color="warn" (click)="removeFromCart(item.id)" class="remove-button">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <mat-card class="cart-summary" appearance="outlined">
            <mat-card-content>
              <h2>Resumo do Pedido</h2>
              <div class="summary-details">
                <div class="summary-line">
                  <span>Subtotal</span>
                  <span>R$ {{ cartTotal$ | async | number:'1.2-2' }}</span>
                </div>
                <div class="summary-line">
                  <span>Desconto</span>
                  <span>R$ 0,00</span>
                </div>
                <div class="summary-line total">
                  <span>Total</span>
                  <span>R$ {{ cartTotal$ | async | number:'1.2-2' }}</span>
                </div>
              </div>
              <div class="summary-actions">
                <button mat-raised-button color="primary" (click)="checkout()" class="checkout-button">
                  <mat-icon>shopping_cart_checkout</mat-icon>
                  <span>Finalizar Compra</span>
                </button>
                <button mat-button color="warn" (click)="clearCart()" class="clear-button">
                  <mat-icon>remove_shopping_cart</mat-icon>
                  <span>Limpar Carrinho</span>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </ng-container>

      <ng-template #emptyCart>
        <mat-card class="empty-cart" appearance="outlined">
          <mat-card-content>
            <mat-icon class="empty-cart-icon">shopping_cart</mat-icon>
            <p>Seu carrinho está vazio</p>
            <button mat-raised-button color="primary" routerLink="/courses">
              <mat-icon>school</mat-icon>
              <span>Explorar Cursos</span>
            </button>
          </mat-card-content>
        </mat-card>
      </ng-template>
    </div>
  `,
  styles: [`
    .container {
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 24px;
      color: #333;
      font-size: clamp(24px, 4vw, 32px);
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 24px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .cart-item {
      .item-info {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .item-title {
        font-size: 1.1em;
        margin: 0;
        color: #333;
      }

      .item-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .quantity {
          min-width: 24px;
          text-align: center;
          font-weight: 500;
        }
      }

      .price {
        font-size: 1.2em;
        font-weight: 500;
        color: #1976d2;
        white-space: nowrap;
      }

      .remove-button {
        margin-left: auto;
      }
    }

    .cart-summary {
      height: fit-content;
      position: sticky;
      top: 24px;

      h2 {
        margin: 0 0 20px 0;
        color: #333;
        font-size: 1.3em;
      }

      .summary-details {
        margin-bottom: 24px;
      }

      .summary-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        color: #666;

        &.total {
          font-size: 1.2em;
          font-weight: 500;
          color: #333;
          border-top: 1px solid #eee;
          padding-top: 12px;
          margin-top: 12px;
        }
      }

      .summary-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;

        button {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;

          mat-icon {
            margin: 0;
          }
        }
      }
    }

    .empty-cart {
      text-align: center;
      padding: clamp(24px, 5vw, 48px);
      max-width: 400px;
      margin: 0 auto;

      .empty-cart-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #bdbdbd;
        margin-bottom: 16px;
      }

      p {
        font-size: 1.2em;
        color: #666;
        margin-bottom: 24px;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 auto;
      }
    }

    @media (max-width: 959px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
      }
    }

    @media (max-width: 599px) {
      .container {
        padding: 8px;
      }

      .cart-items {
        gap: 8px;
      }

      .cart-item {
        .item-controls {
          flex-wrap: wrap;
          justify-content: center;
          
          .quantity-controls {
            order: 1;
            flex: 1;
            justify-content: center;
          }

          .price {
            order: 2;
            flex: 1;
            text-align: center;
          }

          .remove-button {
            order: 3;
            margin: 0;
          }
        }
      }

      .empty-cart {
        padding: 24px 16px;
      }
    }

    @media (min-width: 960px) {
      .checkout-button, .clear-button {
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar
  ) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity > 0) {
      this.store.dispatch(CartActions.updateQuantity({ id, quantity }));
    }
  }

  removeFromCart(id: number): void {
    this.store.dispatch(CartActions.removeFromCart({ id }));
    this.snackBar.open('Item removido do carrinho', 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
    this.snackBar.open('Carrinho limpo', 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  checkout(): void {
    this.snackBar.open('Funcionalidade em desenvolvimento', 'OK', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
} 