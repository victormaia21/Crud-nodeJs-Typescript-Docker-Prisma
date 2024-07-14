# Iniciando o node.js

1.Iniciando com docker:<br>
`docker-compose up --build`

2.Iniciando localmente:<br>

- Abra seu pgAdmin e crie um banco de dados com um nome de sua preferencia
- Digite o comando `npm install`
- Digite o comando `npx prisma init`
- Digite o comando `npx prisma migrate dev` e faça a primeira migração
- Digite o comando `npm start`
- Crie um arquivo .env no diretorio principal e prencha-o como no exemplo abaixo

```
DATABASE_URL="mysql://name:password@localhost:3306/database_name"

PORT=3000

TOKEN_SECRET="TOKEN_PASSWORD"

DATABASE_USERNAME="USERNAME"
DATABASE_PASSWORD="PASSWORD"
DATABASE_PORT=3306
DATABASE_NAME="DATABASE_NAME"
```

- Depois vá para a documentação no swagger http://localhost:3000/api/v1/docs
