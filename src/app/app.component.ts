import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartSelectors from './features/cart/cart.selectors';
import { AuthService } from './features/auth/auth.service';
import { User } from './features/auth/auth.model';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SharedModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over">
        <div class="sidenav-header">
          <div class="logo-container" routerLink="/courses" (click)="sidenav.close()">
            <svg class="logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
              <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.5 0-6.4-2.9-6.4-6.4S8.5 5.6 12 5.6s6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4z"/>
              <path d="M12 7.2c-2.6 0-4.8 2.2-4.8 4.8s2.2 4.8 4.8 4.8 4.8-2.2 4.8-4.8-2.2-4.8-4.8-4.8zm0 8c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2z"/>
              <path d="M12 9.6c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4-1.1-2.4-2.4-2.4z"/>
              <path d="M15.6 12c0 2-1.6 3.6-3.6 3.6S8.4 14 8.4 12 10 8.4 12 8.4s3.6 1.6 3.6 3.6z"/>
              <path d="M14.4 12c0 1.3-1.1 2.4-2.4 2.4S9.6 13.3 9.6 12s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4z"/>
              <rect x="11.2" y="2" width="1.6" height="4"/>
              <rect x="11.2" y="18" width="1.6" height="4"/>
              <rect x="18" y="11.2" width="4" height="1.6"/>
              <rect x="2" y="11.2" width="4" height="1.6"/>
            </svg>
            <span class="logo-text">Tech Store</span>
          </div>
        </div>
        <mat-divider></mat-divider>
        <mat-nav-list>
          <div class="nav-item">
            <a mat-list-item routerLink="/courses" (click)="sidenav.close()" routerLinkActive="active-link">
              <mat-icon>school</mat-icon>
              <span class="nav-label">Catálogo de Cursos</span>
            </a>
          </div>

          <ng-container *ngIf="currentUser$ | async as user">
            <div class="nav-item">
              <a mat-list-item routerLink="/student/my-courses" (click)="sidenav.close()" routerLinkActive="active-link">
                <mat-icon>local_library</mat-icon>
                <span class="nav-label">Meus Cursos</span>
              </a>
            </div>

            <div class="nav-item" *ngIf="user.role === 'admin'">
              <a mat-list-item routerLink="/admin/dashboard" (click)="sidenav.close()" routerLinkActive="active-link">
                <mat-icon>admin_panel_settings</mat-icon>
                <span class="nav-label">Administração</span>
              </a>
            </div>
          </ng-container>

          <div class="nav-item">
            <a mat-list-item routerLink="/cart" (click)="sidenav.close()" routerLinkActive="active-link">
              <mat-icon>shopping_cart</mat-icon>
              <span class="nav-label">Meu Carrinho</span>
            </a>
          </div>

          <mat-divider></mat-divider>

          <ng-container *ngIf="currentUser$ | async as user; else authButtons">
            <div class="nav-item">
              <a mat-list-item (click)="logout(); sidenav.close()">
                <mat-icon>exit_to_app</mat-icon>
                <span class="nav-label">Sair</span>
              </a>
            </div>
          </ng-container>

          <ng-template #authButtons>
            <div class="nav-item">
              <a mat-list-item routerLink="/auth/login" (click)="sidenav.close()">
                <mat-icon>login</mat-icon>
                <span class="nav-label">Entrar</span>
              </a>
            </div>
            <div class="nav-item">
              <a mat-list-item routerLink="/auth/register" (click)="sidenav.close()">
                <mat-icon>person_add</mat-icon>
                <span class="nav-label">Criar Conta</span>
              </a>
            </div>
          </ng-template>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          
          <span class="toolbar-title">Tech Store</span>

          <span class="spacer"></span>

          <button mat-icon-button routerLink="/cart" 
                  [matBadge]="cartItemsCount$ | async" 
                  matBadgeColor="accent" 
                  [matBadgeHidden]="!(cartItemsCount$ | async)"
                  [matBadgeSize]="'small'">
            <mat-icon>shopping_cart</mat-icon>
          </button>

          <ng-container *ngIf="currentUser$ | async as user">
            <button mat-icon-button [matMenuTriggerFor]="userMenu">
              <mat-icon>account_circle</mat-icon>
            </button>
            <mat-menu #userMenu="matMenu">
              <a mat-menu-item routerLink="/student/my-courses">
                <mat-icon>school</mat-icon>
                <span>Meus Cursos</span>
              </a>
              <a mat-menu-item routerLink="/admin/dashboard" *ngIf="user.role === 'admin'">
                <mat-icon>admin_panel_settings</mat-icon>
                <span>Administração</span>
              </a>
              <button mat-menu-item (click)="logout()">
                <mat-icon>exit_to_app</mat-icon>
                <span>Sair</span>
              </button>
            </mat-menu>
          </ng-container>
        </mat-toolbar>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }

    mat-sidenav-container {
      height: 100%;
      overflow: hidden;
    }

    mat-sidenav {
      width: 280px;
    }

    .sidenav-header {
      padding: 16px;
      background: rgba(0, 0, 0, 0.04);
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      cursor: pointer;
      user-select: none;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      fill: #1976d2;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(180deg);
      }
    }

    .logo-text {
      font-size: 24px;
      font-weight: 500;
      color: #1976d2;
      letter-spacing: -0.5px;
    }

    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0 16px;
    }

    .toolbar-title {
      margin-left: 16px;
      font-size: 20px;
      font-weight: 500;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 16px;
    }

    mat-nav-list {
      padding: 8px;

      .nav-item {
        margin: 4px 0;

        a {
          height: 48px;
          border-radius: 8px;
          color: rgba(0, 0, 0, 0.87);
          transition: all 0.2s ease;
          padding: 0 24px;
          display: flex;
          align-items: center;

          &.active-link {
            background-color: rgba(25, 118, 210, 0.12);
            color: #1976d2;
          }

          .nav-label {
            font-size: 15px;
            font-weight: 500;
            letter-spacing: 0.1px;
          }

          &:hover:not(.active-link) {
            background-color: rgba(0, 0, 0, 0.04);
          }
        }
      }
    }

    .nav-item-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    ::ng-deep {
      .mat-badge-content {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 11px;
      }

      .mat-mdc-list-item {
        padding: 0 !important;
      }

      .mdc-list-item__content {
        padding: 0 !important;
      }

      .mat-badge-small {
        font-size: 9px;
        width: 16px;
        height: 16px;
        line-height: 16px;
      }

      .mat-badge-medium {
        font-size: 11px;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }
    }

    .menu-button, .cart-button {
      min-width: 40px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        line-height: 24px;
      }
    }

    @media (max-width: 599px) {
      mat-toolbar {
        padding: 0 8px;
      }

      .toolbar-title {
        margin-left: 8px;
        font-size: 18px;
      }

      .menu-button, .cart-button {
        min-width: 36px;
        width: 36px;
        height: 36px;
        line-height: 36px;
        margin: 0;

        mat-icon {
          font-size: 22px;
          width: 22px;
          height: 22px;
          line-height: 22px;
        }
      }
    }
  `]
})
export class AppComponent {
  cartItemsCount$: Observable<number>;
  currentUser$: Observable<User | null>;
  isWideScreen = window.innerWidth >= 960;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.cartItemsCount$ = this.store.select(CartSelectors.selectCartItemsCount);
    this.currentUser$ = this.authService.currentUser$;
    
    window.addEventListener('resize', () => {
      this.isWideScreen = window.innerWidth >= 960;
    });
  }

  logout() {
    this.authService.logout();
  }
}
