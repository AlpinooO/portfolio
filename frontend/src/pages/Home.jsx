import { Link, useNavigate } from "react-router-dom";
import Aurora from "../components/Aurora.jsx";
import SpecularButton from "../components/SpecularButton.jsx";

const stackTicker = [
  "React", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker",
  "TypeScript", "Tailwind CSS", "Git", "SQL",
];

const teasers = [
  {
    to: "/projets",
    label: "Projets",
    desc: "Intranet RH, mini-jeu HTML5, et un serveur Minecraft de 500+ mods.",
  },
  {
    to: "/professionnel",
    label: "Professionnel",
    desc: "Mes stages en développement web et gestion de projet.",
  },
  {
    to: "/profil",
    label: "Profil",
    desc: "Langages, frameworks, méthodologies — ma boîte à outils.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 px-6">
        <div className="absolute inset-x-0 top-0 h-[420px] opacity-85 pointer-events-none">
          <Aurora
            colorStops={["#2431ee", "#1818ed", "#5227FF"]}
            blend={0.43}
            amplitude={1.0}
            speed={0.4}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="index-tag mb-6">A PROPOS DE MOI</p>
          <h1 className="font-body font-semibold text-4xl sm:text-6xl leading-[1.05] mb-8 max-w-3xl">
            Développeur Full Stack rigoureux, je conçois des applications web
            avec un vrai <span className="display-italic text-cyan">sens du détail</span>.
          </h1>
          <p className="text-muted max-w-lg mb-10 leading-relaxed">
            Diplômé Concepteur Développeur Web Full Stack (EFREI Paris).
            J'allie rigueur technique — React, Node.js, SQL — et créativité,
            forgée en administrant et scriptant des systèmes complexes pour
            une communauté de 500+ mods.
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <SpecularButton
              size="sm"
              radius={999}
              blur={0}
              tintOpacity={0.14}
              intensity={0.75}
              shineSize={38}
              shineFade={37}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={() => navigate("/projets")}
            >
              Voir mes projets
            </SpecularButton>
            <SpecularButton
              size="sm"
              radius={999}
              blur={0}
              tintOpacity={0.14}
              intensity={0.75}
              shineSize={38}
              shineFade={37}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={() => navigate("/contact")}
            >
              Me contacter
            </SpecularButton>
          </div>
        </div>
      </section>

      {/* Bandeau défilant
      <div className="marquee py-4 mb-16">
        <div className="marquee-track">
          {[...stackTicker, ...stackTicker].map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm text-muted px-6 flex items-center gap-6"
            >
              {item} <span className="text-cyan">✦</span>
            </span>
          ))}
        </div>
      </div> */}

      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-px bg-surface2 border border-surface2">
          {teasers.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className="editorial-card bg-ink p-6 hover:bg-surface transition-colors group"
            >
              <span className="index-number block mb-6">
                0{i + 1}
              </span>
              <h2 className="font-semibold text-lg mb-2 group-hover:text-cyan transition-colors">
                <h2 className="font-semibold text-lg mb-2 group-hover:text-cyan transition-colors flex items-center gap-1">
  {t.label}
  <span className="group-hover:translate-x-1 transition-transform">→</span>
</h2>
              </h2>
              <p className="text-muted text-sm leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
