import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cvPath = path.resolve(__dirname, "../../frontend/public/CV/CV_Léo_Malgonne.pdf");

router.get("/", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.download(cvPath, "CV_Léo_Malgonne.pdf", (error) => {
    if (error && !res.headersSent) {
      res.status(404).json({ error: "CV introuvable" });
    }
  });
});

export default router;