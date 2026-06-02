/** Machine-readable category keys — use these in CMS `select` / relation fields. */
export const PORTFOLIO_CATEGORY_SLUGS = [
  'visual-identity',
  'logotypes',
  'posters',
  'album-covers',
] as const;

export type PortfolioCategorySlug = (typeof PORTFOLIO_CATEGORY_SLUGS)[number];

/** Filter keys include "all" for the portfolio UI only (not stored on a project). */
export type PortfolioFilterSlug = 'all' | PortfolioCategorySlug;

export interface PortfolioCategory {
  slug: PortfolioCategorySlug;
  label: string;
}

export interface PortfolioProject {
  id: string;
  category: PortfolioCategorySlug;
  title: string;
  /** Short line on the grid card (e.g. "Poster Design"). */
  subtitle: string;
  /** Cover image in the portfolio grid. */
  thumbnail: string;
  /** Full image in the project modal. */
  image: string;
  description: string;
  /** Optional sort order — lower number appears first. */
  order?: number;
}