import { calculateRiskScore, getPortfolioByScore } from "@/lib/utils/risk";
import { updateUserProfile } from "./userService";

export async function processQuizResults(userId: string, answers: Record<string, number>, horizonYears: number) {
    const riskScore = calculateRiskScore(answers, horizonYears);
    const portfolio = getPortfolioByScore(riskScore);

    await updateUserProfile(userId, {
        riskScore,
        horizonYears,
        modelPortfolioId: Math.max(1, Math.min(5, Math.round(riskScore))),
    });

    return { riskScore, portfolio };
}
