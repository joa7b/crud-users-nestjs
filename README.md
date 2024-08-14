## Descrição

CRUD simples de usuários

## Recursos

 - Node 20.x
 - Nestjs
 - TypeORM
 - MySQL
 - class-validator
 - class-transformer
 - Typescript
 - Docker

## Rodar o projeto em desenvolvimento

```bash
# docker compose vai iniciar um container com uma imagem do mySQL
# Para executar o projeto com Docker siga os seguintes passos com o Docker iniciado.
$ docker compose up -d
$ chmod +x setup.sh
$ ./setup.sh
$ npm run start

# Para iniciar o projeto com mySQL local, siga os seguintes passos com o mySQL iniciado.
$ npm install
$ npm run db:create
$ npm run migration:run
$ npm run start
```

## Testes unitários

```bash
# unit tests
$ npm run test
```

## Observações
Projeto construido por João Peretti.
