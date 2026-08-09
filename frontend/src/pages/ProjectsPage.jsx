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
  className="relative p-6 overflow-hidden flex flex-col justify-between transition-all hover:brightness-110"
  style={{ background: '#17171a' }}
>
  <div className="absolute top-0 left-0 right-0 h-[14px]" style={{
    backgroundImage: 'repeating-conic-gradient(#f2f1ec 0% 25%, #17171a 0% 50%)',
    backgroundSize: '14px 14px',
    opacity: 0.9,
  }} />

  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: '#2f6fd1' }} />

  <div className="absolute inset-0" style={{
    background: 'radial-gradient(circle at 20% 0%, rgba(47,111,209,0.15) 0%, transparent 50%)',
    pointerEvents: 'none',
  }} />

  <div className="relative mt-3">
    <span className="inline-block font-mono text-xs uppercase tracking-widest mb-3 px-3 py-1 text-white font-bold"
      style={{ background: '#2f6fd1', transform: 'skewX(-8deg)', borderRadius: '2px' }}>
      <span style={{ display: 'inline-block', transform: 'skewX(8deg)' }}>Projet associatif</span>
    </span>
    <h3 className="font-semibold text-xl text-white mb-2" style={{ fontFamily: '"Racing Sans One", sans-serif', textTransform: 'uppercase' }}>
      Efrei <span style={{ color: '#2f6fd1' }}>Motorsport</span>
    </h3>
    <p className="text-sm leading-relaxed" style={{ color: '#8a8a8f' }}>
      Association étudiante créée et portée pendant un an — sport automobile
      et simulation.
    </p>
  </div>

  <span className="relative font-mono text-xs mt-4 inline-flex items-center gap-1" style={{ color: '#2f6fd1' }}>
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
