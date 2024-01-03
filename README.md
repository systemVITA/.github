# REDE PARA CAPTAÇÃO DE DADOS VINDOS DE VENTILADOR VITA  [VITA](https://github.com/orgs/systemVITA/repositories). 

Projeto de uma rede para extração de dados de um Arduino Rev2 microcontrolador do ventilador VITA.

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

