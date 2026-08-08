import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/efrei-motorsport.css";

export default function EfreiMotorsport() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/efrei-motorsport")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="em-theme px-6 pt-32 pb-24">
        <p className="text-center font-mono text-sm text-white/60">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="em-theme">
      <div className="em-checkered" />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/projets" className="em-back-link mb-8 inline-block">
          ← Retour aux projets
        </Link>

        <div className="flex flex-col items-center text-center mb-10">
          <div className="em-logo-frame px-8 py-6 mb-6 max-w-sm w-full">
            <img src={data.logo} alt={data.title} className="w-full" />
          </div>
          <img
            src={data.mascot}
            alt={`Mascotte ${data.title}`}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="text-center mb-3">
          <span className="em-tag"><span>{data.category}</span></span>
        </div>
        <h1 className="em-heading text-3xl sm:text-5xl mb-2 text-center">
          {data.title}
        </h1>
        <p className="text-center text-white/60 mb-10">{data.tagline} — {data.period}</p>

        <p className="text-white/80 leading-relaxed mb-8">{data.description}</p>

        <div className="em-panel p-6 mb-8">
          <h2 className="em-heading text-lg mb-4">
            Ce que j'ai <span className="accent">porté</span>
          </h2>
          <div className="space-y-4">
            {data.highlights.map((h, i) => (
              <div key={h.title} className="flex gap-4 items-start">
                <span className="em-badge shrink-0">{i + 1}</span>
                <div>
                  <p className="font-semibold text-sm mb-1">{h.title}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span key={skill} className="em-skill">{skill}</span>
          ))}
        </div>
      </div>

      <div className="em-checkered" />
    </div>
  );
}