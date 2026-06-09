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
