FROM node:20.11

WORKDIR /src

# Copia package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Gera o cliente Prisma
RUN npx prisma generate

# Copia o diretório Prisma
COPY ./prisma ./prisma

# Copia os arquivos compilados do diretório 'dist'
COPY ./dist ./dist

# Expondo portas
EXPOSE 8000 

# Comando para executar sua aplicação TypeScript
CMD ["node", "dist/server.js"]
