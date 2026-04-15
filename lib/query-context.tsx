"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Query, AIResponse, Claim } from "./types"

interface QueryContextType {
  queries: Query[]
  isLoading: boolean
  submitQuery: (question: string) => Promise<Query>
  clearHistory: () => void
}

const QueryContext = createContext<QueryContextType | undefined>(undefined)

// Sample responses for demo purposes
const sampleResponses = [
  {
    answer: "Based on extensive case analysis, climate change is primarily driven by human activities, particularly the burning of fossil fuels which releases greenhouse gases into the atmosphere. The Intergovernmental Panel on Climate Change (IPCC) has concluded with high confidence that human influence has warmed the climate at a rate unprecedented in at least the last 2,000 years.",
    trustScore: 92,
    claims: [
      { text: "Human activities are the primary driver of climate change", verified: true, source: "IPCC AR6 Report 2021" },
      { text: "Fossil fuel burning releases greenhouse gases", verified: true, source: "NASA Climate Science" },
      { text: "Current warming rate is unprecedented in 2,000 years", verified: true, source: "Nature Climate Change" },
      { text: "Multiple independent research bodies confirm this consensus", verified: true, source: "Scientific American" },
    ],
  },
  {
    answer: "The effectiveness of intermittent fasting varies significantly among individuals. Research suggests it can be beneficial for weight management and metabolic health in some populations, but results are not universal. A 2019 study in the New England Journal of Medicine found potential benefits for cellular health, though long-term effects require more research.",
    trustScore: 74,
    claims: [
      { text: "Intermittent fasting can aid weight management", verified: true, source: "NEJM 2019" },
      { text: "Benefits vary significantly among individuals", verified: true, source: "Cell Metabolism" },
      { text: "Potential benefits for cellular health exist", verified: true, source: "NEJM 2019" },
      { text: "Long-term effects require more research", verified: true, source: "Harvard Health" },
      { text: "Suitable for all age groups", verified: false, source: "Not verified" },
    ],
  },
  {
    answer: "Quantum computing represents a paradigm shift in computational capabilities, leveraging quantum mechanical phenomena like superposition and entanglement. Current quantum computers have achieved quantum supremacy in specific tasks, but general-purpose quantum computing remains years away from practical implementation.",
    trustScore: 85,
    claims: [
      { text: "Quantum computers use superposition and entanglement", verified: true, source: "Nature Physics" },
      { text: "Quantum supremacy achieved in specific tasks", verified: true, source: "Google AI 2019" },
      { text: "General-purpose quantum computing not yet practical", verified: true, source: "MIT Technology Review" },
      { text: "Error correction remains a significant challenge", verified: true, source: "Physical Review Letters" },
    ],
  },
  {
    answer: "The relationship between social media use and mental health is complex and bidirectional. While some studies suggest correlations between heavy social media use and increased anxiety or depression symptoms, particularly in adolescents, the causal relationship remains debated among researchers.",
    trustScore: 61,
    claims: [
      { text: "Correlation exists between heavy social media use and anxiety", verified: true, source: "JAMA Psychiatry" },
      { text: "Adolescents may be more vulnerable to negative effects", verified: true, source: "Lancet Child & Adolescent Health" },
      { text: "Causal relationship remains debated", verified: true, source: "American Psychological Association" },
      { text: "Social media directly causes depression", verified: false, source: "Not conclusively verified" },
      { text: "All social media use is harmful", verified: false, source: "Contradicted by evidence" },
    ],
  },
  {
    answer: "Based on available evidence, the claim appears to have limited support. While some anecdotal reports exist, peer-reviewed studies have not conclusively verified the stated benefits. We recommend exercising caution and consulting primary sources before accepting this information.",
    trustScore: 38,
    claims: [
      { text: "Some anecdotal evidence exists", verified: true, source: "Various sources" },
      { text: "No peer-reviewed studies confirm claims", verified: true, source: "PubMed search" },
      { text: "Primary sources should be consulted", verified: true, source: "General recommendation" },
      { text: "Claimed benefits are scientifically proven", verified: false, source: "Not verified" },
      { text: "Safe for all populations", verified: false, source: "Insufficient evidence" },
    ],
  },
]

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queries, setQueries] = useState<Query[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedQueries = localStorage.getItem("caseai_history")
    if (storedQueries) {
      const parsed = JSON.parse(storedQueries)
      setQueries(parsed.map((q: Query) => ({
        ...q,
        timestamp: new Date(q.timestamp),
        response: {
          ...q.response,
          timestamp: new Date(q.response.timestamp),
        },
      })))
    }
  }, [])

  const submitQuery = async (question: string): Promise<Query> => {
    setIsLoading(true)
    
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    // Select a random response and customize it slightly
    const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
    
    const response: AIResponse = {
      id: crypto.randomUUID(),
      answer: randomResponse.answer,
      trustScore: randomResponse.trustScore + Math.floor(Math.random() * 10) - 5,
      claims: randomResponse.claims.map((claim) => ({
        ...claim,
        id: crypto.randomUUID(),
      })) as Claim[],
      timestamp: new Date(),
    }
    
    const query: Query = {
      id: crypto.randomUUID(),
      question,
      response,
      timestamp: new Date(),
    }
    
    const updatedQueries = [query, ...queries]
    setQueries(updatedQueries)
    localStorage.setItem("caseai_history", JSON.stringify(updatedQueries))
    setIsLoading(false)
    
    return query
  }

  const clearHistory = () => {
    setQueries([])
    localStorage.removeItem("caseai_history")
  }

  return (
    <QueryContext.Provider value={{ queries, isLoading, submitQuery, clearHistory }}>
      {children}
    </QueryContext.Provider>
  )
}

export function useQuery() {
  const context = useContext(QueryContext)
  if (context === undefined) {
    throw new Error("useQuery must be used within a QueryProvider")
  }
  return context
}
