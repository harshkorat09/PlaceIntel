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
      score: 0,
      analysis: ['Incomplete student profile (CGPA or Branch missing).'],
      isEligible: false
    };
  }

  // 1A. BRANCH ELIGIBILITY
  let isEligible = true;
  if (input.placementBranchIds.length > 0 && !input.placementBranchIds.includes(input.studentBranchId)) {
    isEligible = false;
    analysis.push('Branch eligibility requirement not satisfied.');
    return {
      score: 0,
      analysis,
      isEligible
    };
  }
  
  analysis.push('Branch eligibility requirement satisfied.');

  // 1B. CGPA COMPONENT
  const cgpaScore = (input.studentCgpa / 10) * 40;
  if (input.studentCgpa >= input.placementCgpaCutoff) {
    analysis.push(`Meets CGPA requirement. Contribution: ${cgpaScore.toFixed(1)} / 40`);
  } else {
    isEligible = false; // Note: UI still shows this score even if below cutoff
    analysis.push(`Below required CGPA (${input.placementCgpaCutoff}). Contribution: ${cgpaScore.toFixed(1)} / 40`);
  }

  // 1C & 1D. SKILL COMPONENT
  let skillScore = 60;
  if (input.placementSkillIds.length > 0) {
    const matchedSkills = input.placementSkillIds.filter(id => input.studentSkillIds.includes(id));
    skillScore = (matchedSkills.length / input.placementSkillIds.length) * 60;
    analysis.push(`Matched ${matchedSkills.length} of ${input.placementSkillIds.length} required skills. Contribution: ${skillScore.toFixed(1)} / 60`);
  } else {
    analysis.push('No specific skill requirements were provided for this placement. Contribution: 60 / 60');
  }

  // 1E. FINAL SCORE
  const finalScore = Math.round(cgpaScore + skillScore);

  return {
    score: finalScore,
    analysis,
    isEligible
  };
}
