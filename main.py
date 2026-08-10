# Framework web para criar APIs em Python de forma rápida e moderna
from fastapi import FastAPI, HTTPException

# Middleware para liberar requisições de origens diferentes (ex: front acessando o back)
from fastapi.middleware.cors import CORSMiddleware

# Classe para construir respostas HTTP personalizadas (ex: definir cookies)
from fastapi.responses import JSONResponse

# Biblioteca para gerar e verificar tokens JWT
from jose import jwt

# Classe base para criar modelos de validação de dados que chegam na API
from pydantic import BaseModel

#Importando a chave e o algoritmo para o JWT do .env
from dotenv import load_dotenv
import os
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

app = FastAPI()

origins = ["*"]

# Middleware para liberar requisições de origens diferentes (ex: front acessando o back)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Verificando a conexão com a API
@app.get("/")
async def root():
    return{"message":"Conectado!"}

# Usuário fictício para fins de teste e demonstração
# Em produção, substituir por consulta ao banco de dados (ex: PostgreSQL) 
usuarioFake = {"username": "JoaoSilva", 
               "password": "Senhacorreta123@!"}

#Modelo base a ser seguido, pratica de uso do pydantic e para transmissão correta do JSON
class User(BaseModel):
    username: str
    password: str

# Rota de login — recebe as credenciais do front via POST
@app.post("/login")
async def login(user:User):
    # Usuário recebido da requisição
    usuarioLogin = user

       # Verificando se usuário ou senha são diferentes das credenciais cadastradas
    if (usuarioLogin.username != usuarioFake.get('username') or usuarioLogin.password != usuarioFake.get('password')):
        # Credenciais inválidas — retorna 401 Unauthorized
        raise HTTPException(status_code=401, detail="Credenciais invalidas")

   # Credenciais corretas — monto o payload sem a senha por segurança
    payload = {
            "sub": user.username
    }

    #Gero token com base no payload + secret key + algotigmo
    token = jwt.encode(payload, SECRET_KEY, ALGORITHM)
    response = JSONResponse(content={"message": "Login bem sucedido"})

    # Armazeno o token em cookie HttpOnly — JS não consegue acessar, mais seguro
    response.set_cookie(
        key="token",
        value=token,
        httponly=True
    )
    return response
    