"use client"

import { Bot } from "lucide-react"

export function LoadingSkeleton() {
  return (
    <div className="flex gap-4 animate-in fade-in-0 slide-in-from-bottom-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
        <Bot size={20} className="text-accent-foreground" />
      </div>
      <div className="flex-1 space-y-4 pt-1">
        <div className="space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-accent" />
          <span>Analyzing claims and verifying sources...</span>
        </div>
      </div>
    </div>
  )
}
