# Étape 1 : Build du code
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : Serveur web de production
FROM nginx:alpine

# Copie du build frontend vers le répertoire Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration du reverse proxy Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]