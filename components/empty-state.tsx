"use client"

import { Shield, Sparkles, CheckCircle2, Search } from "lucide-react"

export function EmptyState() {
  const features = [
    {
      icon: Shield,
      title: "Trust Scores",
      description: "Every response includes a confidence score based on source verification",
    },
    {
      icon: CheckCircle2,
      title: "Claim Verification",
      description: "Individual claims are checked against reliable sources",
    },
    {
      icon: Search,
      title: "Source Transparency",
      description: "See exactly where each piece of information comes from",
    },
  ]

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
        <Sparkles size={32} className="text-accent" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-foreground text-balance text-center">
        Ask anything, get verified answers
      </h2>
      <p className="mt-2 max-w-md text-center text-muted-foreground text-balance">
        CaseAI analyzes your questions and provides answers with trust scores and claim verification, so you know what to trust.
      </p>

      <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-border bg-card/50 p-4 text-center"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <feature.icon size={20} className="text-foreground" />
            </div>
            <h3 className="mt-3 font-medium text-foreground">{feature.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">Try asking:</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {[
            "What causes climate change?",
            "Is intermittent fasting effective?",
            "How do quantum computers work?",
          ].map((suggestion) => (
            <span
              key={suggestion}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
