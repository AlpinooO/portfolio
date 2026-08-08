import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  // Chemin vers le CV dans le dossier assets/ à la racine du backend
  const filePath = path.join(__dirname, "../../frontend/public/CV/CV_Malgonne.pdf");

  // Vérification de l'existence du fichier
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "cv introuvable" });
  }

  // Téléchargement du fichier
  res.download(filePath, "../../frontend/public/CV/CV_Malgonne.pdf", (err) => {
    if (err && !res.headersSent) {
      res.status(500).send("Erreur lors du téléchargement");
    }
  });
});

export default router;