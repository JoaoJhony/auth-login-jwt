# 🔐 Auth Login JWT

Sistema de autenticação com JWT desenvolvido como base para projetos futuros com banco de dados.

## 🎯 Objetivo

Treinar o fluxo completo de autenticação — do front-end ao back-end — com foco em boas práticas de segurança. Este projeto é a **Parte 1** de uma série, onde a próxima etapa integrará um banco de dados real (PostgreSQL) em sistemas como controle de estoque ou academia.

## 🚀 Tecnologias

- **HTML + Tailwind CSS** — interface de login responsiva
- **JavaScript** — validação de inputs com Regex e integração com a API via Fetch
- **FastAPI** — API REST em Python
- **Pydantic** — validação de dados no backend
- **Python-Jose** — geração e verificação de tokens JWT
- **python-dotenv** — variáveis de ambiente

## 🔒 Segurança implementada

- Validação de input no front com Regex
- Validação de dados no back com Pydantic
- Token JWT armazenado em cookie HttpOnly
- Chave secreta via variável de ambiente (.env)
- CORS configurado

## ⚙️ Como rodar localmente

**Pré-requisitos:** Python 3.10+

**1. Clone o repositório**

```bash
git clone https://github.com/JoaoJhony/auth-login-jwt.git
cd auth-login-jwt
```

**2. Instale as dependências**

```bash
pip install fastapi uvicorn python-jose python-dotenv
```

**3. Crie o arquivo .env**

SECRET_KEY=sua_chave_secreta
ALGORITHM=HS256

**4. Rode o servidor**

```bash
uvicorn main:app --reload
```

**5. Abra o front**

Abra o `index.html` no navegador e acesse `http://127.0.0.1:8000/docs` para testar a API.

## 📌 Observações

- O usuário está mockado no código — em produção será substituído por consulta ao banco de dados
- Este projeto é parte de um roadmap de aprendizado pessoal

## 🗺️ Próximos passos

- [ ] Integração com PostgreSQL
- [ ] Sistema de cadastro de usuários
- [ ] Permissões admin vs usuário comum
- [ ] Projeto completo: controle de estoque ou academia
