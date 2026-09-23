export interface Placement {
  id: string;
  companyName: string;
  role: string;
  packageRange: string;
  deadline: string;
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
  hiresDepstar: number;
  hiresCspit: number;
  status: string;
  avgPackage: number;
  notes: string;
  website: string;
  hrContacts?: { name: string; role: string; email: string; phone: string }[];
  visits?: { event: string; details: string; date: string }[];
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
}
