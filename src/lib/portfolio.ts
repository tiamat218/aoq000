import { portfolioProjects as hardcodedProjects } from '@/content/portfolio/projects';
import type { PortfolioFilterSlug, PortfolioProject } from '@/types/portfolio';

const cmsFiles = import.meta.glob<PortfolioProject>(
  '/public/content/projects/*.json',
  { eager: true }
);

const cmsProjects: PortfolioProject[] = Object.values(cmsFiles);

const hardcodedIds = new Set(cmsProjects.map((p) => p.id));
const mergedProjects: PortfolioProject[] = [
  ...cmsProjects,
  ...hardcodedProjects.filter((p) => !hardcodedIds.has(p.id)),
].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const portfolioProjects = mergedProjects;

export function getAllProjects(): PortfolioProject[] {
  return portfolioProjects;
}

export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.id === id);
}

export function getProjectsByFilter(filter: PortfolioFilterSlug): PortfolioProject[] {
  if (filter === 'all') return portfolioProjects;
  return portfolioProjects.filter((p) => p.category === filter);
}

export function countProjects(filter: PortfolioFilterSlug): number {
  return getProjectsByFilter(filter).length;
}

export function formatProjectCount(count: number): string {
  return count === 1 ? '1 Project' : `${count} Projects`;
}

export function getAdjacentProjectId(
  projectIds: string[],
  currentId: string,
  direction: 'prev' | 'next'
): string | null {
  if (projectIds.length <= 1) return null;

  const index = projectIds.indexOf(currentId);
  if (index === -1) return projectIds[0] ?? null;

  const offset = direction === 'next' ? 1 : -1;
  const nextIndex = (index + offset + projectIds.length) % projectIds.length;
  return projectIds[nextIndex] ?? null;
}