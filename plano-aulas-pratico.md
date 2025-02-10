# Plano de Aulas Prático - Angular Avançado

## Visão Geral
Este documento contém o planejamento detalhado com códigos completos e funcionais para cada aula. O foco é na prática de programação em tempo real.

## Módulo 1: Estruturação de um Projeto Angular (40 minutos)

### Aula 1.1: Configuração inicial do ambiente (10 minutos)

**Código Completo - angular.json:**
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "tech-store": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "skipTests": false,
          "standalone": false
        },
        "@schematics/angular:class": {
          "skipTests": false
        },
        "@schematics/angular:directive": {
          "skipTests": false
        },
        "@schematics/angular:service": {
          "skipTests": false
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/tech-store",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "tech-store:build:production"
            },
            "development": {
              "browserTarget": "tech-store:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
```

### Aula 1.2: Estrutura modular e boas práticas (10 minutos)

**Código Completo - app.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Código Completo - core.module.ts:**
```typescript
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { StateService } from './services/state.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ProductService,
    StateService,
    AuthGuard,
    AdminGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado. Importe apenas no AppModule.');
    }
  }
}
```

**Código Completo - shared.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CardComponent } from './components/card/card.component';

import { TruncatePipe } from './pipes/truncate.pipe';
import { CurrencyBRLPipe } from './pipes/currency-brl.pipe';

const components = [
  HeaderComponent,
  FooterComponent,
  LoadingComponent,
  ErrorMessageComponent,
  CardComponent
];

const pipes = [
  TruncatePipe,
  CurrencyBRLPipe
];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ...components,
    ...pipes
  ]
})
export class SharedModule { }
```

### Aula 1.3: Roteamento básico e navegação inicial (10 minutos)

**Código Completo - app-routing.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module')
      .then(m => m.ProductsModule)
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () => import('./features/cart/cart.module')
      .then(m => m.CartModule)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: '**',
    loadChildren: () => import('./features/not-found/not-found.module')
      .then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Código Completo - app.component.ts:**
```typescript
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { StateService } from './core/services/state.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header 
      [isLoggedIn]="isLoggedIn" 
      [isAdmin]="isAdmin"
      (logout)="onLogout()">
    </app-header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <app-loading *ngIf="loading"></app-loading>
    <app-error-message 
      *ngIf="error"
      [message]="error"
      (close)="clearError()">
    </app-error-message>

    <app-footer></app-footer>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 120px);
      padding: 20px;
      margin-top: 60px;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    // Monitora mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });

    // Monitora estado de autenticação
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );

    this.authService.isAdmin$.subscribe(
      isAdmin => this.isAdmin = isAdmin
    );

    // Monitora estado global
    this.stateService.loading$.subscribe(
      loading => this.loading = loading
    );

    this.stateService.error$.subscribe(
      error => this.error = error
    );

    // Verifica token salvo
    this.authService.checkSavedToken();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  clearError() {
    this.stateService.clearError();
  }
}
```

### Aula 1.4: Gerenciando dependências e serviços (10 minutos)

**Código Completo - environment.ts:**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id'
  },
  stripe: {
    publishableKey: 'your-publishable-key'
  },
  recaptcha: {
    siteKey: 'your-site-key'
  }
};
```

**Código Completo - state.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface AppState {
  loading: boolean;
  error: string | null;
  user: any | null;
  cart: any[];
}

const initialState: AppState = {
  loading: false,
  error: null,
  user: null,
  cart: []
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = new BehaviorSubject<AppState>(initialState);

  // Observables públicos
  loading$: Observable<boolean> = this.select(state => state.loading);
  error$: Observable<string | null> = this.select(state => state.error);
  user$: Observable<any | null> = this.select(state => state.user);
  cart$: Observable<any[]> = this.select(state => state.cart);

  private select<T>(selector: (state: AppState) => T): Observable<T> {
    return new Observable(subscriber => {
      return this.state.subscribe(state => {
        subscriber.next(selector(state));
      });
    });
  }

  private update(newState: Partial<AppState>) {
    this.state.next({
      ...this.state.value,
      ...newState
    });
  }

  setLoading(loading: boolean) {
    this.update({ loading });
  }

  setError(error: string | null) {
    this.update({ error });
  }

  setUser(user: any | null) {
    this.update({ user });
  }

  updateCart(cart: any[]) {
    this.update({ cart });
  }

  clearError() {
    this.setError(null);
  }

  resetState() {
    this.state.next(initialState);
  }
}
```

## Pontos Importantes para Gravação:

1. **Preparação:**
   - Ter o Node.js e Angular CLI instalados
   - Criar o projeto do zero usando os comandos mostrados
   - Ter um editor configurado com extensões úteis

2. **Durante a Gravação:**
   - Explicar cada arquivo enquanto digita
   - Destacar padrões e boas práticas
   - Mostrar erros comuns e como resolvê-los
   - Testar o código após cada implementação

3. **Pontos de Atenção:**
   - Modularização correta
   - Injeção de dependências
   - Padrões de nomenclatura
   - Organização de imports
   - Tratamento de erros
   - Tipagem correta

[Continua com os próximos módulos...] 