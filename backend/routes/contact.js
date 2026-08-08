import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();
const contactAttempts = new Map();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(value) {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

function tooManyAttempts(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxAttempts = 5;
  const bucket = contactAttempts.get(ip) ?? [];
  const recentAttempts = bucket.filter((timestamp) => now - timestamp < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    contactAttempts.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  contactAttempts.set(ip, recentAttempts);
  return false;
}

router.post("/", async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Requête invalide" });
  }

  if (typeof req.body.website === "string" && req.body.website.trim() !== "") {
    return res.status(200).json({ success: true });
  }

  const name = typeof req.body?.name === "string" ? sanitizeText(req.body.name) : "";
  const email = typeof req.body?.email === "string" ? sanitizeText(req.body.email) : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (tooManyAttempts(req.ip || "unknown")) {
    return res.status(429).json({ error: "Trop de tentatives, réessaie plus tard" });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  if (name.length > 100 || email.length > 254 || message.length > 4000) {
    return res.status(400).json({ error: "Un champ est trop long" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Adresse email invalide" });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: "Configuration email manquante" });
  }


  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nouveau message portfolio de ${name.slice(0, 80)}`,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Envoi impossible pour le moment" });
  }
});

export default router;
