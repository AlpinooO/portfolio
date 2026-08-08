const skills = {
  "Langages": ["JavaScript", "TypeScript", "Java", "C", "C++", "C#", "HTML/CSS","PHP", "Python", "SQL"],
  "Frameworks & Outils": ["React", "Node.js", "Express", "Tailwind CSS", "Docker", "Git", "GitHub", "API Rest", "Postman","VSCode", "Unity", "Unreal Engine", "Figma", "Nginx", "Apache", "Ansible", "Kubernetes"],
  "Bases de données": ["PostgreSQL", "MySQL", "MongoDB"],
  "Méthodologies": ["Agile", "Scrum", "Kanban", "Merise"],
};

export default function Profil() {
  return (
    <section className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <p className="index-tag mb-2">MES COMPÉTENCES</p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        <span className="display-italic text-cyan">Compétences</span>
      </h1>
      <p className="text-muted max-w-xl mb-10 leading-relaxed">
        Diplômé Concepteur Développeur Web Full Stack (EFREI Paris, titre
        RNCP niveau 6). Profil polyvalent, à l'aise aussi bien sur des
        problématiques front-end que back-end avec une apétence pour le développement de jeux vidéo.
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h2 className="font-mono text-sm text-amber mb-3">{category}</h2>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1.5 rounded-md bg-surface border border-surface2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
