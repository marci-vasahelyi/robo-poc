import prisma from "@/lib/prisma";

export async function getUserProfile(userId: string) {
    return await prisma.user.findUnique({
        where: { id: userId },
    });
}

export async function updateUserProfile(userId: string, data: { riskScore?: number; horizonYears?: number; modelPortfolioId?: number }) {
    return await prisma.user.update({
        where: { id: userId },
        data,
    });
}

export async function createOrUpdateUser(userId: string, email: string) {
    return await prisma.user.upsert({
        where: { id: userId },
        update: { email },
        create: { id: userId, email },
    });
}
