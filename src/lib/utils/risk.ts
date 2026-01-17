import { RISK_QUESTIONS, MODEL_PORTFOLIOS, PortfolioId } from "../constants";

export function calculateRiskScore(answers: Record<string, number>, horizonYears: number): number {
    let totalQuizScore = 0;
    let maxPossibleQuizScore = 0;

    RISK_QUESTIONS.forEach((q) => {
        const answerScore = answers[q.id] || 0;
        totalQuizScore += answerScore;
        maxPossibleQuizScore += Math.max(...q.options.map((o) => o.score));
    });

    const normalizedQuizScore = (totalQuizScore / maxPossibleQuizScore) * 5;

    // Horizon score: 1 to 5
    let horizonScore = 1;
    if (horizonYears > 20) horizonScore = 5;
    else if (horizonYears > 15) horizonScore = 4;
    else if (horizonYears > 10) horizonScore = 3;
    else if (horizonYears > 5) horizonScore = 2;

    // Weighted score: 70% quiz, 30% horizon
    const finalScore = (normalizedQuizScore * 0.7) + (horizonScore * 0.3);

    // Round to nearest integer (1-5)
    return Math.max(1, Math.min(5, Math.round(finalScore)));
}

export function getPortfolioByScore(score: number): (typeof MODEL_PORTFOLIOS)[PortfolioId] {
    const id = Math.max(1, Math.min(5, Math.round(score))) as PortfolioId;
    return MODEL_PORTFOLIOS[id];
}
