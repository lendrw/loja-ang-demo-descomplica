import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <mat-icon matListItemIcon>home</mat-icon>
        <span matListItemTitle>Início</span>
      </a>

      <a mat-list-item routerLink="/student/my-courses" routerLinkActive="active" *ngIf="isLoggedIn$ | async">
        <mat-icon matListItemIcon>school</mat-icon>
        <span matListItemTitle>Meus Cursos</span>
      </a>

      <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active" *ngIf="(currentUser$ | async)?.role === 'admin'">
        <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
        <span matListItemTitle>Administração</span>
      </a>

      <a mat-list-item routerLink="/cart" routerLinkActive="active">
        <mat-icon matListItemIcon>shopping_cart</mat-icon>
        <span matListItemTitle>Carrinho</span>
      </a>

      <mat-divider></mat-divider>

      <ng-container *ngIf="currentUser$ | async as user; else authButtons">
        <a mat-list-item (click)="logout()">
          <mat-icon matListItemIcon>exit_to_app</mat-icon>
          <span matListItemTitle>Sair</span>
        </a>
      </ng-container>

      <ng-template #authButtons>
        <a mat-list-item routerLink="/auth/login" routerLinkActive="active">
          <mat-icon matListItemIcon>login</mat-icon>
          <span matListItemTitle>Entrar</span>
        </a>

        <a mat-list-item routerLink="/auth/register" routerLinkActive="active">
          <mat-icon matListItemIcon>person_add</mat-icon>
          <span matListItemTitle>Cadastrar</span>
        </a>
      </ng-template>
    </mat-nav-list>
  `,
  styles: [`
    .active {
      background: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class SideMenuComponent {
  currentUser$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 