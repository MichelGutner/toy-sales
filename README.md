# 🧸 Toy Sales - Frontend

Aplicativo mobile desenvolvido com **React Native (Expo)** para o desafio técnico da loja de brinquedos **Toy Sales**.

---

## 📋 Sumário

- [🔧 Tecnologias utilizadas](#-tecnologias-utilizadas)
- [🚀 Como rodar o projeto](#-como-rodar-o-projeto)
- [🧠 Funcionalidades implementadas](#-funcionalidades-implementadas)
- [🔐 Autenticação](#-autenticação)
- [🔎 Busca inteligente](#-busca-inteligente)
- [📊 Dashboard e estatísticas](#-dashboard-e-estatísticas)
- [🌓 Suporte a temas](#-suporte-a-temas)
- [🌍 Internacionalização (i18n)](#-internacionalização-i18n)
- [🧪 Testes](#-testes)
- [📁 Estrutura de pastas](#-estrutura-de-pastas)
- [👤 Autor](#-autor)

---

## 🔧 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- [i18n-js + expo-localization](https://docs.expo.dev/guides/localization/) — Internacionalização
- Context API — Gerenciamento de estado
- [Expo Router](https://docs.expo.dev/versions/latest/sdk/router/) — Navegação
- ESLint + Prettier + Husky (opcional)

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js ≥ 18
- Yarn ou npm
- Expo CLI:

```bash
npm install -g expo-cli
```

### Instalação

```bash
git clone https://github.com/MichelGutner/toy-sales.git
cd toy-sales
yarn install
```

### Execução

```bash
# Inicie o app com o Expo
yarn ios     # ou yarn android
```

A aplicação será aberta no painel do Expo. Você pode escanear o QR Code com o app **Expo Go** ou rodar em um emulador.

---

## 🧠 Funcionalidades implementadas

- Cadastro e listagem de clientes
- Normalização de dados duplicados/aninhados
- Splash screen e ícone personalizados
- Dashboard com gráficos e indicadores:
  - Total de vendas por dia
  - Cliente com maior volume de vendas
  - Cliente com maior média por venda
  - Cliente com maior frequência de compras
- Análise alfabética: identifica a primeira letra do alfabeto ainda não usada nos nomes dos clientes

---

## 🔐 Autenticação

- Login via e-mail e senha
- Validação básica no frontend

---

## 🔎 Busca inteligente

- Sistema de busca com priorização de correspondência
- Resultados mais relevantes aparecem no topo
- Palavras sem correspondência são automaticamente excluídas da lista

---

## 📊 Dashboard e estatísticas

Rotas mockadas de estatísticas (simuladas no frontend):

- Total de vendas por dia
- Top clientes por:
  - Volume de vendas
  - Média por venda
  - Frequência de compras (dias únicos)

---

## 🌓 Suporte a temas

A aplicação possui **suporte completo a temas claro e escuro**, adaptando-se automaticamente às configurações do sistema operacional.

- As cores são gerenciadas dinamicamente com base no tema atual
- Compatível com Android, iOS e Expo Go

---

## 🌍 Internacionalização (i18n)

- Suporte a múltiplos idiomas utilizando `i18n-js` e `expo-localization`
- Idiomas disponíveis:
  - Português (pt-BR)
  - Inglês (en-US)
- O idioma é detectado automaticamente com fallback para portugês

### Adicionando novos idiomas

Inclua um novo arquivo JSON em `src/i18n` e atualize a configuração.

Exemplo (`pt-BR.json`):
```json
{
  "login": "Entrar",
  "logout": "Sair"
}
```

---

## 🧪 Testes

> (Opcional) A aplicação está preparada para receber testes unitários e de integração.

---

## 📁 Estrutura de pastas

```
src/
├── assets/         # Splash, ícones e fontes
├── components/     # Componentes reutilizáveis
├── context/        # ClientsProvider
├── hooks/          # Custom hooks
├── apps/           # Rotas e páginas
├── services/       # Funções simuladas de API
├── types/          # Tipagens globais
└── constants/      # Constantes do projeto
```

---

## 👤 Autor

Desenvolvido por [Michel Gutner](https://github.com/MichelGutner) 🧸
