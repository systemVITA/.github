# Projeto Vita-System - REDE PARA CAPTAÇÃO DE DADOS VINDOS DE VENTILADOR VITA  [VITA](https://github.com/orgs/systemVITA/repositories). ![VITA Logo](logo.png)

Projeto de uma rede para extração de dados de um Arduino Rev2 microcontrolador do ventilador VITA. sistema de controle e plataforma de recebimento de dados do VITA
O Projeto VITA é uma iniciativa que visa desenvolver um sistema embarcado inovador para o monitoramento e controle de dispositivos médicos, utilizando tecnologias de Internet das Coisas (IoT) e integração de hardware e software. O objetivo central é permitir um acompanhamento eficiente de dispositivos médicos, fornecendo uma interface gráfica amigável para visualização em tempo real, além de comunicação segura com um banco de dados para análise posterior.

## Características Principais

- Monitoramento em Tempo Real: Através da comunicação bidirecional entre o dispositivo médico e a interface web, os dados são apresentados em tempo real, possibilitando um acompanhamento preciso.

- Controle Remoto: O sistema permite o controle remoto do dispositivo médico por meio da interface gráfica, possibilitando ajustes em parâmetros e configurações.

- Armazenamento de Dados: Os dados coletados são armazenados de forma segura em um banco de dados ou arquivo CSV, permitindo análises futuras e a geração de relatórios.

- Tecnologias de Ponta: Utilização de protocolos MQTT e HTTP para a comunicação entre o hardware e a interface web, demonstrando o uso de tecnologias avançadas.

## Como Utilizar

1. **Instalação:**
   - Clone este repositório em sua máquina local.
   - Instale as dependências necessárias listadas no arquivo `requirements.txt`.

2. **Configuração:**
   - Siga as instruções na documentação do projeto para configurar o Access Point no Arduino Wi-Fi R2.

3. **Execução:**
   - Execute o servidor da interface gráfica executando o comando `python app.py`.
   - Acesse a interface web no navegador utilizando o endereço `http://localhost:3000`.

4. **Utilização:**
   - Visualize os dados em tempo real na interface gráfica.
   - Faça ajustes e controle o dispositivo médico remotamente.

## Contribuição

Contribuições são bem-vindas! Se você encontrou algum bug ou tem alguma sugestão de melhoria, por favor, abra uma issue ou envie um pull request.

## Créditos

Este projeto foi desenvolvido por Nerval Junior e faz parte de um trabalho acadêmico/pesquisa. Para mais informações, consulte os documentos e referências mencionados.

### ⚡️ Backend
- FastAPI para dados advindos do microcontrolador
- typescript com express
- mysql


### 🎨 Frontend
-next.js
- React.js



### 📄 License
MIT

Este projeto é licenciado sob a [Licença MIT](LICENSE).


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




## 📌 Planejamento
[![Tracking_Rede_Vita_System]()]()


## :computer: Modelo de Rede 
![image]()


## 🚀 Começando

### 📋 Pré-requisitos

```
 Arduino Rev2 or ESP32 or ESP8266
```

# API em Node.js para uso em Container Docker

## Objetivo

Exemplo simples e didático de como rodar uma aplicação **Node.js** dentro de um container **Docker** para complementar a explicação da apresentação sobre VM.

## 🚀  📋 Instruções Para a Construção dos Containers

1 - ⚙️ Crie uma REDE para conectar os Containers --name da rede - REDE

``` 
docker network create REDE 
```

2 - 📦 Crie um VOLUME para permanercer os dados do mysql mesmo se o Container for destruido

```
docker volume create VOL1
```

3 - 🛠️ Crie um Container para o MYSQL colonaco ele na REDE e acessando o VOLUME e expondo a porta 3306, definindo uma seha para o root e uma base de dados

```
docker run -d -P --name db_mysql -p 3308:3306 -v VOL1:/var/lib/mysql -h db --network REDE -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=myDB mysql
```

4 - 🛠️ Cria um Container para o PHPMYADMIN colocando ele na REDE e conectando no Container do mysql, expondo a porta 8080

```
docker run -d -P --name admin_mysql -h myadmin --network REDE --link db_mysql:db -p 8080:80 phpmyadmin
```

5 - Rode o comando dentro da pasta cd ./api_node_docker, vai ser criada uma imagem do diretorio atual e intanciado um Container Node, expondo a porta 3000

```
docker-compose up -d --build
```

obs - Rodando o comando dentro da pasta cd ./api_node_docker, vai apagar o container my_node e a imagem grerada, que pode ser gerada novamente com o comando acima

```
docker-compose down --rmi all
```

-expoe os logs do Container my_node pra verificações
```
docker logs my_node
```


6 - 🛠️ Adiciona o Container my_node na REDE -  já pode acessar a url (http://localhost:3000)

```
docker network connect REDE my_node
```



## 📌 Versão

Nós usamos [GitHub](https://github.com) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/orgs/systemVITA/repositories). 

## ✒️ Autores


* **Nerval** - *Documentação - Dev - Engenheiro* - [PERFIL](https://github.com/nervaljunior)

## 📄 Licença

Este projeto está sob a licença (Copyright (c) 2023 Antonio Marcos Patricio Castro) - veja o arquivo [LICENSE.md]() para detalhes.

## 🎁 Expressões de gratidão

* Conte a outras pessoas sobre este projeto 📢;
* Convide alguém da equipe para uma cerveja 🍺;
* Um agradecimento publicamente 🫂;


## adicionar o arquivo para configuração do nginx

```
server {
  listen 5000;

  location / {
    proxy_pass http://frontend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
  }

  location /api {
    proxy_pass http://api:8000;
  }
}
```



## Docker Compose - orquestrando os containeres

```
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: database
    volumes:
      - db_data:/var/lib/postgresql/data

  api:
    depends_on:
      - db
    build:
      context: ../backend
      dockerfile: dev.Dockerfile
    image: dev-api
    env_file:
      - ../backend/.env
    volumes:
      - type: bind
        source: ../backend/src
        target: /app/src
    ports:
      - 3500:3500
      - 5555:5555 # enable prisma studio access

  frontend:
    depends_on:
      - api
    build:
      context: ../frontend
      dockerfile: dev.Dockerfile
    image: dev-frontend
    volumes:
      - type: bind
        source: ../frontend/src
        target: /app/src
      - type: bind
        source: ../frontend/public
        target: /app/public
      - type: bind
        source: ../frontend/styles
        target: /app/styles

  proxy:
    depends_on:
      - api
      - frontend
    build:
      context: ./
      dockerfile: proxy.Dockerfile
    image: dev-proxy
    ports:
      - 5000:5000
    logging:
      driver: none

volumes:
  db_data:

```

```
postgresql://<USERNAME>:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE>?schema=<SCHEMA>

```

No contexto do Docker Compose essa url fica, portanto, da seguinte forma:

```
postgresql://postgres:postgres@db:5432/database?schema=public

```


```
volumes:
  - type: bind
    source: ../backend/src
    target: /app/src
```



## Rodando o projeto

Tudo que é preciso para inicializar o projeto é ir na pasta dev-env e digitar no terminal:

```
docker-compose up
```
A opção --build pode ser usada se for necessário reconstruir alguma das imagens. A opção -d ou --detach pode ser usada para rodar a aplicação em segundo plano (por padrão, roda no terminal em que foi chamada)

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


# Projeto Arduino Rev2 - Sensor Data Envio MQTT

Este é um projeto Arduino que envia dados de sensores via MQTT para um servidor. O código utiliza a biblioteca WiFiNINA para conectar-se à rede Wi-Fi e a biblioteca PubSubClient para comunicação MQTT. Além disso, é feito uso da biblioteca ArduinoJson para manipulação de objetos JSON.

## Requisitos

- Arduino Uno Rev2 ou dispositivo compatível
- Sensor de dados (simulado por valores aleatórios no exemplo)
- Acesso a um servidor MQTT

## Configuração

1. **Bibliotecas Necessárias:**
   Certifique-se de ter as bibliotecas necessárias instaladas. Elas podem ser instaladas através do Arduino IDE, utilizando o Gerenciador de Bibliotecas.
   - Wire.h
   - WiFiNINA.h
   - PubSubClient.h
   - ArduinoJson.h

2. **Conexão à Rede Wi-Fi e MQTT:**
   Edite o arquivo `secrets.h` com as credenciais da sua rede Wi-Fi e do servidor MQTT.

```cpp
// secrets.h
#define ssid "NomeDaRedeWiFi"
#define password "SenhaDaRedeWiFi"
#define mqtt_server "EnderecoDoServidorMQTT"
#define mqtt_port 1883
#define mqtt_user "UsuarioMQTT"
#define mqtt_password "SenhaMQTT"
```

## Funcionamento

O programa realiza as seguintes ações:

1. Conecta-se à rede Wi-Fi.
2. Estabelece conexão com o servidor MQTT.
3. No loop principal, gera dados simulados e os encapsula em um objeto JSON.
4. Publica o objeto JSON no tópico "messages" do servidor MQTT.

Os dados simulados incluem ID, Volume Corrente, Razão IE, Frequência e Fluxo Médio.
