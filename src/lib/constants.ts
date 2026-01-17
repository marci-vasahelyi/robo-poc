export const MODEL_PORTFOLIOS = {
    1: {
        name: "Conservative",
        stocksPercent: 20, // VWCE
        bondsPercent: 80, // Hungarian gov't bonds
        expectedReturn: 5.0,
        volatility: 9.0,
        description: "Prioritizes capital preservation with a small allocation to global stocks.",
        assets: [
            { name: "Vanguard FTSE All-World UCITS ETF (VWCE)", allocation: 20 },
            { name: "Hungarian Government Bonds (All-Bond Index)", allocation: 80 },
        ],
    },
    2: {
        name: "Moderately Conservative",
        stocksPercent: 40,
        bondsPercent: 60,
        expectedReturn: 6.0,
        volatility: 11.0,
        description: "A balanced approach with a tilt towards fixed income safety.",
        assets: [
            { name: "Vanguard FTSE All-World UCITS ETF (VWCE)", allocation: 40 },
            { name: "Hungarian Government Bonds (All-Bond Index)", allocation: 60 },
        ],
    },
    3: {
        name: "Balanced",
        stocksPercent: 60,
        bondsPercent: 40,
        expectedReturn: 7.0,
        volatility: 13.5,
        description: "Equally weighted between growth potential and stability.",
        assets: [
            { name: "Vanguard FTSE All-World UCITS ETF (VWCE)", allocation: 60 },
            { name: "Hungarian Government Bonds (All-Bond Index)", allocation: 40 },
        ],
    },
    4: {
        name: "Growth",
        stocksPercent: 80,
        bondsPercent: 20,
        expectedReturn: 8.0,
        volatility: 17.0,
        description: "Focused on long-term capital appreciation with higher volatility.",
        assets: [
            { name: "Vanguard FTSE All-World UCITS ETF (VWCE)", allocation: 80 },
            { name: "Hungarian Government Bonds (All-Bond Index)", allocation: 20 },
        ],
    },
    5: {
        name: "Aggressive",
        stocksPercent: 90,
        bondsPercent: 10,
        expectedReturn: 9.0,
        volatility: 21.0,
        description: "Maximum exposure to global equities for high growth seekers.",
        assets: [
            { name: "Vanguard FTSE All-World UCITS ETF (VWCE)", allocation: 90 },
            { name: "Hungarian Government Bonds (All-Bond Index)", allocation: 10 },
        ],
    },
} as const;

export type PortfolioId = keyof typeof MODEL_PORTFOLIOS;

export interface Question {
    id: string;
    text: string;
    options: {
        text: string;
        score: number;
    }[];
}

export const RISK_QUESTIONS: Question[] = [
    {
        id: "q1",
        text: "In general, how would your best friend describe you as a risk taker?",
        options: [
            { text: "A real gambler", score: 4 },
            { text: "Willing to take risks after completing adequate research", score: 3 },
            { text: "Cautious", score: 2 },
            { text: "A real risk avoider", score: 1 },
        ],
    },
    {
        id: "q2",
        text: "You are on a TV game show and can choose one of the following. Which would you take?",
        options: [
            { text: "A cash prize of $1,000", score: 1 },
            { text: "A 50% chance at winning $5,000", score: 2 },
            { text: "A 25% chance at winning $10,000", score: 3 },
            { text: "A 5% chance at winning $100,000", score: 4 },
        ],
    },
    {
        id: "q3",
        text: "You have just finished saving for a 'once-in-a-lifetime' vacation. Three weeks before you plan to leave, you lose your job. You would:",
        options: [
            { text: "Cancel the vacation", score: 1 },
            { text: "Take a much more modest vacation", score: 2 },
            { text: "Go as scheduled, reasoning that you need the time to prepare for a job search", score: 3 },
            { text: "Extend your vacation, because this might be your last chance to go first class", score: 4 },
        ],
    },
    {
        id: "q4",
        text: "If you unexpectedly received $20,000 to invest, what would you do?",
        options: [
            { text: "Deposit in a bank account, money market account, or insured Certificate of Deposit", score: 1 },
            { text: "Invest it in safe high-quality bonds or bond mutual funds", score: 2 },
            { text: "Invest it in stocks or stock mutual funds", score: 3 },
        ],
    },
    {
        id: "q5",
        text: "In terms of experience, how comfortable are you investing in stocks or stock mutual funds?",
        options: [
            { text: "Not at all comfortable", score: 1 },
            { text: "Somewhat comfortable", score: 2 },
            { text: "Very comfortable", score: 3 },
        ],
    },
    {
        id: "q6",
        text: "When you think of the word 'risk' which of the following words comes to mind first?",
        options: [
            { text: "Loss", score: 1 },
            { text: "Uncertainty", score: 2 },
            { text: "Opportunity", score: 3 },
            { text: "Thrill", score: 4 },
        ],
    },
    {
        id: "q7",
        text: "Given the best- and worst-case returns of the four investment choices below, which would you prefer?",
        options: [
            { text: "$200 gain best case; $0 gain/loss worst case", score: 1 },
            { text: "$800 gain best case; $200 loss worst case", score: 2 },
            { text: "$2,600 gain best case; $800 loss worst case", score: 3 },
            { text: "$4,800 gain best case; $2,400 loss worst case", score: 4 },
        ],
    },
    {
        id: "q8",
        text: "In addition to whatever you own, you have been given $1,000. You are now asked to choose between a sure gain of $500 or a 50% chance to gain $1,000 and a 50% chance to gain nothing.",
        options: [
            { text: "A sure gain of $500", score: 1 },
            { text: "A 50% chance to gain $1,000 and a 50% chance to gain nothing", score: 3 },
        ],
    },
    {
        id: "q9",
        text: "In addition to whatever you own, you have been given $2,000. You are now asked to choose between a sure loss of $500 or a 50% chance to lose $1,000 and a 50% chance to lose nothing.",
        options: [
            { text: "A sure loss of $500", score: 1 },
            { text: "A 50% chance to lose $1,000 and a 50% chance to lose nothing", score: 3 },
        ],
    },
    {
        id: "q10",
        text: "Suppose a relative left you an inheritance of $100,000, stipulating in the will that you invest ALL the money in ONE of the following choices. Which one would you select?",
        options: [
            { text: "A savings account or money market fund", score: 1 },
            { text: "A unit investment trust of municipal bonds", score: 2 },
            { text: "A mixed portfolio of stocks and bonds", score: 3 },
            { text: "Stocks of companies in the tech or biotech sectors", score: 4 },
        ],
    },
    {
        id: "q11",
        text: "If you had to invest $20,000, which of the following investment choices would you find most appealing?",
        options: [
            { text: "60% in low-stress investments 40% in medium-risk investments", score: 1 },
            { text: "30% in low-stress investments 40% in medium-risk investments 30% in high-risk investments", score: 2 },
            { text: "10% in low-stress investments 40% in medium-risk investments 50% in high-risk investments", score: 3 },
        ],
    },
    {
        id: "q12",
        text: "Your trusted friend and neighbor, an experienced geologist, is putting together a group of investors to fund an exploratory gold mining venture. The venture could pay back 50 to 100 times the investment if successful. If the mine is a bust, the entire investment is worthless. Your friend estimates the chance of success is only 20%. If you had the money, how much would you invest?",
        options: [
            { text: "Nothing", score: 1 },
            { text: "One month's salary", score: 2 },
            { text: "Three months' salary", score: 3 },
            { text: "Six months' salary", score: 4 },
        ],
    }
];
