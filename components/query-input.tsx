"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, Loader2 } from "lucide-react"

interface QueryInputProps {
  onSubmit: (query: string) => void
  isLoading: boolean
  placeholder?: string
}

export function QueryInput({ onSubmit, isLoading, placeholder = "Ask a question..." }: QueryInputProps) {
  const [query, setQuery] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSubmit(query.trim())
      setQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end rounded-2xl border border-border bg-card shadow-lg">
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="max-h-[200px] min-h-[56px] w-full resize-none bg-transparent py-4 pl-4 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        />
        <div className="absolute bottom-3 right-3">
          <Button
            type="submit"
            size="icon"
            disabled={!query.trim() || isLoading}
            className="h-8 w-8 rounded-lg bg-foreground text-background hover:bg-foreground/90 disabled:opacity-30"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowUp size={16} />
            )}
          </Button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        CaseAI provides answers with trust scores and claim verification. Always verify important information.
      </p>
    </form>
  )
}
