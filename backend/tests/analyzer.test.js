import { analyze } from '../src/analyzer/analyzer.js'

test('detects billing', () => {
  const res = analyze('I need a refund for wrong charge')
  expect(res.category).toBe('Billing')
  expect(res.keywords).toEqual(expect.arrayContaining(['refund', 'charge']))
})

test('detects urgency', () => {
  const res = analyze('site is down urgent')
  expect(res.priority).toBe('P0')
  expect(res.urgency).toBe(true)
})

test('custom refund escalation rule', () => {
  const res = analyze('I was double charged and need a refund today')
  expect(res.category).toBe('Billing')
  expect(res.priority).toBe('P1')
  expect(res.keywords).toEqual(expect.arrayContaining(['refund', 'charge']))
})

test('uses only the requested categories', () => {
  const res = analyze('Please add this feature to my account page')
  expect(['Billing', 'Technical', 'Account', 'Feature Request', 'Other']).toContain(res.category)
})