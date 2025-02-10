# Plano de Aulas - Angular Avançado

## Estrutura do Curso
Este documento contém o planejamento detalhado para cada módulo do curso, incluindo exemplos de código, comandos e orientações para gravação.

## Módulo 1: Estruturação de um Projeto Angular (40 minutos)

### Aula 1.1: Configuração inicial do ambiente (10 minutos)

**Objetivos:**
- Configurar Node.js e Angular CLI
- Criar projeto usando Angular CLI
- Entender a estrutura de diretórios

**Comandos principais:**
```bash
node -v  # Verificar versão do Node.js
npm -v   # Verificar versão do NPM
npm install -g @angular/cli
ng new tech-store
cd tech-store
ng serve
```

**Pontos para lacunas de código:**
- Configuração inicial do angular.json
- Estruturação de módulos core e shared

### Aula 1.2: Estrutura modular e boas práticas (10 minutos)

**Objetivos:**
- Implementar arquitetura modular
- Configurar módulos Core e Shared
- Estabelecer padrões de código

**Estrutura de diretórios a ser implementada:**
```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── features/
│   │   ├── admin/
│   │   ├── products/
│   │   └── auth/
│   └── shared/
│       ├── components/
│       ├── interfaces/
│       └── pipes/
```

### Aula 1.3: Roteamento básico e navegação inicial (10 minutos)

**Objetivos:**
- Configurar rotas básicas
- Implementar navegação entre componentes
- Entender lazy loading inicial

**Lacuna de código - app-routing.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO: Implementar rotas básicas
const routes: Routes = [
  // Implementar rota padrão
  // Implementar rota para produtos
  // Implementar rota para carrinho
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Aula 1.4: Gerenciando dependências e serviços (10 minutos)

**Objetivos:**
- Configurar serviços principais
- Implementar injeção de dependências
- Configurar ambiente de desenvolvimento

**Lacuna de código - environment.ts:**
```typescript
export const environment = {
  production: false,
  // TODO: Implementar configurações de ambiente
  apiUrl: '',
  // TODO: Implementar outras variáveis de ambiente
};
```

## Módulo 2: Roteamento Avançado e Lazy Loading (42 minutos)

### Aula 2.1: Planejamento de rotas e rotas dinâmicas (12 minutos)

**Objetivos:**
- Implementar rotas parametrizadas
- Configurar rotas filhas
- Gerenciar estados de navegação

**Lacuna de código - features/products/products-routing.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // TODO: Implementar rota principal de produtos
  // TODO: Implementar rota de detalhes do produto com parâmetro
  // TODO: Implementar rotas filhas para categorias
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
```

### Aula 2.2: Implementação de Lazy Loading (10 minutos)

**Objetivos:**
- Configurar carregamento lazy de módulos
- Otimizar performance inicial
- Implementar pré-carregamento estratégico

**Lacuna de código - app-routing.module.ts (atualização):**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    // TODO: Implementar lazy loading do módulo admin
    // loadChildren: () => ...
  },
  {
    path: 'products',
    // TODO: Implementar lazy loading do módulo de produtos
    // loadChildren: () => ...
  }
];
```

### Aula 2.3: Rotas parametrizadas e navegação dinâmica (10 minutes)

**Objetivos:**
- Trabalhar com parâmetros de rota
- Implementar resolvers
- Gerenciar navegação programática

**Lacuna de código - features/products/product-detail.component.ts:**
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `
    <!-- TODO: Implementar template -->
  `
})
export class ProductDetailComponent implements OnInit {
  // TODO: Implementar lógica de parâmetros
  // TODO: Implementar navegação programática
}
```

### Aula 2.4: Uso de Guards e segurança de rotas (10 minutes)

**Objetivos:**
- Implementar guards de rota
- Proteger rotas administrativas
- Gerenciar autenticação em rotas

**Lacuna de código - core/guards/auth.guard.ts:**
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // TODO: Implementar lógica de guard
  canActivate(): boolean {
    // Implementar verificação de autenticação
    return true;
  }
}
```

## Módulo 3: Manipulação de Dados e Integração com APIs (45 minutos)

### Aula 3.1: Configurando HttpClient no Angular (10 minutes)

**Objetivos:**
- Configurar HttpClient
- Implementar interceptors
- Gerenciar headers e tokens

**Lacuna de código - core/interceptors/auth.interceptor.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // TODO: Implementar lógica do interceptor
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Adicionar token de autenticação
    return next.handle(request);
  }
}
```

### Aula 3.2: Consumo de APIs RESTful (10 minutes)

**Objetivos:**
- Implementar serviços HTTP
- Gerenciar respostas da API
- Tratar erros HTTP

**Lacuna de código - core/services/product.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // TODO: Implementar métodos CRUD
  // TODO: Implementar tratamento de erros
}
```

### Aula 3.3: Introdução ao RxJS: Observables e Subjects (15 minutes)

**Objetivos:**
- Trabalhar com Observables
- Implementar Subjects
- Gerenciar estado com BehaviorSubject

**Lacuna de código - core/services/state.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // TODO: Implementar BehaviorSubjects
  // TODO: Implementar métodos de estado
}
```

### Aula 3.4: Tratamento de erros e boas práticas (10 minutes)

**Objetivos:**
- Implementar error handlers
- Criar interceptor de erros
- Estabelecer padrões de tratamento

**Lacuna de código - core/interceptors/error.interceptor.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // TODO: Implementar tratamento de erros
}
```

## Módulo 4: Interfaces Dinâmicas com Angular Material (40 minutes)

### Aula 4.1: Configurando e introduzindo Angular Material (10 minutes)

**Objetivos:**
- Configurar Angular Material
- Implementar tema personalizado
- Configurar animações

**Comandos e configuração:**
```bash
ng add @angular/material
```

**Lacuna de código - styles.scss:**
```scss
// TODO: Implementar customização de tema
// TODO: Implementar variáveis de cores
// TODO: Implementar mixins personalizados
```

### Aula 4.2: Criação de componentes ricos (10 minutes)

**Objetivos:**
- Implementar componentes Material
- Criar formulários Material
- Implementar diálogos e modais

**Lacuna de código - features/products/product-form.component.ts:**
```typescript
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  template: `
    <!-- TODO: Implementar formulário Material -->
  `
})
export class ProductFormComponent {
  // TODO: Implementar lógica de formulário
  // TODO: Implementar diálogos
}
```

### Aula 4.3: Estilização de temas e responsividade (10 minutes)

**Objetivos:**
- Customizar temas Material
- Implementar layouts responsivos
- Criar breakpoints personalizados

**Lacuna de código - theme.scss:**
```scss
@use '@angular/material' as mat;

// TODO: Implementar paleta de cores
// TODO: Implementar tema escuro
// TODO: Implementar mixins responsivos
```

### Aula 4.4: Testes de acessibilidade para interfaces (10 minutes)

**Objetivos:**
- Implementar ARIA labels
- Testar navegação por teclado
- Validar contraste e legibilidade

**Lacuna de código - shared/components/accessible-card.component.ts:**
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accessible-card',
  template: `
    <!-- TODO: Implementar componente acessível -->
  `
})
export class AccessibleCardComponent {
  // TODO: Implementar propriedades de acessibilidade
}
```

## Módulo 5: Formulários Reativos e Validações (40 minutes)

### Aula 5.1: Introdução a Reactive Forms (10 minutes)

**Objetivos:**
- Configurar ReactiveFormsModule
- Criar formulários reativos
- Implementar controles dinâmicos

**Lacuna de código - features/auth/register-form.component.ts:**
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  template: `
    <!-- TODO: Implementar template do formulário -->
  `
})
export class RegisterFormComponent implements OnInit {
  // TODO: Implementar FormGroup
  // TODO: Implementar validações básicas
}
```

### Aula 5.2: Criação de validações padrão e personalizadas (10 minutes)

**Objetivos:**
- Implementar validadores síncronos
- Criar validadores assíncronos
- Desenvolver validadores customizados

**Lacuna de código - shared/validators/custom.validators.ts:**
```typescript
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

// TODO: Implementar validador personalizado
// TODO: Implementar validador assíncrono
```

### Aula 5.3: Máscaras para campos (10 minutes)

**Objetivos:**
- Implementar máscaras de input
- Criar diretivas de máscara
- Validar formatos específicos

**Lacuna de código - shared/directives/input-mask.directive.ts:**
```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective {
  // TODO: Implementar lógica de máscara
}
```

### Aula 5.4: Integração com APIs em submissões (10 minutes)

**Objetivos:**
- Implementar submissão de formulários
- Tratar respostas da API
- Gerenciar estados de loading

**Lacuna de código - features/auth/register.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // TODO: Implementar método de registro
  // TODO: Implementar tratamento de erros
}
```

## Módulo 6: Segurança e Autenticação (48 minutes)

### Aula 6.1: Implementação de autenticação com JWT (12 minutes)

**Objetivos:**
- Implementar fluxo JWT
- Gerenciar tokens
- Configurar refresh token

**Lacuna de código - core/services/auth.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Implementar login
  // TODO: Implementar refresh token
  // TODO: Implementar logout
}
```

### Aula 6.2: Proteção de rotas com Guards e Interceptors (12 minutes)

**Objetivos:**
- Implementar route guards
- Criar HTTP interceptors
- Proteger rotas administrativas

**Lacuna de código - core/guards/admin.guard.ts:**
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // TODO: Implementar verificação de admin
}
```

### Aula 6.3: Boas práticas de segurança no Angular (12 minutes)

**Objetivos:**
- Implementar CSRF protection
- Configurar Content Security Policy
- Prevenir XSS attacks

**Lacuna de código - core/interceptors/security.interceptor.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  // TODO: Implementar headers de segurança
  // TODO: Implementar proteção CSRF
}
```

### Aula 6.4: Criação de um fluxo seguro (12 minutes)

**Objetivos:**
- Implementar fluxo completo
- Testar segurança
- Validar proteções

**Lacuna de código - core/services/security.service.ts:**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  // TODO: Implementar verificações de segurança
  // TODO: Implementar sanitização
}
```

## Módulo 7: Testes e Automação (48 minutes)

### Aula 7.1: Testes unitários com Jasmine e Karma (12 minutes)

**Objetivos:**
- Configurar ambiente de testes
- Criar testes unitários
- Implementar mocks

**Lacuna de código - features/products/product.service.spec.ts:**
```typescript
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  // TODO: Implementar setup
  // TODO: Implementar testes unitários
});
```

### Aula 7.2: Automação de testes end-to-end (12 minutes)

**Objetivos:**
- Configurar Cypress
- Criar testes E2E
- Implementar CI/CD

**Lacuna de código - cypress/integration/product.spec.ts:**
```typescript
describe('Product Features', () => {
  // TODO: Implementar testes E2E
  // TODO: Implementar fixtures
});
```

### Aula 7.3: Testes para APIs e componentes (12 minutes)

**Objetivos:**
- Testar serviços HTTP
- Implementar component testing
- Criar integration tests

**Lacuna de código - features/auth/auth.service.spec.ts:**
```typescript
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  // TODO: Implementar testes de API
  // TODO: Implementar mocks de HTTP
});
```

### Aula 7.4: Ferramentas de análise de cobertura de código (12 minutes)

**Objetivos:**
- Configurar code coverage
- Analisar métricas
- Implementar quality gates

**Comandos principais:**
```bash
ng test --code-coverage
```

## Módulo 8: Integração e Projeto Final (48 minutes)

### Aula 8.1: Planejamento do projeto final (12 minutes)

**Objetivos:**
- Definir arquitetura
- Planejar features
- Estabelecer milestones

**Estrutura do projeto:**
```
tech-store/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   └── shared/
│   ├── assets/
│   └── environments/
├── tests/
│   ├── e2e/
│   └── unit/
└── docs/
    ├── architecture/
    └── api/
```

### Aula 8.2: Implementação inicial do projeto (12 minutes)

**Objetivos:**
- Configurar estrutura base
- Implementar features core
- Criar componentes base

### Aula 8.3: Refinamento e integração de funcionalidades (12 minutes)

**Objetivos:**
- Integrar módulos
- Implementar features avançadas
- Otimizar performance

### Aula 8.4: Apresentação e documentação do projeto (12 minutes)

**Objetivos:**
- Criar documentação
- Preparar apresentação
- Demonstrar features

## Recursos Adicionais

### Ambiente de Desenvolvimento
- Node.js v18+
- Angular CLI v16+
- VS Code com extensões recomendadas
- Git para versionamento

### Ferramentas Recomendadas
- Angular DevTools
- Chrome DevTools
- Postman/Insomnia
- Visual Studio Code

### Material de Apoio
- Documentação oficial do Angular
- Angular Material Design
- RxJS Documentation
- TypeScript Handbook 