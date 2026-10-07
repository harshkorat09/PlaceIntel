export interface Placement {
  id: string;
  companyName: string;
  role: string;
  packageRange: string;
  minPackage?: number;
  maxPackage?: number;
  deadline: string;
  driveDate?: string;
  cgpaRequirement: number;
  eligibleBranches: string[];
  requiredSkills: string[];
  description: string;
  attachmentUrl?: string;
  fitScore?: number;
  status: string;
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  website: string;
  description?: string;
  location?: string;
  size?: string;
  foundedYear?: number;
  placements?: any[];
}

export interface StudentProfileData {
  id: string;
  name: string;
  email: string;
  branch: string;
  cgpa: number;
  skills: string[];
}

export interface AnalyticsData {
  totalCompanies: number;
  totalPlacements: number;
  packageDistribution: Record<string, number>;
  skillDemand: Record<string, number>;
  branchDistribution: Record<string, number>;
  yearWiseTrends: Record<string, number>;
  yearWisePlacementCounts: Record<string, number>;
  companyParticipation: Record<string, number>;
  upcomingDrives: any[];
}
