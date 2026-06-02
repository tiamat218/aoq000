import { useEffect, useRef } from 'react';

const stats = [
  { number: '4+', label: 'Years Experience' },
  { number: '100+', label: 'Projects Completed' },
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
    el.style.transition =
      'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="px-6 py-24 md:px-12">
      <div
        ref={contentRef}
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start"
      >
        <div>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] mb-8 text-[var(--text)]">
            About
          </h2>
          <p className="text-[1.0625rem] font-light text-[var(--text-secondary)] leading-[1.8] mb-6">
            I'm Anastasia Morozevič, a Europe-based graphic and visual designer.
            While completing my degree as a Graphic Designer & Teacher in Minsk,
            Belarus, I began working on freelance projects, helping brands and
            individuals from diverse fields visualize their ideas through design.
            During my studies, I completed an internship at a print studio, where
            I prepared and adapted designs for production, gaining practical
            experience in print design and prepress workflows.
          </p>
          <p className="text-[1.0625rem] font-light text-[var(--text-secondary)] leading-[1.8] mb-6">
            After graduation, I worked full-time as a graphic designer in a
            studio, further developing my skills through commercial projects and
            hands-on industry experience. During this period, I also began
            actively sharing my work on social media and building my presence
            online. This opened the door to new opportunities and collaborations,
            allowing me to connect with clients from various industries and work
            on projects ranging from branding to experimental poster design.
            Through these collaborations, I helped brands communicate their
            message more effectively through thoughtful and engaging visual
            design.
          </p>
          <p className="text-[1.0625rem] font-light text-[var(--text-secondary)] leading-[1.8]">
            Today, I work as a freelance designer, focusing on visual identity,
            posters, album covers, and social media design. I enjoy creating work
            that captures attention at first glance, experimenting with typography
            and composition to build bold, memorable designs that stand out in
            crowded digital spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 border-t border-[var(--border-color)]">
              <div className="text-[2.5rem] font-bold tracking-[-0.03em] mb-2 text-[var(--text)]">
                {stat.number}
              </div>
              <div className="text-[13px] text-[var(--text-muted)] tracking-[0.05em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}