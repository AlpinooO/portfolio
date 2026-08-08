import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nexus-machina.css";

export default function NexusMachina() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/nexus-machina")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <div className="mc-theme px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/projets"
          className="mc-tag inline-block mb-8 hover:opacity-80"
        >
          ← Retour aux projets
        </Link>

        {!data && (
          <p className="text-white font-mono">Chargement du monde…</p>
        )}

        {data && (
          <>
            <div className="flex flex-col items-center text-center mb-10">
              <img
                src="/images/nexus-machina-logo.png"
                alt="Emblème Nexus Machina"
                className="mc-logo mb-4"
              />
              <h1 className="mc-heading text-2xl sm:text-3xl mb-2">
                {data.title}
              </h1>
              <p className="text-white/80 text-2xl">{data.tagline}</p>
            </div>

            <div className="mc-divider" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {data.stats.map((stat) => (
                <div key={stat.label} className="mc-slot p-4 text-center">
                  <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-white text-xl">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mc-panel p-6 mb-10">
              <h2 className="mc-heading text-sm mb-4">📖 Description</h2>
              <p className="text-2xl leading-relaxed">{data.description}</p>
            </div>

            <div className="mc-panel p-6 mb-10">
              <h2 className="mc-heading text-sm mb-4">🛠 Stack technique</h2>
              <div className="flex flex-wrap gap-2">
                {data.stack.map((tech) => (
                  <span key={tech} className="mc-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="mc-heading text-sm mb-4">🏆 Succès débloqués</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {data.achievements.map((a) => (
                <div key={a.title} className="mc-achievement">
                  <p className="mc-achievement-title">{a.title}</p>
                  <p className="text-xl leading-snug">{a.description}</p>
                </div>
              ))}
            </div>

            <div className="mc-panel p-6">
              <h2 className="mc-heading text-sm mb-4">⚡ Compétences forgées</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {data.crafting_skills.map((skill) => (
                  <li key={skill} className="text-2xl flex items-center gap-2">
                    <span className="text-mc-gold">▪</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
