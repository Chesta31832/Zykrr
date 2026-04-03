export const weights = {
  Billing: { refund: 3, charge: 2, invoice: 2 },
  Technical: { error: 3, crash: 3, bug: 2, down: 4 },
  Account: { login: 2, password: 2, locked: 3 },
  'Feature Request': { feature: 2, request: 1, add: 1 },
}

export const urgencyWords = { urgent: 3, asap: 2, immediately: 3, down: 4 }

export const analyze = (text) => {
  const lower = String(text || '').toLowerCase()
  const scores = Object.fromEntries(Object.keys(weights).map((category) => [category, 0]))
  let urgencyScore = 0
  const matchedKeywords = []

  for (const [category, words] of Object.entries(weights)) {
    for (const [word, weight] of Object.entries(words)) {
      if (lower.includes(word)) {
        scores[category] += weight
        matchedKeywords.push(word)
      }
    }
  }

  for (const [word, weight] of Object.entries(urgencyWords)) {
    if (lower.includes(word)) {
      urgencyScore += weight
      if (!matchedKeywords.includes(word)) {
        matchedKeywords.push(word)
      }
    }
  }

  const hasRefundRequest = lower.includes('refund') && (lower.includes('charge') || lower.includes('double charged') || lower.includes('wrong charge'))

  const sortedCategories = Object.entries(scores).sort((left, right) => right[1] - left[1])
  const [category, score] = sortedCategories[0] || ['Other', 0]
  const resolvedCategory = score > 0 ? category : 'Other'
  const confidence = resolvedCategory === 'Other' ? 0.1 : Math.min(score / 6, 1)

  let priority = 'P3'
  if (urgencyScore > 3) priority = 'P1'
  if (urgencyScore > 5 || scores.Technical > 4) priority = 'P0'
  if (hasRefundRequest) priority = 'P1'

  return {
    category: resolvedCategory,
    priority,
    urgency: urgencyScore > 0,
    confidence,
    keywords: [...new Set(matchedKeywords)],
  }
}
