import { analyze } from '../analyzer/analyzer.js'

export const analyzeTicketMessage = (message) => {
  const result = analyze(message)

  return {
    category: result.category,
    priority: result.priority,
    urgency: result.urgency,
    confidence: result.confidence,
    keywords: JSON.stringify(result.keywords),
  }
}
