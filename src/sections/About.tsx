import { useEffect, useRef } from 'react';

const stats = [
  { number: '5+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
];

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="px-6 py-24 md:px-12">
      <div ref={contentRef} className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        <div>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] mb-8 text-[var(--text)]">
            About
          </h2>
          <p className="text-[1.0625rem] font-light text-[var(--text-secondary)] leading-[1.8] mb-6">
            I'm Anastasia Morozevič, a graphic and visual designer based in Vilnius, Lithuania. My work spans brand identities, editorial design, posters, and album artwork — always with a focus on bold visuals and clean execution.
          </p>
          <p className="text-[1.0625rem] font-light text-[var(--text-secondary)] leading-[1.8] mb-6">
            I believe great design should communicate clearly while leaving a lasting impression. My approach balances strategic thinking with intuitive creativity, ensuring every project not only looks striking but serves its purpose effectively.
          </p>
          <p className="text-[1.0625rem] font-light text-[var(--text-secondary)] leading-[1.8]">
            Whether crafting a visual identity for a festival or designing album artwork for an emerging artist, I bring the same dedication to detail and passion for visual storytelling.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 border-t border-[var(--border-color)]">
              <div className="text-[2.5rem] font-bold tracking-[-0.03em] mb-2 text-[var(--text)]">{stat.number}</div>
              <div className="text-[13px] text-[var(--text-muted)] tracking-[0.05em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
