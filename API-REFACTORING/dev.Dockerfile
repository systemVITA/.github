# Use the official Node.js image as base
FROM node:16

# Set the working directory

WORKDIR /src/app


COPY ./prisma ./prisma

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY tsconfig.json ./

# Install dependencies
RUN npm install


# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

EXPOSE 8000

# prisma studio
EXPOSE 5555

# Command to run your application
CMD ["npm", "start"]
