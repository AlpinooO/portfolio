import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <p className="index-tag mb-2">CE QUE JE CONSTRUIS</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-10">
        Les projets que j'ai <span className="display-italic text-cyan">construit</span>
      </h1>

      {status === "loading" && (
        <p className="text-muted font-mono text-sm">Chargement…</p>
      )}
      {status === "error" && (
        <p className="text-muted font-mono text-sm">
          Impossible de charger les projets pour le moment.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-px bg-surface2 border border-surface2">
        <Link
          to="/projets/nexus-machina"
          className="p-6 bg-gradient-to-br from-[#15141a] via-[#2a2733] to-[#8b4a1f] hover:brightness-110 transition-all flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-xs text-[#d4a94a] uppercase tracking-wide mb-3">Projet personnel</p>
            <h3 className="font-semibold text-xl text-white mb-2">
              Nexus Machina
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Administration d'un serveur Minecraft communautaire — 500+ mods.
              Page dédiée avec son propre univers visuel.
            </p>
          </div>
          <span className="font-mono text-xs text-[#a98cf0] mt-4 inline-flex items-center gap-1">
            Entrer dans le monde →
          </span>

          
        </Link>
<Link
  to="/projets/efrei-motorsport"
  className="p-6 bg-white hover:brightness-95 transition-all flex flex-col justify-between"
>
  <div>
    <p className="font-mono text-xs text-[#1f8fef] uppercase tracking-wide mb-3">Projet associatif</p>
    <h3 className="font-semibold text-xl text-[#0b3d91] mb-2">
      Efrei Motorsport
    </h3>
    <p className="text-[#3a5a8a] text-sm leading-relaxed">
      Association étudiante créée et portée pendant un an — sport automobile
      et simulation.
    </p>
  </div>
  <span className="font-mono text-xs text-[#1f8fef] mt-4 inline-flex items-center gap-1">
    Découvrir →
  </span>
</Link>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
