"use client"

import { getTrustLevel } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"

interface TrustBadgeProps {
  score: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function TrustBadge({ score, showLabel = true, size = "md" }: TrustBadgeProps) {
  const level = getTrustLevel(score)
  
  const config = {
    high: {
      icon: ShieldCheck,
      label: "High Trust",
      bgClass: "bg-trust-high/15",
      textClass: "text-trust-high",
      borderClass: "border-trust-high/30",
    },
    medium: {
      icon: Shield,
      label: "Medium Trust",
      bgClass: "bg-trust-medium/15",
      textClass: "text-trust-medium",
      borderClass: "border-trust-medium/30",
    },
    low: {
      icon: ShieldAlert,
      label: "Low Trust",
      bgClass: "bg-trust-low/15",
      textClass: "text-trust-low",
      borderClass: "border-trust-low/30",
    },
  }

  const { icon: Icon, label, bgClass, textClass, borderClass } = config[level]
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2",
  }
  
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        bgClass,
        textClass,
        borderClass,
        sizeClasses[size]
      )}
    >
      <Icon size={iconSizes[size]} />
      <span className="font-semibold">{score}%</span>
      {showLabel && <span className="opacity-80">{label}</span>}
    </div>
  )
}
