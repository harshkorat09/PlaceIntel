// PENDING TEAM CONFIRMATION: Exact numerical weights are not defined in the SRS.
// This is a structural stub returning a deterministic calculation.

export interface FitScoreInput {
  studentCgpa: number | null;
  studentBranchId: number | null;
  studentSkillIds: number[];
  placementCgpaCutoff: number;
  placementBranchIds: number[];
  placementSkillIds: number[];
}

export function calculateFitScore(input: FitScoreInput) {
  const analysis: string[] = [];
  
  if (input.studentCgpa === null || input.studentBranchId === null) {
    return {
      score: null,
      analysis: ['Incomplete student profile (CGPA or Branch missing).'],
      isEligible: false
    };
  }

  let isEligible = true;

  // 1. CGPA Match
  if (input.studentCgpa >= input.placementCgpaCutoff) {
    analysis.push('Meets CGPA requirement.');
  } else {
    isEligible = false;
    analysis.push(`Below required CGPA (${input.placementCgpaCutoff}).`);
  }

  // 2. Branch Match
  if (input.placementBranchIds.length === 0 || input.placementBranchIds.includes(input.studentBranchId)) {
    analysis.push('Branch is eligible.');
  } else {
    isEligible = false;
    analysis.push('Branch not listed in eligible branches.');
  }

  // 3. Skills Match
  if (input.placementSkillIds.length > 0) {
    const matchedSkills = input.placementSkillIds.filter(id => input.studentSkillIds.includes(id));
    analysis.push(`Matched ${matchedSkills.length} out of ${input.placementSkillIds.length} required skills.`);
  } else {
    analysis.push('No specific skills required.');
  }

  return {
    score: null, // PENDING TEAM CONFIRMATION
    analysis,
    isEligible
  };
}
