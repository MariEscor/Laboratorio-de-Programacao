# Laboratório de Programação

Projeto desenvolvido utilizando React + Vite no frontend e Django REST Framework no backend. A aplicação é totalmente conteinerizada, garantindo que rode de forma idêntica em qualquer ambiente.

## Tecnologias Utilizadas

### Frontend
* React
* Vite
* React Router DOM
* React Icons

### Backend
* Django
* Django REST Framework
* JWT Authentication
* CORS Headers
* PostgreSQL

### Infraestrutura
* Docker
* Docker Compose

---

# Como Executar o Projeto

## Pré-requisitos

Como o projeto utiliza containers, você **não** precisa ter o Node.js, Python ou PostgreSQL instalados na sua máquina. É necessário apenas ter:

* **[Git](https://git-scm.com/)**
* **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (ou Docker Engine + Docker Compose)

---

## Passo a Passo para Execução

### 1. Configurar as Variáveis de Ambiente
Na raiz do projeto, existe um arquivo chamado `.env.example`. Ele serve como um modelo para as credenciais do sistema.

1. Faça uma cópia do arquivo `.env.example` e renomeie a cópia para `.env`.
2. Abra o novo arquivo `.env` e preencha com uma senha da sua escolha para o banco de dados.

### 2. Subir a Infraestrutura (Containers)
Abra o terminal na raiz do projeto e execute:

```bash
docker compose up --build

```

*Dica: O Docker fará o download das imagens, instalará as dependências e **aplicará as migrações do banco de dados automaticamente**. As próximas execuções levarão apenas alguns segundos. Se quiser rodar em segundo plano, adicione `-d` ao final do comando.*

### 3. Criar um Superusuário (Opcional)

Com os containers rodando, caso queira acessar o painel de administração do Django, abra um **novo terminal** e crie um usuário admin:

```bash
docker compose exec backend python manage.py createsuperuser

```

---

## 🌐 Serviços Disponíveis

Após executar os passos acima, a aplicação estará disponível nos seguintes endereços:

* **Frontend (React):** http://localhost:5173
* **Backend (API Django):** http://localhost:8000/api/
* **Banco de Dados (PostgreSQL):** `localhost:5432`

---

# Autenticação JWT

O projeto utiliza autenticação via tokens JWT para rotas protegidas.

## Login

Faça uma requisição POST para:

```text
[http://127.0.0.1:8000/login/](http://127.0.0.1:8000/login/)

```

### Body da requisição (JSON)

```json
{
  "email": "seu_email@exemplo.com",
  "password": "sua_senha"
}

```

### Resposta esperada

```json
{
  "message": "Login realizado com sucesso",
  "refresh": "TOKEN_REFRESH_GERADO",
  "access": "TOKEN_ACCESS_GERADO"
}

```

---

# Utilizando o Token no Postman / Insomnia

Para acessar rotas protegidas da API, inclua o token JWT no cabeçalho (Header) da sua requisição:

```text
Authorization: Bearer SEU_TOKEN_ACCESS

```

Ou configure diretamente na aba **Auth**:

* Type: `Bearer Token`
* Token: `[cole o token access aqui]`

---

# Como Executar os Testes

O projeto conta com uma suíte de testes automatizados para garantir a integridade das regras de negócio e da API.

Com os containers em execução (`docker compose up`), abra um **novo terminal** na raiz do projeto e execute o comando abaixo:

```bash
docker compose exec backend python manage.py test

```

# Estrutura do Projeto

```text
Lab Programacao/
│
├── backend/          # Backend Django (Dockerfile, requirements.txt, views, etc)
├── frontend/         # Frontend React (Dockerfile, package.json, src, etc)
├── .env.example      # Template de variáveis de ambiente (seguro para o GitHub)
├── .gitignore        # Arquivos e pastas ignorados pelo Git
├── docker-compose.yml# Orquestrador dos containers (Front, Back e Banco)
└── README.md         # Documentação do projeto
