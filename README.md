# BioCalc - Calculadora de Sustentabilidade

Sistema web para cálculo de indicadores de sustentabilidade em projetos de biomassa e produção industrial. Frontend desenvolvido em React com TypeScript.

## Descrição do Projeto

BioCalc é uma aplicação frontend que permite às empresas calcularem e gerenciarem indicadores de sustentabilidade relacionados ao uso de biomassa em processos industriais. O sistema guia o usuário através de múltiplas etapas de coleta de dados, desde a identificação do projeto até o cálculo final de resultados.

## Tecnologias Utilizadas

### Core
- **React 19.2.0** - Biblioteca principal para construção da interface
- **TypeScript 5.9.3** - Tipagem estática
- **Vite 7.2.4** - Build tool e dev server
- **React Router DOM 7.9.6** - Gerenciamento de rotas

### Estado e API
- **Redux Toolkit 2.10.1** - Gerenciamento de estado global
- **React Redux 9.2.0** - Integração React com Redux
- **RTK Query** - Gerenciamento de requisições API

### Estilização
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **Sass 1.94.2** - Pré-processador CSS
- **PostCSS 8.5.6** - Transformação de CSS
- **Lucide React 0.554.0** - Biblioteca de ícones
- **Font Awesome 7.1.0** - Ícones adicionais

### Internacionalização
- **i18next 25.6.3** - Framework de internacionalização
- **react-i18next 16.3.5** - Integração com React

### Utilidades
- **Lodash 4.17.21** - Funções utilitárias JavaScript

### Qualidade de Código
- **ESLint 9.39.1** - Linter JavaScript/TypeScript
- **Prettier 3.6.2** - Formatador de código
- Plugins ESLint para React, hooks, a11y e import

## Estrutura do Projeto

```
biocalc/
├── src/
│   ├── pages/
│   │   ├── LoginPage.tsx              # Página de autenticação
│   │   ├── RegisterPage.tsx           # Registro de novos usuários
│   │   ├── DashboardPage.tsx          # Dashboard principal
│   │   ├── UserProfilePage.tsx        # Perfil do usuário
│   │   ├── MainLayout.tsx             # Layout base com navegação
│   │   └── calculator/
│   │       ├── CalculatorOrchestrator.tsx  # Orquestrador do fluxo de cálculo
│   │       └── steps/
│   │           ├── StepIdentification.tsx   # Etapa 1: Identificação do projeto
│   │           ├── StepBiomass.tsx          # Etapa 2: Dados de biomassa
│   │           ├── StepAgricultural.tsx     # Etapa 3: Fase agrícola
│   │           ├── StepIndustrial.tsx       # Etapa 4: Fase industrial
│   │           ├── StepLogistics.tsx        # Etapa 5: Logística
│   │           └── StepResults.tsx          # Etapa 6: Resultados
│   ├── services/
│   │   ├── authApi.ts                 # Serviço de autenticação
│   │   └── ApiService.ts              # Serviço de projetos (RTK Query)
│   ├── store/
│   │   └── store.ts                   # Configuração do Redux Store
│   ├── Types/
│   │   └── Types.ts                   # Definições de tipos TypeScript
│   ├── components/
│   │   └── GenericComponents.tsx      # Componentes reutilizáveis
│   ├── mock/
│   │   └── mockedData.ts              # Dados mockados para desenvolvimento
│   ├── assets/                        # Recursos estáticos
│   ├── App.tsx                        # Componente raiz
│   ├── AppRoutes.tsx                  # Definição de rotas
│   ├── main.tsx                       # Ponto de entrada da aplicação
│   └── index.css                      # Estilos globais
├── public/                            # Arquivos públicos estáticos
├── vite.config.ts                     # Configuração do Vite
├── tailwind.config.js                 # Configuração do Tailwind CSS
├── tsconfig.json                      # Configuração do TypeScript
├── eslint.config.js                   # Configuração do ESLint
└── package.json                       # Dependências e scripts
```

## Funcionalidades Principais

### Autenticação
- Login de usuários
- Registro de novas contas com informações empresariais (nome, email, CNPJ)
- Gerenciamento de perfil de usuário

### Calculadora Multi-Etapas
O sistema guia o usuário através de etapas sequenciais para coleta de dados:

1. **Identificação**: Dados do projeto e empresa (nome, CNPJ, responsável técnico, localização)
2. **Biomassa**: Tipo de biomassa utilizada, consumo e entrada de amido
3. **Agrícola**: Dados de transporte e produção agrícola (pulado automaticamente se for resíduo)
4. **Industrial**: Consumo de eletricidade, combustíveis e água
5. **Logística**: Distâncias, modais de transporte e exportação
6. **Resultados**: Cálculo e exibição dos indicadores de sustentabilidade

### Dashboard
- Visualização de projetos
- Acesso rápido à calculadora
- Navegação entre seções

### Lógica de Negócio
- Pulo automático da fase agrícola quando a biomassa é classificada como resíduo
- Validação de dados entre etapas
- Salvamento de progresso
- Cálculo de resultados baseado nos dados coletados

## Configuração e Instalação

### Pré-requisitos
- Node.js (versão compatível com React 19)
- npm ou yarn

### Instalação

```bash
# Navegar para o diretório do projeto
cd biocalc

# Instalar dependências
npm install
```

### Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Build de produção
npm run build

# Preview do build de produção
npm run preview

# Lint do código
npm run lint
```

## Configuração do Ambiente

### Servidor de Desenvolvimento
- Porta: 3000
- Host: configurado para aceitar conexões externas
- Base URL: `/biocalc`

### API Backend
O frontend está configurado para conectar com uma API REST em:
- URL Base: `http://localhost:8000`
- Autenticação via Bearer Token (armazenado no localStorage)

### Endpoints Principais
- `POST /register` - Registro de usuários
- `POST /login` - Autenticação
- `POST /projects/` - Criar projeto
- `PUT /projects/{id}/step/{step}` - Atualizar etapa do projeto
- `POST /projects/{id}/calculate` - Calcular resultados
- `GET /projects/{id}` - Buscar projeto

## Tipos de Dados

### BiomassType
Tipos de biomassa suportados:
- Resíduo de Pinus
- Resíduo de Eucaliptus
- Casca de Amendoim
- Bagaço de Cana
- Cavaco de Madeira
- Outros

### Estrutura de Dados do Projeto
O projeto mantém dados estruturados em seções:
- `identification`: Dados de identificação
- `biomass`: Informações sobre biomassa
- `agricultural`: Dados agrícolas
- `industrial`: Dados industriais
- `logistics`: Informações logísticas
- `production`: Volume de produção

## Roteamento

### Rotas Públicas
- `/login` - Página de login
- `/register-account` - Página de registro

### Rotas Protegidas (MainLayout)
- `/dashboard` - Dashboard principal
- `/calculator` - Calculadora de sustentabilidade
- `/projects` - Meus projetos (em construção)
- `/profile` - Perfil do usuário

## Estilização

O projeto utiliza uma combinação de:
- Tailwind CSS para utilitários e layout responsivo
- Cores customizadas da paleta emerald e slate
- Componentes genéricos reutilizáveis (Button, Card, Modal)
- Ícones do Lucide React e Font Awesome

## Estado Global

Gerenciado através do Redux Toolkit com:
- Store configurado com middleware para RTK Query
- APIs separadas por contexto (auth e projetos)
- Cache e invalidação automática de dados
- Integração com React através do Provider

## TypeScript

Projeto totalmente tipado com:
- Configuração strict mode habilitada
- Path aliases configurados (`@/*` aponta para `./src/*`)
- Tipos customizados definidos em `Types/Types.ts`
- Target ES2022 com suporte a DOM

## Build

O projeto usa Vite com:
- Plugin React SWC para fast refresh
- Plugin tsconfig-paths para resolução de aliases
- Suporte a top-level await
- Base path configurada para `/biocalc`

## Contribuição

Este projeto segue padrões de código estabelecidos através de:
- ESLint com regras para React, TypeScript e acessibilidade
- Prettier para formatação consistente
- TypeScript strict mode para segurança de tipos
