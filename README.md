# 📘 API de Achados e Perdidos
Esta API foi construída em objetivo de gerenciar um sistema de Achados e Perdidos, no **Bootcamp DFS 2025.1** 


## Tecnologias
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Autenticação e Segurança
![JWT](https://img.shields.io/badge/jwt-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Pré-requisitos

- Node.js (versão 16+ recomendada)
- PostgreSQL
- npm (ou yarn)

---

## Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/thebiatriz/BACK_achados-perdidos.git
cd BACK_achados-perdidos
```

### 3. Configure as variáveis de ambiente

- Renomeie o arquivo `.env.example` para `.env`:

- Edite o `.env` com os dados do seu banco PostgreSQL:

### 4. Sincronize o Prisma com o banco existente

```bash
npx prisma db pull
```

> Esse comando sincroniza o `schema.prisma` com a estrutura atual do banco de dados, sem a necessidade de criar ou rodar migrations.
Obs: Este projeto utiliza um banco de dados já existente. O comando acima serve apenas para gerar os modelos no Prisma com base nesse banco.

### 5. Inicie a aplicação

```bash
npm start
```

> A API ficará disponível em `http://localhost:8080` ou `http://localhost:8888`, dependendo da disponibilidade da porta.

---

## Estrutura do projeto 

```
📁 src/                 # Diretório principal da aplicação
│
├───📁 controllers/     # Controladores responsáveis pela lógica das rotas (CRUD, regras de negócio)
│
├───📁 database/        # Configuração do Prisma Client para permitir importações globais
│
├───📁 middlewares/     # Middlewares personalizados de autenticação
│
├───📁 routes/          # Arquivos de rotas da API (usuarios, categorias, itens, login, index.)
│
├───📄 server.js        # Arquivo principal que inicializa o servidor Express
```


## Testar a API

Use ferramentas como:
- **Insomnia**
- **Thunder Client (VS Code)**
- Próprio navegador para endpoints públicos.

---

### 📌 Endpoints da API

#### 🔐 Login
- `POST /api/login`  
  > Realiza a autenticação do usuário e retorna um token JWT.

---

#### 👤 Usuários

- `POST /api/usuarios`  
  > Cria um novo usuário (registro).

- `GET /api/usuarios`  
  > Lista todos os usuários.

- `GET /api/usuarios/email?email=exemplo@email.com`  
  > Busca um usuário pelo email.

- `GET /api/usuarios/:id`  
  > Retorna os dados de um usuário pelo ID.

- `PUT /api/usuarios`  
  > Atualiza os dados do usuário autenticado.  
  🔒 **Requer autenticação (JWT)**

- `DELETE /api/usuarios`  
  > Deleta o usuário autenticado.  
  🔒 **Requer autenticação (JWT)**

---

#### 🗂️ Categorias

- `POST /api/categorias`  
  > Cria uma nova categoria.  
  🔒 **Requer autenticação (JWT)**

- `GET /api/categorias`  
  > Lista todas as categorias.

- `GET /api/categorias/:id`  
  > Busca uma categoria pelo ID.

- `PUT /api/categorias/:id`  
  > Atualiza uma categoria específica.  
  🔒 **Requer autenticação (JWT)**

- `DELETE /api/categorias/:id`  
  > Deleta uma categoria específica.  
  🔒 **Requer autenticação (JWT)**

---

> Os endpoints protegidos requerem envio do token JWT no cabeçalho da requisição:
```http
Authorization: Bearer <token_gerado>
