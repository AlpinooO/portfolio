import { useNavigate } from "react-router-dom";
import Aurora from "../components/Aurora.jsx";
import BorderGlow from "../components/BorderGlow.jsx";
import CardSwap, { Card } from "../components/CardSwap.jsx";
import SpecularButton from "../components/SpecularButton.jsx";
import PixelBlast from "../components/PixelBlast.jsx";

const stackTicker = [
  "React", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker",
  "TypeScript", "Tailwind CSS", "Git", "SQL",
];

const teasers = [
  {
    to: "/projets",
    label: "Projets",
    desc: "Intranet RH, mini-jeu HTML5, et un serveur Minecraft de 500+ mods.",
    badge: "Projet",
  },
  {
    to: "/professionnel",
    label: "Professionnel",
    desc: "Mes stages en développement web et gestion de projet.",
    badge: "Professionnel",
  },
  {
    to: "/profil",
    label: "Compétences",
    desc: "Langages, frameworks, méthodologies — ma boîte à outils.",
    badge: "Compétences",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* ── HERO ── */}
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

      {/* ── CE QUE JE PRODUIT ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="relative min-h-[560px] sm:min-h-[600px] overflow-hidden rounded-[24px] border border-surface2 bg-[color:var(--c-surface)] px-6 py-8 sm:px-10 sm:py-10">

          {/* Fond PixelBlast */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#38bdf8"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples={false}
              speed={0.5}
              edgeFade={0.35}
              transparent
            />
          </div>

          {/* Contenu texte */}
          <div className="relative z-10 max-w-lg">
            <p className="index-tag mb-4">CE QUE JE PRODUIT</p>
            <h2 className="font-semibold text-2xl sm:text-3xl mb-4">
              PROJET,PROFESSIONNEL,COMPÉTENCES
            </h2>
            <p className="text-muted leading-relaxed">
              (Les cartes se déplacent en rotation, mais chaque carte reste un lien actif vers sa page.)
            </p>
          </div>

          <div className="absolute bottom-0 right-0 z-10">
 <CardSwap
    width={340}
    height={420}
    cardDistance={58}
    verticalDistance={84}
    delay={2600}
    pauseOnHover
    skewAmount={5}
    easing="elastic"
  >
              {teasers.map((t) => (
                <Card
                  key={t.to}
                  customClass="cursor-pointer p-4"
                  onClick={() => navigate(t.to)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(t.to);
                    }
                  }}
                >
                  <BorderGlow
                    className="w-full h-full"
                    edgeSensitivity={26}
                    glowColor="198 100 72"
                    backgroundColor="var(--c-surface)"
                    borderRadius={24}
                    glowRadius={38}
                    glowIntensity={1.05}
                    coneSpread={24}
                    colors={['#c084fc', '#f472b6', '#38bdf8']}
                  >
                    <div className="h-full w-full p-6 sm:p-7 flex flex-col justify-between">
                      <span className="card__index uppercase tracking-[0.16em] text-sm sm:text-base">{t.badge}</span>
                      <div>
                        <h3 className="font-semibold text-2xl mb-3 transition-colors">
                          {t.label}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">{t.desc}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm text-cyan font-mono">
                        Ouvrir <span>→</span>
                      </span>
                    </div>
                  </BorderGlow>
                </Card>
              ))}
            </CardSwap>
          </div>

        </div>
      </section>
    </>
  );
}