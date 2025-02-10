# Plano de Execução: E-commerce de Cursos Técnicos

## Estado Atual do Projeto
- [x] Setup inicial do projeto Angular
- [x] Configuração do Material UI
- [x] Configuração do NgRx
- [x] Estrutura base de módulos (Core, Shared, Features)
- [x] Layout responsivo com Material Sidenav
- [x] Mock Server configurado
- [x] Rotas lazy loading configuradas      
- [x] Interface de listagem de cursos
- [x] Interface do carrinho
- [x] Gerenciamento de estado do carrinho

## Stack Tecnológica
- Angular 17+
- NgRx para gerenciamento de estado
- Angular Material UI para interface
- JSON Server para mock da API
- PowerShell para execução de comandos

## Estrutura de Diretórios
```
tech-store/
├── mock-server/
│   ├── db.json         # Dados mock da aplicação
│   └── routes.json     # Configuração de rotas da API
├── src/
│   ├── app/
│   │   ├── core/       # Serviços e funcionalidades core
│   │   ├── shared/     # Componentes e módulos compartilhados
│   │   └── features/   # Módulos de funcionalidades (lazy loaded)
│   │       ├── courses/  # Módulo de cursos
│   │       └── cart/     # Módulo de carrinho
│   ├── environments/   # Configurações de ambiente
│   └── styles.scss     # Estilos globais e tema Material
└── package.json        # Dependências e scripts
```

## Módulos Implementados

### Core Module
- Configuração do NgRx Store
- Interceptors HTTP
- Serviços base

### Shared Module
Componentes Material UI configurados:
```typescript
const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatBadgeModule,
  MatSnackBarModule
];
```

### Feature Modules (Lazy Loaded)
1. Courses Module
   - Listagem de cursos em grid
   - Cards com informações detalhadas
   - Indicadores de nível
   - Ações de adicionar ao carrinho
   - Feedback visual com snackbar

2. Cart Module
   - Lista de itens no carrinho
   - Controles de quantidade
   - Remoção de itens
   - Cálculo de total
   - Feedback visual com snackbar

## Estado Global (NgRx)
1. Cart State
   - Actions: addToCart, removeFromCart, updateQuantity, clearCart
   - Reducer: Gerencia o estado do carrinho
   - Selectors: selectCartItems, selectCartTotal, selectCartItemsCount

## Comandos para Execução

### Preparação do Ambiente
```powershell
# Instalar dependências
npm install

# Em caso de processos node.exe bloqueando portas
taskkill /F /IM node.exe
```

### Executando a Aplicação

1. Iniciar o Mock Server (Terminal 1):
```powershell
npm run server
```
O servidor estará disponível em: http://localhost:3000
Endpoints:
- GET /api/courses - Lista de cursos
- GET /api/users - Lista de usuários
- GET /api/cart - Carrinho de compras

2. Iniciar o Frontend (Terminal 2):
```powershell
ng serve
```
A aplicação estará disponível em: http://localhost:4200

## Rotas da Aplicação
- `/courses` - Listagem de cursos disponíveis
- `/cart` - Carrinho de compras

## Mock Data (mock-server/db.json)
```json
{
  "courses": [
    {
      "id": 1,
      "title": "Desenvolvimento Web Full Stack",
      "description": "Aprenda desenvolvimento web completo",
      "price": 799.99,
      "instructor": "João Silva",
      "level": "intermediate",
      "duration": 120,
      "image": "https://picsum.photos/300/200"
    }
    // ... mais cursos
  ],
  "users": [],
  "cart": []
}
```

## Configurações Importantes

### Environment (src/environments/environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Angular Material Theme (src/styles.scss)
```scss
@use '@angular/material' as mat;
$tech-store-primary: mat.define-palette(mat.$indigo-palette);
$tech-store-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$tech-store-warn: mat.define-palette(mat.$red-palette);
```

## Funcionalidades Implementadas
- ✅ Layout responsivo com Material Design
- ✅ Navegação com sidenav e toolbar
- ✅ Listagem de cursos em grid
- ✅ Cards com informações detalhadas
- ✅ Indicador de quantidade no carrinho
- ✅ Gerenciamento de estado com NgRx
- ✅ Feedback visual com snackbars
- ✅ Lazy loading de módulos

## Próximos Passos

### 1. Melhorias de UX (Prioridade Alta)
- [ ] Implementar filtros de cursos
- [ ] Adicionar página de detalhes do curso
- [ ] Melhorar feedback de loading

### 2. Funcionalidades (Prioridade Média)
- [ ] Implementar autenticação
- [ ] Adicionar checkout
- [ ] Histórico de compras

### 3. Técnico (Prioridade Baixa)
- [ ] Implementar testes unitários
- [ ] Melhorar performance
- [ ] Implementar PWA

## Observações Técnicas
- Utilização de standalone components
- Implementação de lazy loading para melhor performance
- Gerenciamento de estado centralizado com NgRx
- Design system com Angular Material
- Mock server com json-server para desenvolvimento rápido

## Guia de Instalação (Do Zero)

### 1. Pré-requisitos
- Node.js (v18+)
- npm (v9+)
- Angular CLI (v17+)
```powershell
# Instalar Angular CLI globalmente
npm install -g @angular/cli
```

### 2. Criar o Projeto
```powershell
# Criar novo projeto Angular
ng new tech-store --routing --style=scss --skip-git --skip-tests

# Entrar no diretório do projeto
cd tech-store
```

### 3. Instalar Dependências
```powershell
# Instalar Angular Material
ng add @angular/material

# Instalar NgRx e outras dependências
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools json-server
```

### 4. Configurar Mock Server
```powershell
# Criar diretório mock-server
mkdir mock-server

# Criar arquivo db.json
echo '{
  "courses": [
    {
      "id": 1,
      "title": "Desenvolvimento Web Full Stack",
      "description": "Aprenda desenvolvimento web completo com HTML, CSS, JavaScript, Node.js e React",
      "price": 799.99,
      "instructor": "João Silva",
      "level": "intermediate",
      "duration": 120,
      "image": "https://picsum.photos/300/200"
    }
  ],
  "users": [],
  "cart": []
}' > mock-server/db.json

# Criar arquivo routes.json
echo '{
  "/api/*": "/$1"
}' > mock-server/routes.json
```

### 5. Configurar Scripts no package.json
```powershell
# Adicionar script para o servidor mock
npm pkg set scripts.server="json-server --watch mock-server/db.json --routes mock-server/routes.json --port 3000"
```

### 6. Executar a Aplicação

1. Matar processos que possam estar usando as portas necessárias:
```powershell
# Matar processos node (caso necessário)
taskkill /F /IM node.exe
```

2. Iniciar o Mock Server (Terminal 1):
```powershell
npm run server
```

3. Iniciar o Frontend (Terminal 2):
```powershell
ng serve
```

### 7. Verificar a Instalação
- Frontend: http://localhost:4200
- API Mock: http://localhost:3000/api/courses

### 8. Possíveis Problemas e Soluções

1. Porta 3000 em uso:
```powershell
# Verificar processo usando a porta
netstat -ano | findstr :3000
# Matar o processo
taskkill /PID <PID> /F
```

2. Erro de CORS:
- Verificar se o arquivo routes.json está configurado corretamente
- Verificar se o environment.ts está apontando para a URL correta

3. Erro de módulos não encontrados:
```powershell
# Limpar cache do npm
npm cache clean --force
# Reinstalar dependências
rm -r node_modules
npm install
``` 