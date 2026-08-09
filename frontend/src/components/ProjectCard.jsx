import SpotlightCard from './SpotlightCard.jsx';

export default function ProjectCard({ project, index }) {
  return (
    <SpotlightCard className="h-full">
      <article className="editorial-card p-6 bg-[var(--surface)] border-0 shadow-none">
        <div className="flex items-start justify-between mb-4">
          <span className="index-number">
            {String(index).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-amber uppercase tracking-wide">
            {project.category}
          </span>
        </div>

        <h3 className="font-semibold text-xl mb-3">{project.title}</h3>

        <p className=" text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <ul className="space-y-1.5 mb-4">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm flex gap-2">
              <span className="text-accent">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2 py-1 rounded bg-surface2 text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="index-tag mt-3">{project.period}</p>

        {(project.link || project.repo) && (
          <div className="flex gap-4 mt-4 font-mono text-xs">
            {project.link && (
              <a href={project.link} className="text-cyan hover:underline">
                Voir le projet ↗
              </a>
            )}
            {project.repo && (
              <a href={project.repo} className="text-cyan hover:underline">
                Code source ↗
              </a>
            )}
          </div>
        )}
      </article>
    </SpotlightCard>
  );
}
