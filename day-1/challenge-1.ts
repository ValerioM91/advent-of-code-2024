import { challengeInput, exampleInput } from './data'

type Lists = {
  list1: number[]
  list2: number[]
}
const getSortedLists = (input: string) => {
  const lists = input.split('\n').reduce(
    (acc: Lists, cur) => {
      if (!cur) return acc
      const [a, b] = cur.split('   ')
      acc.list1.push(+a)
      acc.list2.push(+b)
      return acc
    },
    { list1: [], list2: [] }
  )

  return { list1: lists.list1.sort(), list2: lists.list2.sort() }
}

const findAndAddDifferences = (lists: Lists) => {
  const differences = lists.list1.map((num, i) => {
    return Math.abs(num - lists.list2[i])
  })
  return differences.reduce((acc, cur) => acc + cur, 0)
}

const exampleList = getSortedLists(exampleInput)
const exampleResult = findAndAddDifferences(exampleList)
console.log(exampleResult)

const challengeLists = getSortedLists(challengeInput)
const challengeResult = findAndAddDifferences(challengeLists)
console.log(challengeResult)
