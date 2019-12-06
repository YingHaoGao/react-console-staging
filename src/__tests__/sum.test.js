import sum, { A } from '../__mocks__/sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('A.a to equal 1', () => {
  const a = new A()
  expect(a.a).toBe(1)
})
