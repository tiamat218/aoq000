import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.92)] z-[200] flex items-center justify-center p-8 transition-opacity duration-400 ${
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
        className="max-w-[90vw] max-h-[90vh] relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-sm tracking-[0.1em] uppercase bg-none border-none cursor-pointer transition-opacity duration-300 hover:opacity-70 font-inherit"
        >
          Close
        </button>
        <img
          key={project.id}
          src={project.image}
          alt={project.title}
          className="max-w-full max-h-[80vh] object-contain rounded"
        />
        <div className="mt-6 text-center text-white">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-sm opacity-70 max-w-[500px]">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
