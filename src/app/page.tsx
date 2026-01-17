import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-zinc-800 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center font-bold text-xl tracking-tighter" href="#">
          <Zap className="h-6 w-6 text-emerald-500 mr-2" />
          ROBO<span className="text-emerald-500">ADVISOR</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:text-emerald-400 transition-colors" href="/login?signup=true">
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                  Invest Smart. <br />Grow Faster.
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The modern robo-advisor for the Hungarian market. Tailored portfolios based on your unique risk profile.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8">
                  <Link href="/login">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 px-8">
                  View Portfolios
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-24 bg-zinc-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="h-10 w-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">Secure & Compliant</h3>
                <p className="text-zinc-500">Built with enterprise-grade security and Hungarian regulatory standards in mind.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <BarChart3 className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Data-Driven Choices</h3>
                <p className="text-zinc-500">Our algorithms optimize for the best risk-adjusted returns using historical market data.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Zap className="h-10 w-10 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold">Instant Setup</h3>
                <p className="text-zinc-500">Go from risk quiz to diversified portfolio in less than 5 minutes.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="h-14 flex items-center border-t border-zinc-800 px-4 md:px-6">
        <p className="text-xs text-zinc-500">© 2026 RoboAdvisor Inc. All rights reserved.</p>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-zinc-500" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-zinc-500" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
