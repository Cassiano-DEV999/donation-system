# Estágio 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código fonte
COPY . .

# Argumento de build para a URL da API (pode ser sobrescrito no docker-compose)
ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=$VITE_API_URL

# Executa o build (vai gerar a pasta /app/dist)
RUN npm run build

# Estágio 2: Servidor Nginx para produção
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nossa configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no estágio de build
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]