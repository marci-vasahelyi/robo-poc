"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RISK_QUESTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [horizon, setHorizon] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const totalSteps = RISK_QUESTIONS.length + 1; // +1 for horizon question
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleAnswer = (questionId: string, score: number) => {
        setAnswers({ ...answers, [questionId]: score });
        if (currentStep < totalSteps - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers, horizonYears: horizon }),
            });

            if (!response.ok) throw new Error("Failed to save results");

            toast.success("Risk assessment complete!");
            router.push("/portfolio");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Risk Assessment
                    </h1>
                    <p className="text-zinc-400">
                        Let's determine your investment profile. Step {currentStep + 1} of {totalSteps}
                    </p>
                    <Progress value={progress} className="h-2 bg-zinc-800" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {currentStep < RISK_QUESTIONS.length ? (
                            <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
                                <CardHeader>
                                    <CardTitle className="text-xl leading-relaxed text-zinc-100">
                                        {RISK_QUESTIONS[currentStep].text}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup
                                        value={answers[RISK_QUESTIONS[currentStep].id]?.toString()}
                                        onValueChange={(val) => handleAnswer(RISK_QUESTIONS[currentStep].id, parseInt(val))}
                                        className="space-y-3"
                                    >
                                        {RISK_QUESTIONS[currentStep].options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${answers[RISK_QUESTIONS[currentStep].id] === option.score
                                                        ? "border-emerald-500 bg-emerald-500/10"
                                                        : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
                                                    }`}
                                                onClick={() => handleAnswer(RISK_QUESTIONS[currentStep].id, option.score)}
                                            >
                                                <RadioGroupItem value={option.score.toString()} id={`opt-${idx}`} className="border-zinc-600 text-emerald-500" />
                                                <Label htmlFor={`opt-${idx}`} className="flex-1 cursor-pointer text-zinc-200">
                                                    {option.text}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                        Previous
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
                                <CardHeader>
                                    <CardTitle className="text-xl text-zinc-100">What is your investment horizon?</CardTitle>
                                    <CardDescription className="text-zinc-400">How many years do you plan to invest this money?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <Label htmlFor="horizon" className="text-zinc-300">Years: {horizon}</Label>
                                        <Input
                                            id="horizon"
                                            type="number"
                                            min={1}
                                            max={50}
                                            value={horizon}
                                            onChange={(e) => setHorizon(parseInt(e.target.value))}
                                            className="border-zinc-700 bg-zinc-800 text-white"
                                        />
                                        <p className="text-sm text-zinc-500 italic">
                                            Longer horizons generally allow for higher risk tolerance.
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between font-semibold">
                                    <Button variant="outline" onClick={prevStep} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white"
                                    >
                                        {loading ? "Calculating..." : "Finish Assessment"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
