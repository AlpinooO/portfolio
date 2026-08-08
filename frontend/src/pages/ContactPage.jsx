import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <p className="index-tag mb-2">POUR ME CONTACTER</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-10">
        Interessé ? <span className="display-italic text-cyan">Contactez-moi !</span>
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="font-mono text-xs text-muted block mb-1.5" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-surface border border-surface2 rounded-md px-4 py-2.5 focus:outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-muted block mb-1.5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-surface border border-surface2 rounded-md px-4 py-2.5 focus:outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-muted block mb-1.5" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            maxLength={4000}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-surface border border-surface2 rounded-md px-4 py-2.5 focus:outline-none focus:border-cyan resize-none"
          />
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="font-mono text-sm px-5 py-3 rounded-md bg-cyan text-ink font-medium hover:bg-cyan/90 transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Envoi…" : "Envoyer"}
        </button>

        {status === "sent" && (
          <p className="text-cyan text-sm font-mono">Message envoyé ✓</p>
        )}
        {status === "error" && (
          <p className="text-amber text-sm font-mono">
            Une erreur est survenue, réessaie plus tard.
          </p>
        )}
      </form>
    </section>
  );
}
