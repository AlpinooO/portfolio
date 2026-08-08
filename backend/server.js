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
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origine non autorisée"));
    },
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/cv", cvRouter);
app.use("/api/nexus-machina", nexusMachinaRouter);
app.use("/api/efrei-motorsport", efreiMotorsportRouter);
app.use("/api/experience", experienceRouter);

app.listen(PORT, () => {
  console.log(`API disponible sur http://localhost:${PORT}`);
});
