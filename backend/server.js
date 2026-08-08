import express from "express";
import cors from "cors";
import "dotenv/config";
import projectsRouter from "./routes/projects.js";
import contactRouter from "./routes/contact.js";
import cvRouter from "./routes/cv.js";
import nexusMachinaRouter from "./routes/nexusMachina.js";
import efreiMotorsportRouter from "./routes/efreiMotorsport.js";
import experienceRouter from "./routes/experience.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de la sécurité de base
app.disable("x-powered-by");
app.set("trust proxy", 1);

// Middleware de sécurité (headers HTTP)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// Ajout des domaines de production dans les origines autorisées
const defaultOrigins = [
  "http://localhost",
  "http://localhost:5173",
  "http://leo-malgonne.fr",
  "https://leo-malgonne.fr",
  "http://www.leo-malgonne.fr",
  "https://www.leo-malgonne.fr",
  "http://86.247.98.228",        
  "https://86.247.98.228"        
];

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
  : defaultOrigins;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.includes(origin) || 
                        origin.includes("leo-malgonne.fr") || 
                        origin.includes("86.247.98.228");

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error("Origine non autorisée"));
    },
    methods: ["GET", "POST"],
  })
);

// Body parser
app.use(express.json({ limit: "20kb" }));

// Route de santé (Healthcheck)
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Routes API
app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/cv", cvRouter);
app.use("/api/nexus-machina", nexusMachinaRouter);
app.use("/api/efrei-motorsport", efreiMotorsportRouter);
app.use("/api/experience", experienceRouter);

app.listen(PORT, () => {
  console.log(`API disponible sur le port ${PORT}`);
});