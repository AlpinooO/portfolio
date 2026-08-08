import { Router } from "express";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "../data/projects.json");

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const raw = await readFile(dataPath, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: "Impossible de charger les projets" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const raw = await readFile(dataPath, "utf-8");
    const projects = JSON.parse(raw);
    const project = projects.find((p) => p.id === req.params.id);
    if (!project) return res.status(404).json({ error: "Projet introuvable" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Impossible de charger le projet" });
  }
});

export default router;
