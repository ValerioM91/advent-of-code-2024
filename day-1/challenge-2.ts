import { exampleInput, challengeInput } from './data'

type Lists = {
  list1: number[]
  list2: number[]
}
const getSortedLists = (input: string) => {
  return input.split('\n').reduce(
    (acc: Lists, cur) => {
      if (!cur) return acc
      const [a, b] = cur.split('   ')
      acc.list1.push(+a)
      acc.list2.push(+b)
      return acc
    },
    { list1: [], list2: [] }
  )
}

const mapItemsAndQuantities = ({ list1, list2 }: Lists) => {
  const map = new Map<number, number>()
  list1.forEach((num) => {
    if (map.has(num)) return
    const quantity = list2.filter((num2) => num2 === num).length
    map.set(num, quantity)
  })
  return map
}

const calculateSimilarityScore = (list1: number[], map: Map<number, number>) => {
  return list1.reduce((acc, curr) => {
    acc += curr * (map.get(curr) ?? 0)
    return acc
  }, 0)
}

const exampleLists = getSortedLists(exampleInput)
const exampleMap = mapItemsAndQuantities(exampleLists)
const exampleScore = calculateSimilarityScore(exampleLists.list1, exampleMap)
console.log(exampleScore)

const challengeLists = getSortedLists(challengeInput)
const challengeMap = mapItemsAndQuantities(challengeLists)
const challengeScore = calculateSimilarityScore(challengeLists.list1, challengeMap)
console.log(challengeScore)
