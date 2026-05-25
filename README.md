# Laboratório de Programação

Projeto desenvolvido utilizando React + Vite no frontend e Django REST Framework no backend.

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

---

# Como Executar o Projeto

## Pré-requisitos

Antes de começar, é necessário ter instalado:

* Node.js
* Python 3.12+
* Git

---

# Executando o Backend (Django)

## 1. Criar ambiente virtual

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 2. Instalar dependências

```bash
pip install -r requirements.txt
```

---

## 3. Entrar na pasta do backend

```bash
cd backend
```

---

## 4. Executar as migrações

```bash
python manage.py migrate
```

---

## 5. Criar um superusuário (opcional)

```bash
python manage.py createsuperuser
```

---

## 6. Iniciar o servidor Django

```bash
python manage.py runserver
```

O backend estará disponível em:

```text
http://127.0.0.1:8000/
```

---

# Executando o Frontend (React + Vite)

Abra outro terminal na raiz do projeto.

## 1. Instalar dependências

```bash
npm install
```

---

## 2. Executar o frontend

```bash
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173/
```

---

# Autenticação JWT

O projeto utiliza autenticação JWT.

## Login

Faça uma requisição POST para:

```text
http://127.0.0.1:8000/login/
```

### Body da requisição

```json
{
  "email": "seu_email",
  "password": "sua_senha"
}
```

### Resposta esperada

```json
{
  "message": "Login realizado com sucesso",
  "refresh": "TOKEN_REFRESH",
  "access": "TOKEN_ACCESS"
}
```

---

# Utilizando o Token no Postman

Nas rotas protegidas, utilize:

```text
Authorization: Bearer SEU_TOKEN
```

Ou configure na aba:

* Authorization
* Bearer Token

---

# Estrutura do Projeto

```text
Lab Programacao/
│
├── backend/          # Backend Django
├── src/              # Frontend React
├── public/           # Arquivos públicos
├── requirements.txt  # Dependências Python
├── package.json      # Dependências Node
└── README.md
```


