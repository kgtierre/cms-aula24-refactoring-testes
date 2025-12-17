# CMS - Aula 24: Refactoring e Testes Automatizados

Este projeto demonstra a transformação de código "gambiarra" para código profissional através de refatoração e testes automatizados.

## Objetivos

- Refatorar código legacy usando ES6+
- Implementar testes automatizados com Jest
- Configurar ferramentas de qualidade de código
- Automatizar verificações com GitHub Actions
- Demonstrar boas práticas de desenvolvimento



## Como Executar

### Pré-requisitos
- Node.js 18+
- npm 9+

### Instalação
npm install

### Executar a aplicação
npm start

### Executar testes
# Todos os testes
npm test

# Modo watch (desenvolvimento)
npm run test:watch

# Com cobertura
npm run test:coverage

### Qualidade de código
# Verificar lint
npm run lint

# Corrigir problemas de lint
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check

# Executar todas as verificações
npm run quality

## 🧪 Testes Implementados

O projeto inclui testes para:
- ✅ Adição de comentários (casos válidos e inválidos)
- ✅ Consulta de comentários por post
- ✅ Moderação (aprovar, rejeitar, excluir)
- ✅ Validações de dados

## 🛠️ Ferramentas Configuradas

- **Jest**: Framework de testes
- **ESLint**: Analisador de código estático
- **Prettier**: Formatador de código
- **Husky**: Git hooks automáticos
- **GitHub Actions**: CI/CD automático

## Cobertura de Testes

A cobertura mínima exigida é:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%