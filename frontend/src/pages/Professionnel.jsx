import { useEffect, useState } from "react";

export default function Professionnel() {
  const [experience, setExperience] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperience(data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <p className="index-tag mb-2">CE QUE J'APPORTE</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-10">
        Expérience <span className="display-italic text-cyan">professionnelle</span>
      </h1>

      {status === "loading" && (
        <p className="text-muted font-mono text-sm">Chargement…</p>
      )}
      {status === "error" && (
        <p className="text-muted font-mono text-sm">
          Impossible de charger l'expérience pour le moment.
        </p>
      )}

      <div className="space-y-8">
        {experience.map((exp) => (
          <article
            key={exp.company}
            className="border-l-2 border-surface2 pl-6 relative"
          >
            <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan -left-[5px] top-1.5" />
            <p className="font-mono text-xs text-muted mb-1">{exp.period}</p>
            <h2 className="font-semibold text-xl mb-0.5">
              {exp.role}
            </h2>
            <p className="text-amber text-sm mb-3">{exp.company}</p>
            <ul className="space-y-1.5">
              {exp.missions.map((m) => (
                <li key={m} className="text-sm text-muted flex gap-2">
                  <span className="text-cyan">▸</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
            {exp.stack[0] !== "À compléter" && (
              <div className="flex flex-wrap gap-2 mt-3">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2 py-1 rounded bg-surface2 text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
