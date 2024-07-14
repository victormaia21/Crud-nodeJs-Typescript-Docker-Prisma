# Iniciando o node.js

- Iniciando com docker:<br>

  1. Crie um arquivo .env no diretorio principal e prencha-o como no exemplo abaixo

  ```
  DATABASE_URL="mysql://name:password@localhost:3306/database_name"

  PORT=3000

  TOKEN_SECRET="TOKEN_PASSWORD"

  DATABASE_USERNAME="USERNAME"
  DATABASE_PASSWORD="PASSWORD"
  DATABASE_PORT=3306
  DATABASE_NAME="DATABASE_NAME"
  ```

  2. Digite o comando `docker-compose up --build`

  3. Depois vá para a documentação no swagger http://localhost:3000/api/v1/docs

- Iniciando localmente:<br>

  1. Abra seu MySql e crie um banco de dados com um nome de sua preferencia
  2. Digite o comando `npm install`
  3. Digite o comando `npx prisma migrate dev` e faça a primeira migração
  4. Digite o comando `npm start`
  5. Crie um arquivo .env no diretorio principal e prencha-o como no exemplo abaixo

  ```
  DATABASE_URL="mysql://name:password@localhost:3306/database_name"

  PORT=3000

  TOKEN_SECRET="TOKEN_PASSWORD"

  DATABASE_USERNAME="USERNAME"
  DATABASE_PASSWORD="PASSWORD"
  DATABASE_PORT=3306
  DATABASE_NAME="DATABASE_NAME"
  ```

  6. Depois vá para a documentação no swagger http://localhost:3000/api/v1/docs
