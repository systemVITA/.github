## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:8000](http://localhost:3000) with your browser to see the result.


for created im use 
```bash
npm init -y
#and 
npm install <module>
#and 
npm run start
#or
npm run start:dev
#or
npm run build

```

require [Node.js](https://nodejs.org/),[yarn](https://yarnpkg.com/),Typescript compiler (tsc),[Git](https://git-scm.com/)

for created im use 
```bash
tsc --init

```
this command created file tsconfig.ts

 
```bash
npm install express

#and 

npm install cors

```

├─ 📁 node_modules/
├─ 📁 src/
│   └─ 📄 index.ts
├─ 📄  package.json
├─ 📄  tsconfig.json
└─ 📄  yarn.lock

if in archiqueture Model, View, Control, used this connection with database. in this project i'm use in model, an ORM for connection with database, the PRISMA ORM. Furthermore im use in model type interface and control services, repository. Finally, use database,mysql for mariaDB




NA APLICAÇÃO GERAL IREMOS UTILIZAR A SEGUINTE ARQUITETURA DE ARQUIOS 

├── backend
├── dev-env
└── frontend