import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nexus-machina.css";
import CountUp from "../components/CountUp.jsx";

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

        <Link to="/projets" className="mc-tag inline-block mb-10 hover:opacity-80">
          ← Retour aux projets
        </Link>

        {!data && (
          <p className="text-white font-mono">Chargement du monde…</p>
        )}

        {data && (
          <>
            {/* ── HERO ── */}
            <div className="mc-hero mb-10">
              <div className="mc-hero-inner">
                <img
                  src="/images/nexus-machina-logo.png"
                  alt="Emblème Nexus Machina"
                  className="mc-logo"
                />
                <div className="mc-hero-text">
                  <p className="mc-eyebrow">{data.period}</p>
                  <h1 className="mc-heading mc-title">{data.title}</h1>
                  <p className="mc-tagline">{data.tagline}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {data.stack.map((tech) => (
                      <span key={tech} className="mc-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mc-divider" />

            {/* ── STATS ── */}
            <div className="mc-stats-row mb-10">
              {data.stats.map((stat) => (
                <div key={stat.label} className="mc-stat-card">
                  <p className="mc-stat-label">{stat.label}</p>
                  {stat.label === "Mods installés" ? (
                    <p className="mc-stat-value">
                      <CountUp from={0} to={500} duration={2} />
                      <span>+</span>
                    </p>
                  ) : (
                    <p className="mc-stat-value">{stat.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mc-divider" />

            {/* ── DESCRIPTION ── */}
            <div className="mc-panel p-6 mb-10">
              <h2 className="mc-section-title">📖 Description</h2>
              <p className="mc-body">{data.description}</p>
            </div>

            {/* ── ACHIEVEMENTS ── */}
            <h2 className="mc-section-title mb-6">🏆 Succès débloqués</h2>
            <div className="mc-achievements-grid mb-10">
              {data.achievements.map((a, i) => (
                <div key={a.title} className="mc-achievement-card">
                  <div className="mc-achievement-header">
                    <span className="mc-achievement-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mc-achievement-title">{a.title}</p>
                  </div>
                  <p className="mc-body mt-3">{a.description}</p>
                </div>
              ))}
            </div>

            {/* ── COMPÉTENCES ── */}
            <div className="mc-panel p-6">
              <h2 className="mc-section-title mb-6">⚡ Compétences forgées</h2>
              <ul className="mc-skills-grid">
                {data.crafting_skills.map((skill) => (
                  <li key={skill} className="mc-skill-item">
                    <span className="mc-skill-icon">▪</span>
                    <span>{skill}</span>
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