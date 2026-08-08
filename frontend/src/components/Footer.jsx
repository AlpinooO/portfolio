export default function Footer() {
  return (
    <footer className="px-6 py-10 max-w-5xl mx-auto border-t border-surface2 flex flex-col sm:flex-row justify-between gap-4 font-mono text-xs text-muted">
      <p>© {new Date().getFullYear()} Léo Malgonne</p>
      <div className="flex gap-6">
        <a href="https://github.com/AlpinooO" className="hover:text-offwhite">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/l%C3%A9o-malgonne-574451284/" className="hover:text-offwhite">
          LinkedIn
        </a>
        <a href="mailto:lmalgonne@gmail.com" className="hover:text-offwhite">
          Email
        </a>
      </div>
    </footer>
  );
}
