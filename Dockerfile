# Escolha a imagem do Node.js
FROM node:18.17.1-alpine

# Criar diretório app
WORKDIR /app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN yarn

# Copia os arquivos do projeto
COPY . .

# Expõe a porta que a aplicação NestJS vai rodar (por padrão 3000)
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["yarn", "run", "start:dev"]