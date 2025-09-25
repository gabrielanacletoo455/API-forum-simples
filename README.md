# 🚀 DevConnect API - Fórum de Desenvolvedores

> **API REST para fórum de desenvolvedores criada para fins de estudo e prática com React Native**

Uma API completa e funcional para um fórum de desenvolvedores, construída com **NestJS**, **TypeScript** e **PostgreSQL**. Esta API foi desenvolvida como projeto de estudo para aprender React Native, fornecendo um backend robusto para uma aplicação mobile de fórum.

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Iniciar o Projeto](#-como-iniciar-o-projeto)
- [📚 Documentação da API](#-documentação-da-api)
- [🔗 Endpoints Disponíveis](#-endpoints-disponíveis)
- [🔐 Autenticação](#-autenticação)
- [📱 Estrutura do Projeto](#-estrutura-do-projeto)
- [🤝 Contribuindo](#-contribuindo)

## 🎯 Sobre o Projeto

Esta API foi criada para servir como backend para uma aplicação mobile de fórum de desenvolvedores. O objetivo principal é fornecer uma base sólida para estudos de React Native, oferecendo funcionalidades completas de um fórum moderno.

### ✨ Funcionalidades Principais

- **👥 Sistema de Usuários**: Cadastro, login, perfis e gerenciamento
- **📝 Posts**: Criação, edição, exclusão e listagem de posts
- **💬 Comentários**: Sistema completo de comentários nos posts
- **🔍 Busca**: Busca por posts e conteúdo
- **🔐 Autenticação**: JWT com controle de acesso baseado em roles
- **📱 Mobile-First**: API otimizada para aplicações mobile

## 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js para APIs
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **TypeORM** - ORM para TypeScript
- **JWT** - Autenticação e autorização
- **Swagger** - Documentação automática da API
- **Class Validator** - Validação de dados
- **Bcrypt** - Criptografia de senhas

## 🚀 Como Iniciar o Projeto

### 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

### 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd backDevConnect
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

4. **Configure o banco de dados**
```bash
# Configure as variáveis no arquivo .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=devconnect
```

5. **Execute as migrações**
```bash
npm run migration:run
# ou
yarn migration:run
```

6. **Inicie o servidor**
```bash
npm run start:dev
# ou
yarn start:dev
```

### 🌐 Acessando a API

- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api

## 📚 Documentação da API

### 🔗 Acessando o Swagger

Acesse a documentação interativa da API em:
```
http://localhost:3000/api
```

O Swagger fornece:
- 📖 Documentação completa de todos os endpoints
- 🧪 Interface para testar as rotas
- 📝 Exemplos de requests e responses
- 🔐 Teste de autenticação integrado

## 🔗 Endpoints Disponíveis

### 👥 **Usuários** (`/users`)
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Excluir usuário

### 🔐 **Autenticação** (`/auth`)
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de usuário

### 📝 **Posts** (`/posts`)
- `POST /posts` - Criar post (🔐 Autenticado)
- `GET /posts` - Listar todos os posts
- `GET /posts/search` - Buscar posts
- `GET /posts/my-posts` - Meus posts (🔐 Autenticado)
- `GET /posts/myposts/:id` - Posts por autor (🔐 Autenticado)
- `GET /posts/my-commented` - Posts que comentei (🔐 Autenticado)
- `GET /posts/:id` - Buscar post por ID
- `PATCH /posts/:id` - Atualizar post (🔐 Autenticado + Ownership)
- `DELETE /posts/:id` - Excluir post (🔐 Autenticado + Ownership/Admin)

### 💬 **Comentários** (`/comments`)
- `POST /comments` - Criar comentário (🔐 Autenticado)
- `GET /comments` - Listar todos os comentários
- `GET /comments/:id` - Buscar comentário por ID
- `PATCH /comments/:id` - Atualizar comentário (🔐 Autenticado + Ownership)
- `DELETE /comments/:id` - Excluir comentário (🔐 Autenticado + Ownership/Admin)

## 🔐 Autenticação

### 📝 Como Autenticar

1. **Registre um usuário**:
```bash
POST /auth/register
{
  "userName": "gabriel-dev",
  "email": "gabriel@dev.com",
  "password": "123456"
}
```

2. **Faça login**:
```bash
POST /auth/login
{
  "email": "gabriel@dev.com",
  "password": "123456"
}
```

3. **Use o token**:
```bash
Authorization: Bearer <seu_token_jwt>
```

### 🔑 Roles Disponíveis

- **`client`** - Usuário comum (padrão)
- **`admin`** - Administrador (acesso total)

## 📱 Estrutura do Projeto

```
src/
├── auth/                    # Autenticação e autorização
│   ├── decorators/         # Decorators customizados
│   ├── guards/             # Guards de autenticação
│   ├── jwt/                # Configuração JWT
│   └── dto/                # DTOs de autenticação
├── users/                  # Módulo de usuários
│   ├── entities/           # Entidade User
│   ├── dto/                # DTOs de usuário
│   └── docs/               # Documentação Swagger
├── posts/                  # Módulo de posts
│   ├── entities/           # Entidade Post
│   ├── dto/                # DTOs de post
│   └── docs/               # Documentação Swagger
├── comments/               # Módulo de comentários
│   ├── entities/           # Entidade Comment
│   ├── dto/                # DTOs de comentário
│   └── docs/               # Documentação Swagger
├── database/               # Configuração do banco
└── main.ts                 # Arquivo principal
```

## 🎯 Funcionalidades do Fórum

### 📝 **Posts**
- Criação de posts com título, conteúdo e imagem opcional
- Edição e exclusão (apenas pelo autor ou admin)
- Busca por título e conteúdo
- Listagem ordenada por data

### 💬 **Comentários**
- Comentários em posts
- Edição e exclusão (apenas pelo autor ou admin)
- Relacionamento com posts e usuários

### 👥 **Usuários**
- Perfil completo com informações pessoais
- Sistema de roles (client/admin)
- Gerenciamento de dados pessoais

### 🔍 **Busca**
- Busca por posts
- Filtros por autor
- Ordenação por relevância e data

## 🚀 Deploy

### 🌐 Vercel (Recomendado)

1. **Configure o banco de dados**:
   - Use um serviço como Supabase, Railway ou Neon
   - Configure as variáveis de ambiente

2. **Deploy automático**:
   - Conecte o repositório ao Vercel
   - Configure as variáveis de ambiente
   - Deploy automático a cada push

### 🐳 Docker (Opcional)

```bash
# Build da imagem
docker build -t devconnect-api .

# Executar container
docker run -p 3000:3000 devconnect-api
```

## 🤝 Contribuindo

Este é um projeto de estudo, mas sugestões e melhorias são bem-vindas!

### 📝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Gabriel** - Desenvolvedor Frontend Junior

- 📧 Email: [seu-email@dev.com]
- 💼 LinkedIn: [seu-linkedin]
- 🐙 GitHub: [seu-github]

---

## 📄 Licença

Este projeto é para fins de estudo e aprendizado. Sinta-se livre para usar como referência para seus próprios projetos!

---

<div align="center">

**🚀 Desenvolvido com ❤️ para aprendizado de React Native**

*"A melhor forma de aprender é fazendo!"*

</div>
