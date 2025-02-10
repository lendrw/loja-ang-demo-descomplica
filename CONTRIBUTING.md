# Guia de Contribuição

Obrigado por considerar contribuir com o Tech Store! Este documento fornece diretrizes e padrões para contribuir com o projeto.

## Código de Conduta

Este projeto segue um Código de Conduta. Ao participar, espera-se que você mantenha este código.

## Como Contribuir

### Reportando Bugs
1. Verifique se o bug já não foi reportado
2. Abra uma issue com um título descritivo
3. Inclua:
   - Passos para reproduzir
   - Comportamento esperado
   - Comportamento atual
   - Screenshots (se aplicável)
   - Ambiente (navegador, SO, etc)

### Sugerindo Melhorias
1. Abra uma issue descrevendo a melhoria
2. Inclua:
   - Caso de uso
   - Benefícios
   - Possíveis impactos

### Processo de Pull Request
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Padrões de Código

### Angular
- Siga o [Guia de Estilo Angular](https://angular.io/guide/styleguide)
- Use TypeScript strict mode
- Mantenha componentes pequenos e focados
- Implemente testes unitários

### Commits
- Use mensagens claras e descritivas
- Siga o padrão: `tipo(escopo): mensagem`
- Tipos: feat, fix, docs, style, refactor, test, chore

### Nomenclatura
- Componentes: PascalCase (ex: `CoursePlayerComponent`)
- Serviços: PascalCase (ex: `AuthService`)
- Interfaces: PascalCase com 'I' prefix (ex: `IUser`)
- Variáveis/métodos: camelCase
- Constantes: SNAKE_CASE maiúsculo

### Estrutura de Arquivos
```
feature/
├── components/     # Componentes da feature
├── services/       # Serviços específicos
├── models/         # Interfaces e tipos
├── store/          # Estado NgRx
└── utils/          # Utilitários
```

## Desenvolvimento

### Setup do Ambiente
1. Instale Node.js (v18+)
2. Instale Angular CLI globalmente:
   ```bash
   npm install -g @angular/cli
   ```
3. Clone o repositório
4. Instale dependências:
   ```bash
   npm install
   ```

### Comandos Úteis
- `npm start` - Inicia o servidor de desenvolvimento
- `npm run server` - Inicia o mock server
- `npm test` - Executa testes unitários
- `npm run lint` - Verifica estilo de código
- `npm run build` - Build de produção

### Testes
- Escreva testes unitários para:
  - Componentes
  - Serviços
  - Pipes
  - Diretivas
- Mantenha cobertura mínima de 80%
- Use mocks apropriadamente

## Documentação

### Código
- Documente classes e métodos públicos
- Use JSDoc para TypeScript
- Mantenha README.md atualizado
- Atualize CHANGELOG.md

### Commits
```
feat: adiciona nova funcionalidade
^--^  ^-----------------------^
|     |
|     +-> Descrição no imperativo
|
+-------> Tipo: feat, fix, docs, style, refactor, test, ou chore
```

## Review Process

### Checklist
- [ ] Código segue padrões
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Sem conflitos com main
- [ ] Review por 2+ desenvolvedores

### Performance
- Lazy loading implementado
- Imagens otimizadas
- Bundle size controlado
- Sem memory leaks

## Dúvidas?

Abra uma issue ou contate a equipe de desenvolvimento. 