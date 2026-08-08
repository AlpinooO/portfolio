import { Router } from "express";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../data/experience.json");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const raw = await readFile(dataPath, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: "Impossible de charger l'expérience" });
  }
});

export default router;
