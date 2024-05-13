# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

para criação do banco de dados no docker roda-se:
`docker run -p 2222:5432 -e POSTGRES_PASSWORD=1234 postgres`

# Antes de Instalar qualquer coisa Leia o que segue abaixo:

## Não esqueça de configurar o banco de dados. criando o banco de dados, configurando os papeis e depois atualizar o arquivo data-source com as devidas configurações.

## Não esquecer de configurar o arquivo .env com senhas, chaves de acesso, etc.

Para criar uma nova migration:
`npm run typeorm migration:create ./src/database/migrations/CreateUsers`

Para Executar uma migration:
`npm run typeorm -- -d ./src/database/data-source.ts migration:run`

Scripts para extensões em Postgresql, Postgis e UUID:
1. Para o Postgis:
    '>sudo apt-get install postgis'
1.1 Para ativar no postgresql:
    '>CREATE EXTENSION postgis;'
2. Para UUID:
    '>sudo apt-get install postgresql-contrib'
2.1 Para ativar no postgresql:
    '>CREATE EXTENSION "uuid-ossp";
'

vai em client com cd 
e da um yarn i

vai em server com cd 
e da um yarn i


### Bom saber:
Reload vs code
Open the command palette (Ctrl + Shift + P) and execute the command:
    '>Reload Window'