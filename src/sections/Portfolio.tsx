import { useEffect, useMemo, useRef, useState } from 'react';
import { portfolioCategories } from '@/content/portfolio';
import {
  countProjects,
  formatProjectCount,
  getProjectsByFilter,
} from '@/lib/portfolio';
import type { PortfolioFilterSlug } from '@/types/portfolio';

const portfolioFilters: { slug: PortfolioFilterSlug; label: string }[] = [
  { slug: 'all', label: 'All' },
  ...portfolioCategories.map((c) => ({ slug: c.slug, label: c.label })),
];

interface PortfolioProps {
  onOpenModal: (id: string, visibleIds: string[]) => void;
}

export default function Portfolio({ onOpenModal }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterSlug>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () => getProjectsByFilter(activeFilter),
    [activeFilter]
  );

  const projectCountLabel = formatProjectCount(countProjects(activeFilter));

  useEffect(() => {
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

    const el = toolbarRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition =
        'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.portfolio-item');
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

    items.forEach((item) => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.transform = 'translateY(30px)';
      (item as HTMLElement).style.transition =
        'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <section id="work" className="px-6 pt-4 pb-24 md:px-12">
      <div
        ref={toolbarRef}
        className="max-w-[1200px] mx-auto mb-12"
      >
        <span className="block text-[clamp(10px,2vw,12px)] text-[var(--text-muted)] font-normal mb-2">
          {projectCountLabel}
        </span>
        <div className="flex flex-nowrap items-center gap-[clamp(0.35rem,1.8vw,2rem)] min-w-0">
          {portfolioFilters.map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => setActiveFilter(f.slug)}
              className={`relative shrink-0 font-inherit text-[clamp(9px,2.15vw,13px)] font-medium tracking-[0.04em] uppercase whitespace-nowrap bg-none border-none cursor-pointer py-1 sm:py-2 transition-colors duration-300 ${
                activeFilter === f.slug
                  ? 'text-[var(--text)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {f.label}
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-[var(--text)] transition-all duration-500 ${
                  activeFilter === f.slug ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() =>
              onOpenModal(
                project.id,
                filteredProjects.map((p) => p.id)
              )
            }
            className="portfolio-item relative aspect-[4/5] bg-[var(--bg-secondary)] rounded overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-1 group"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.08] group-hover:brightness-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 px-6 pt-10 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent text-white translate-y-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-semibold tracking-[-0.01em] mb-1">
                {project.title}
              </h3>
              <p className="text-xs tracking-[0.1em] uppercase opacity-80">
                {project.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
