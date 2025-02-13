# Tech Store - Plataforma de Cursos Online - Projeto Prático do Curso Descomplica 

## Visão Geral
Tech Store é um protótipo em fase inicial de plataforma de e-learning moderna desenvolvida com Angular 17+, focada em oferecer uma experiência de aprendizado interativa e intuitiva para cursos técnicos.

Orientações para alunos: comecem com este projeto no começo do curso. use git init para iniciar o git em seu visual studio e faça clone deste repositório.

## Tecnologias Utilizadas
- Angular 17+
- Angular Material UI
- NgRx para gerenciamento de estado
- JSON Server para mock da API
- RxJS para programação reativa

## Funcionalidades Principais

### 1. Área do Aluno
- **Dashboard Personalizado**
  - Lista de cursos matriculados
  - Indicadores de progresso
  - Última aula assistida
  - Total de aulas e aulas concluídas

- **Player de Curso**
  - Menu lateral com currículo completo
  - Player de vídeo responsivo
  - Controles de navegação (anterior/próximo)
  - Marcação de aulas concluídas
  - Status de progresso por módulo

### 2. Catálogo de Cursos
- Listagem em grid com cards informativos
- Filtros por nível e categoria
- Informações detalhadas:
  - Descrição do curso
  - Instrutor
  - Carga horária
  - Nível de dificuldade
  - Preço

### 3. Sistema de Autenticação
- Login seguro
- Registro de novos usuários
- Proteção de rotas com Guards
- Persistência de sessão

### 4. Carrinho de Compras
- Adição/remoção de cursos
- Atualização de quantidade
- Cálculo automático de total
- Checkout (em desenvolvimento)

## Estrutura do Projeto
```
tech-store/
├── mock-server/
│   ├── db.json         # Dados mock da API
│   └── routes.json     # Configuração de rotas
├── src/
│   ├── app/
│   │   ├── core/       # Serviços e funcionalidades core
│   │   ├── shared/     # Componentes compartilhados
│   │   └── features/   # Módulos de funcionalidades
│   │       ├── auth/     # Autenticação
│   │       ├── cart/     # Carrinho
│   │       ├── courses/  # Catálogo de cursos
│   │       └── student/  # Área do aluno
│   ├── environments/   # Configurações de ambiente
│   └── styles/        # Estilos globais
```

## API Endpoints

### Cursos
- `GET /api/courses` - Lista todos os cursos
- `GET /api/courses/:id` - Detalhes de um curso

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário

### Área do Aluno
- `GET /api/student/courses` - Cursos matriculados
- `GET /api/student/courses/:id/content` - Conteúdo do curso
- `POST /api/student/courses/:id/progress` - Atualiza progresso
- `POST /api/student/courses/:id/complete` - Marca aula como concluída

## Instalação e Execução

### Pré-requisitos
- Node.js (v18+)
- npm (v9+)
- Angular CLI (v17+)

### Configuração
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

### Execução
1. Inicie o servidor mock:
```bash
npm run server
```

2. Em outro terminal, inicie o servidor Angular:
```bash
ng serve
```

3. Acesse http://localhost:4200

### Credenciais de Teste
- Email: alan@edugital.com.br
- Senha: teste222

## Recursos do Material UI Implementados
- MatToolbar para navegação
- MatSidenav para menu lateral
- MatCard para cards de cursos
- MatProgressBar para indicadores
- MatExpansionPanel para currículo
- MatSnackBar para notificações

## Estado Global (NgRx)
- Store configurada para:
  - Carrinho de compras
  - Autenticação
  - Estado do curso atual

## Responsividade
- Layout adaptativo para:
  - Desktop (1200px+)
  - Tablet (768px - 1199px)
  - Mobile (< 768px)
- Grid system flexível
- Componentes responsivos
- Media queries otimizadas

## Segurança
- Guards para rotas protegidas
- Interceptor para tokens
- Sanitização de URLs
- Validação de formulários

## Performance
- Lazy loading de módulos
- Componentes standalone
- Otimização de imagens
- Minificação de assets

## Próximas Implementações
- [ ] Sistema de busca avançada
- [ ] Filtros de cursos
- [ ] Checkout integrado
- [ ] Área do instrutor
- [ ] Sistema de avaliações
- [ ] Download de materiais
- [ ] Certificados automáticos

## Contribuição
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Suporte
Para suporte, envie um email para suporte@techstore.com ou abra uma issue no repositório.

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
