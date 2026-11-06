export type ScoreInputs = {
  age: number;
  monthlyIncome: number;
  monthlySavings: number;
  currentInvestments: number;
  loanEMI: number;
  dependents: number;
  emergencyFund: number;
  hasInsurance: boolean;
};

export type SubScores = {
  retirementReadiness: number; // Represents Claims Settlement Readiness
  emergencyFund: number; // Represents Cashless Garage & Hospital Network Coverage
  insuranceHealth: number; // Represents Core Policy Depth (Zero Dep, RTI, Engine Protect)
  investmentReadiness: number; // Represents Premium Efficiency / NCB Protection
  wealthProjection: number; // Represents Fleet / Asset Risk Buffer
};

export type ScoreResult = {
  score: number;
  subScores: SubScores;
  projection: { age: number; netWorth: number }[];
  insights: string[];
};

const DEFAULT_INPUTS: ScoreInputs = {
  age: 32,
  monthlyIncome: 80000,
  monthlySavings: 15000,
  currentInvestments: 500000,
  loanEMI: 12000,
  dependents: 2,
  emergencyFund: 150000,
  hasInsurance: true,
};

export const defaultInputs = DEFAULT_INPUTS;

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}

export function calculateFreedomScore(raw: Partial<ScoreInputs>): ScoreResult {
  const i: ScoreInputs = { ...DEFAULT_INPUTS, ...raw };

  // Core policy depth: Has active policy + adequate cover
  const insuranceHealth = i.hasInsurance
    ? clamp((i.currentInvestments / Math.max(i.monthlyIncome * 10, 100000)) * 90 + 10)
    : 20;

  // Cashless and emergency liquid fund coverage for claims excess/deductibles
  const targetExcessFund = 100000;
  const emergencyFund = clamp((i.emergencyFund / targetExcessFund) * 100);

  // Claim settlement readiness: Based on clean policy history and ratio of dependents/fleet scale
  const claimReadiness = clamp(
    (i.hasInsurance ? 70 : 15) + (i.emergencyFund > 50000 ? 15 : 0) + (i.dependents <= 3 ? 15 : 10),
  );

  // Premium efficiency & NCB optimization
  const premiumRatio = i.monthlySavings / Math.max(i.monthlyIncome, 1);
  const investmentReadiness = clamp(premiumRatio * 350 + (i.hasInsurance ? 20 : 0));

  // Asset / Fleet risk buffer: Coverage compared to potential total loss
  const riskBuffer = clamp((i.currentInvestments / Math.max(i.loanEMI * 36, 100000)) * 100);

  const subScores: SubScores = {
    retirementReadiness: Math.round(claimReadiness),
    emergencyFund: Math.round(emergencyFund),
    insuranceHealth: Math.round(insuranceHealth),
    investmentReadiness: Math.round(investmentReadiness),
    wealthProjection: Math.round(riskBuffer),
  };

  const score = Math.round(
    subScores.insuranceHealth * 0.35 +
      subScores.retirementReadiness * 0.25 +
      subScores.emergencyFund * 0.15 +
      subScores.investmentReadiness * 0.15 +
      subScores.wealthProjection * 0.1,
  );

  // Projection chart: Coverage adequacy growth over time
  const projection: { age: number; netWorth: number }[] = [];
  let baseCover = Math.max(i.currentInvestments, 300000);
  for (let yr = 0; yr <= Math.min(65 - i.age, 30); yr++) {
    const age = i.age + yr;
    projection.push({ age, netWorth: Math.round(baseCover) });
    baseCover = baseCover * 1.07; // Medical and replacement cost inflation buffer
  }

  const insights: string[] = [];
  if (!i.hasInsurance) {
    insights.push("CRITICAL: You are running without comprehensive insurance cover. Any accident or hospitalization will cause direct out-of-pocket loss.");
  }
  if (insuranceHealth < 60) {
    insights.push("Underinsurance Alert: Your sum insured is below the recommended 10x annual risk benchmark.");
  }
  if (emergencyFund < 70) {
    insights.push("Maintain at least ₹1 Lakh liquid fund for mandatory policy deductibles, non-medical items, and towing expenses.");
  }
  if (claimReadiness >= 75) {
    insights.push("Strong claim readiness: You are eligible for NICE's zero-hassle expedited cashless survey network.");
  } else {
    insights.push("Audit add-ons: Ensure Zero-Depreciation, Engine Protector, and Return-to-Invoice (RTI) are active on motor policies.");
  }

  return { score, subScores, projection, insights };
}
