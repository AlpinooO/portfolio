# ─────────────────────────────────────────────
# Étape 1 — Build du frontend (React + Vite)
# ─────────────────────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Copie des dépendances en premier (cache Docker)
COPY frontend/package*.json ./
RUN npm ci

# Copie du code source et build
COPY frontend/ ./
RUN npm run build
# Le résultat est dans /app/frontend/dist


# ─────────────────────────────────────────────
# Étape 2 — Build du backend (Node/Express)
# ─────────────────────────────────────────────
FROM node:20-alpine AS backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/ ./


# ─────────────────────────────────────────────
# Étape 3 — Image finale
# ─────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Backend
COPY --from=backend-build /app/backend ./backend

# Frontend buildé (servi par le backend ou nginx)
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Variables d'environnement par défaut (à surcharger via docker run -e ou .env)
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Démarre le serveur Express
CMD ["node", "backend/server.js"]