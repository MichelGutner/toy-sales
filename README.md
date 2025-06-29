# 🧸 Toy Sales - Frontend

Aplicação mobile desenvolvida em React Native para o desafio técnico da loja de brinquedos **Toy Sales**.

## 📋 Sumário

- [🔧 Tecnologias utilizadas](#-tecnologias-utilizadas)
- [🚀 Como rodar o projeto](#-como-rodar-o-projeto)
- [🧠 O que foi implementado](#-o-que-foi-implementado)
- [🔐 Autenticação](#-autenticação)
- [🔎 Search](#-autenticação)
- [📊 Estatísticas](#-estatísticas)
- [🧪 Testes (opcional)](#-testes-opcional)

---

## 🔧 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [RNChartsKit](https://github.com/indiespirit/react-native-chart-kit) - Gráficos
- [i18n/Localizaton](https://docs.expo.dev/guides/localization/#complete-example) - Internazionalização
- Context API - Gerenciamento de dados
- [Router](https://docs.expo.dev/versions/latest/sdk/router/) - Navegação
- ESLint + Prettier + Husky (opcional)

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js ≥ 18
- Yarn ou npm
- Expo CLI instalado globalmente:

```bash
npm install -g expo-cli
```

### Instalação

```bash
# Clone o projeto
git clone https://github.com/MichelGutner/toy-sales.git
cd toy-sales

# Instale as dependências
yarn install
```

### Executando o projeto

```bash
# Rode o projeto com Expo
yarn ios | yarn android
```

A aplicação abrirá o painel do Expo, onde você poderá escanear o QR Code com o app **Expo Go** ou executar em emulador Android/iOS.

---

## 🧠 O que foi implementado

### ✅ Funcionalidades

- **Cadastro de Clientes** (nome, e-mail, data de nascimento)
- **Listagem de Clientes com Normalização de Dados** (limpa dados duplicados/aninhados)
- **Splash screen e ícone personalizado**
- **Dashboard com Gráficos:**
  - Total de vendas por dia
  - Destaque para:
    - Cliente com maior volume de vendas
    - Cliente com maior média por venda
    - Cliente com maior frequência de compras
- **Campo extra de análise alfabética:**
  - Mostra a primeira letra do alfabeto que ainda **não aparece** no nome do cliente (ou '-' se todas estão presentes)

---

## 🔐 Autenticação

- O login é realizado por e-mail e senha cadastrados

---

## 🔎 Search

- Implementado sistema de busca com priorização: os resultados com maior correspondência aparecem primeiro, enquanto os menos relevantes são exibidos abaixo. Caso não haja caracteres em comum, os itens são filtrados e excluídos da listagem.

---

## 📊 Estatísticas

Na rota de dashboard, foram consumidas (via mock) as rotas de estatísticas:

- **Total de vendas por dia** (para gráfico)
- **Top clientes por:**
  - Volume de vendas
  - Média de vendas
  - Frequência de compras (dias únicos com vendas)

---

## 📎 Mock de APIs

A API foi completamente simulada no frontend com base nas exigências do teste técnico:

- **Clientes com dados duplicados e aninhados**
- **Filtros por nome e e-mail**
- **Respostas baseadas no JSON informado no desafio**
- **Dados salvos em memória via mock**

---

A aplicação foi desenvolvida com suporte a múltiplos idiomas utilizando a biblioteca de [i18n/Localization](https://docs.expo.dev/guides/localization/#complete-example).

### Idiomas suportados

- Português (pt-BR)
- Inglês (en-US)

### Como funciona

- O idioma é detectado automaticamente com base nas configurações do dispositivo.
- Caso o idioma do dispositivo não seja suportado, o padrão será **Inglês**.

### Adicionando novos idiomas

Para adicionar novos idiomas, basta incluir os arquivos de tradução na pasta `i18n` e configurar os textos no formato JSON.

Exemplo de arquivo de tradução (`pt-BR.json`):

```json
{
  "login": "Entrar",
  "logout": "Sair"
}
```

## 🧪 Testes (opcional)

---

## 📁 Estrutura de pastas

```
src/
├── assets/            # Splash screen, ícones, fontes
├── components/        # Componentes reutilizáveis
├── context/           # ClientsProvider
├── hooks/             # Custom hooks
├── apps/              # Rotas e páginas
├── services/          # Funções de API
├── types/             # Tipagens globais
└── constants/         # Contants globais
```

---

## 👤 Autor

Desenvolvido por [Seu Nome](https://github.com/seu-usuario)
