# App MarketPlace - API desenvolvida em NODE.JS - no BootCamp Rocketseat

Aplicação desenvolvida em NODE.JS
Uma API desenvolvida durante o curso, que manipula usuários, ,sessões, anúncios e interesse de compra(Via email), não possui carrinho de compras ou metodos de checkout.

API simples, somente para aprendizado, contemplando: conexão com DB(mongo), rotas, session, middlewares, Envio de email, Fila de processamento, captura de erros(desenvolvimento e produção) entre outras caracteristicas.

### Requisitos

Ambiente de desenvolvimento para node.js instalado.
Redis(Para fila de jobs)
Mongo DB
[Projeto no Sentry](https://sentry.io), para captura de erros em produção

### Instalação

Clone o repositório

`git clone https://github.com/vieweg/bootcamp-desafios-appmarket.git`

Acesse o diretório

`cd bootcamp-desafios-marketplace`

Instale as dependências

`yarn install`

Renomeie o arquivo `.env.example` para `.env` e efetue os ajustes confome necessário

Execute o servidor

`yarn start`

### Utilização

Utilize o insomnia, para simular as requisições a API

Rotas (Partindo da base `http://localhost:3001`)

| METODO | URI       | DESCRIÇÃO                |
| :----: | --------- | ------------------------ |
|  GET   | /users    | Lista usuarios           |
|  POST  | /users    | Cria Usuario             |
|  POST  | /sessions | Inicia sessão, obtem JWT |
|  GET   | /ads      | Obter Lista de Anuncios  |
|  GET   | /ads/:id  | Exibe anuncio :id        |
|  POST  | /ads      | Cria Anuncio             |
|  PUT   | /ads/:id  | Update anuncio :id       |
| DELETE | /ads/:id  | Remove anuncio :id       |
|  POST  | /purchase | Simula pedido de compra  |

- Inicie criando um usuário, no body da requisição crie um json contendo: nome, email e password.
- Inicie uma sessão com o usuario recem criado, passando na body da requisição um json contendo: email e password.
  Guarde o token da sessão, pois as demais chamadas necessitam autenticação Bearer Token.
- Para criar um anuncio, passe na body um json contendo: title, description e price.
- Para simular um pedido, passe na body um json contendo: ad e content, sendo ad o id de um anuncio e content uma mensagem qualquer.
