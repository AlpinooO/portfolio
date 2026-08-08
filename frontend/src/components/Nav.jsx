import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import SpecularButton from "./SpecularButton.jsx";

const links = [
  { to: "/projets", label: "Projets" },
  { to: "/professionnel", label: "Professionnel" },
  { to: "/profil", label: "Profil" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-ink/80 border-b border-surface2">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="display-italic font-semibold text-lg tracking-tight">
          L. Malgonne<span className="text-cyan">.</span>
        </Link>
        <ul className="hidden sm:flex gap-8 font-mono text-sm text-muted">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative hover:text-offwhite transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:bg-cyan after:transition-all after:duration-300 ${
                    isActive ? "text-cyan after:w-full" : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <SpecularButton
            size="sm"
            radius={999}
            blur={0}
            intensity={0.75}
            shineSize={38}
            shineFade={37}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            className="hidden sm:inline-flex"
            onClick={() => window.location.assign("/api/cv")}
          >
            CV ↓
          </SpecularButton>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="sm:hidden w-9 h-9 rounded-full border border-surface2 flex items-center justify-center shrink-0"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 pb-6 gap-1 font-mono text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block py-3 border-b border-surface2 transition-colors ${
                    isActive ? "text-cyan" : "text-muted hover:text-offwhite"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <SpecularButton
              size="sm"
              radius={999}
              blur={0}
              intensity={0.75}
              shineSize={38}
              shineFade={37}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              className="w-full justify-center mt-2"
              onClick={() => window.location.assign("/api/cv")}
            >
              Télécharger le CV ↓
            </SpecularButton>
          </li>
        </ul>
      </div>
    </header>
  );
}