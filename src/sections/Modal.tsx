import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { getAdjacentProjectId, getProjectById } from '@/lib/portfolio';

interface ModalProps {
  projectId: string | null;
  projectIds: string[];
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function Modal({
  projectId,
  projectIds,
  onClose,
  onNavigate,
}: ModalProps) {
  const project = projectId ? getProjectById(projectId) : null;
  const canNavigate = projectIds.length > 1;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  // Normalize additionalImages — supports both list-of-objects ({ image })
  // from Decap CMS and plain string arrays, in case data is edited by hand.
  const extraImages: string[] = (project?.additionalImages ?? [])
    .map((item: any) => (typeof item === 'string' ? item : item?.image))
    .filter(Boolean);

  const hasExtraImages = extraImages.length > 0;

  const goToPrev = () => {
    if (!projectId) return;
    const prevId = getAdjacentProjectId(projectIds, projectId, 'prev');
    if (prevId) onNavigate(prevId);
  };

  const goToNext = () => {
    if (!projectId) return;
    const nextId = getAdjacentProjectId(projectIds, projectId, 'next');
    if (nextId) onNavigate(nextId);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (!projectId || projectIds.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        const prevId = getAdjacentProjectId(projectIds, projectId, 'prev');
        if (prevId) onNavigate(prevId);
      }
      if (e.key === 'ArrowRight') {
        const nextId = getAdjacentProjectId(projectIds, projectId, 'next');
        if (nextId) onNavigate(nextId);
      }
    };

    if (projectId) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKey);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [projectId, projectIds, onClose, onNavigate]);

  // Reset scroll position and hint visibility whenever the project changes.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setShowScrollHint(hasExtraImages);
  }, [projectId, hasExtraImages]);

  // Hide the scroll hint once the user has scrolled near the bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !hasExtraImages) return;

    const handleScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollHint(distanceFromBottom > 40);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [hasExtraImages, projectId]);

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.92)] z-[200] flex items-center justify-center p-4 md:p-8 transition-opacity duration-400 ${
        projectId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {canNavigate && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous project"
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:bg-white/15 hover:border-white/40"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next project"
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors duration-300 hover:bg-white/15 hover:border-white/40"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </>
      )}

      <div
        className="relative w-full max-w-[90vw] md:max-w-[80vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-sm tracking-[0.1em] uppercase bg-none border-none cursor-pointer transition-opacity duration-300 hover:opacity-70 font-inherit z-[210]"
        >
          Close
        </button>

        <div
          ref={scrollRef}
          className="w-full max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col items-center gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <img
            key={project.id}
            src={project.image}
            alt={project.title}
            className="max-w-full max-h-[80vh] object-contain rounded"
          />

          {hasExtraImages &&
            extraImages.map((src, i) => (
              <img
                key={`${project.id}-extra-${i}`}
                src={src}
                alt={`${project.title} — image ${i + 2}`}
                className="max-w-full max-h-[80vh] object-contain rounded"
              />
            ))}

          <div className="text-center text-white pb-2">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm opacity-70 max-w-[500px]">{project.description}</p>
          </div>
        </div>

        {hasExtraImages && (
          <div
            className={`pointer-events-none absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-3 pt-10 bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent transition-opacity duration-500 ${
              showScrollHint ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ChevronDown
              className="h-5 w-5 text-white/60 animate-bounce"
              strokeWidth={1.5}
            />
          </div>
        )}
      </div>
    </div>
  );
}
