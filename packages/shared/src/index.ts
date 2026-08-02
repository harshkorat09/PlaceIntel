export type UserRole = 'STUDENT' | 'ADMIN';

export interface PlacementSummary {
  id: number;
  companyName: string;
  position: string;
  minPackage?: number;
  maxPackage?: number;
  deadline?: string;
  eligibleBranches: string[];
  fitScore?: number;
}

export interface ChatResponse {
  answer: string;
  source_notice: string | null;
}
