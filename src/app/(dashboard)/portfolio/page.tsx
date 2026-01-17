"use client";

import { useEffect, useState } from "react";
import { MODEL_PORTFOLIOS, PortfolioId } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, AlertTriangle, ArrowRight, PieChart } from "lucide-react";
import Link from "next/link";

interface UserProfile {
    riskScore: number;
    horizonYears: number;
    modelPortfolioId: PortfolioId;
}

export default function PortfolioPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/user/profile")
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500" />
            </div>
        );
    }

    if (!profile || !profile.modelPortfolioId) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">No Portfolio Found</h1>
                <p className="text-zinc-400 mb-6">You haven't completed your risk assessment yet.</p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-500">
                    <Link href="/quiz">Take Risk Quiz</Link>
                </Button>
            </div>
        );
    }

    const portfolio = MODEL_PORTFOLIOS[profile.modelPortfolioId];

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-10">
                <header className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Your Investment Strategy
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Based on your risk score of {profile.riskScore}/5 and {profile.horizonYears}-year horizon.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <PieChart className="h-32 w-32" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl text-emerald-400 flex items-center">
                                {portfolio.name} Portfolio
                            </CardTitle>
                            <CardDescription className="text-zinc-400 text-base">
                                {portfolio.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Expected Return</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-white">{portfolio.expectedReturn}%</span>
                                        <span className="text-zinc-500 text-sm">p.a.</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Est. Volatility</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-bold text-white">{portfolio.volatility}%</span>
                                        <span className="text-zinc-500 text-sm">Std Dev</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-semibold text-zinc-200">Asset Allocation</h3>
                                {portfolio.assets.map((asset, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-300">{asset.name}</span>
                                            <span className="font-bold text-white">{asset.allocation}%</span>
                                        </div>
                                        <Progress
                                            value={asset.allocation}
                                            className={`h-2 bg-zinc-800 ${i === 0 ? "text-emerald-500" : "text-blue-500"}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-zinc-800 bg-emerald-500/5 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-emerald-400 flex items-center">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Risk Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1">Score: {profile.riskScore}/5</div>
                                <p className="text-xs text-zinc-500">
                                    Your profile matches a {portfolio.name.toLowerCase()} approach.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-800 bg-cyan-500/5 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-cyan-400 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Growth Projection
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    With your {profile.horizonYears} year horizon, we estimate a potential
                                    re-balancing every 6 months to maintain this target allocation.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="pt-4">
                            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white" asChild>
                                <Link href="/quiz">
                                    Retake Quiz <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
