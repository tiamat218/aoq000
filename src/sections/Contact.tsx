export default function Contact() {
  return (
    <section id="contact" className="bg-[var(--bg-secondary)] px-6 py-24 md:px-12 text-center">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] mb-6 text-[var(--text)]">
          Let's work together
        </h2>
        <p className="text-[1.125rem] font-light text-[var(--text-secondary)] mb-12">
          Have a project in mind? I'm currently available for freelance work and open to collaborations.
        </p>
        <a
          href="mailto:hello@anastasiamorozevic.com"
          className="inline-block text-2xl font-semibold text-[var(--text)] no-underline tracking-[-0.01em] mb-12 relative group"
        >
          hello@anastasiamorozevic.com
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--text)] transition-transform duration-500 origin-right group-hover:scale-x-0 group-hover:origin-left" />
        </a>
        <div className="flex justify-center gap-8">
          <a
            href="https://www.behance.net/anastasiamorozevich"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)]"
          >
            Behance
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)]"
          >
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
