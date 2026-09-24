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
  let score = 0;
  const analysis: string[] = [];
  
  if (input.studentCgpa === null || input.studentBranchId === null) {
    return {
      score: 0,
      analysis: ['Incomplete student profile (CGPA or Branch missing).'],
      isEligible: false
    };
  }

  // 1. CGPA Match
  if (input.studentCgpa >= input.placementCgpaCutoff) {
    score += 40;
    analysis.push('Meets CGPA requirement.');
  } else {
    analysis.push(`Below required CGPA (${input.placementCgpaCutoff}).`);
  }

  // 2. Branch Match
  if (input.placementBranchIds.length === 0 || input.placementBranchIds.includes(input.studentBranchId)) {
    score += 30;
    analysis.push('Branch is eligible.');
  } else {
    analysis.push('Branch not listed in eligible branches.');
  }

  // 3. Skills Match
  if (input.placementSkillIds.length > 0) {
    const matchedSkills = input.placementSkillIds.filter(id => input.studentSkillIds.includes(id));
    const overlapPercentage = matchedSkills.length / input.placementSkillIds.length;
    score += Math.round(overlapPercentage * 30);
    analysis.push(`Matched ${matchedSkills.length} out of ${input.placementSkillIds.length} required skills.`);
  } else {
    score += 30; // No specific skills required, grant full points
    analysis.push('No specific skills required.');
  }

  return {
    score,
    analysis,
    isEligible: score >= 60 // Heuristic eligibility threshold
  };
}
