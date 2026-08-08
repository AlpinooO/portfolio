# Étape 1 : Build du frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
# Copier la configuration personnalisée Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copier les fichiers statiques du build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]