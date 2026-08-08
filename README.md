# Portfolio — Léo Malgonne

Architecture fullstack : API Node.js/Express + Frontend React (Vite + Tailwind).

## Démarrer en local

### Option rapide (recommandée) — tout en une commande
```bash
npm install
npm run install:all
cp backend/.env.example backend/.env   # puis renseigne RESEND_API_KEY (+ CONTACT_TO_EMAIL si besoin) pour le formulaire de contact
npm run dev
```
Ça lance le backend (http://localhost:3001) et le frontend (http://localhost:5173) en même temps, dans le même terminal.

### Option manuelle — deux terminaux séparés

**1. Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```
Le site tourne sur http://localhost:5173 (le proxy Vite redirige automatiquement /api vers le backend)

## Pages du site

- `/` — Accueil (hero + teasers)
- `/projets` — Grille de projets + carte spéciale vers Nexus Machina
- `/projets/nexus-machina` — Page dédiée, thème visuel Minecraft (CSS scoped dans `styles/nexus-machina.css`)
- `/professionnel` — Expériences en stage
- `/profil` — Compétences
- `/contact` — Formulaire de contact

## À personnaliser avant mise en ligne

- [ ] `backend/data/projects.json` — remplacer les 2 emplacements "⚠️ À compléter" par tes vrais projets
- [ ] `backend/data/experience.json` — compléter les missions des stages Paris Gastronomy Distribution et Travaux Rénovation Services
- [ ] `backend/data/nexus-machina.json` — ajuster si besoin (succès, compétences forgées)
- [ ] `frontend/src/components/Footer.jsx` — remplacer les liens GitHub/LinkedIn par les tiens
- [ ] `frontend/public/CV_Leo_Malgonne.pdf` — ajouter ton CV (voir `frontend/public/README_CV.txt`)
- [ ] `backend/.env` — configurer l'API mail (RESEND_API_KEY, RESEND_FROM_EMAIL si nécessaire, et éventuellement CONTACT_TO_EMAIL) pour le formulaire de contact

## Déploiement (gratuit)

- **Backend** → Render.com ou Railway.app (déploie le dossier `backend/`)
- **Frontend** → Vercel ou Netlify (déploie le dossier `frontend/`, penser à changer l'URL de l'API en prod dans `Projects.jsx` et `Contact.jsx`)
