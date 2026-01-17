import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { processQuizResults } from "@/services/quizService";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { answers, horizonYears } = await request.json();
        const result = await processQuizResults(user.id, answers, horizonYears);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Quiz processing error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
