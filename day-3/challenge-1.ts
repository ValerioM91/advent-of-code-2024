import { challengeInput, exampleInput } from "./data"

type Mul = `mul(${number},${number})`

const getValidMuls = (input: string): Mul[] => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g
  const muls = [...input.matchAll(regex)].map((match) => match[0]) as Mul[]
  return muls
}

const getTotal = (muls: Mul[]) => {
  const sum = muls.reduce((acc, curr) => {
    const [a, b] = curr.slice(4, -1).split(",")
    console.log(a, b)
    acc += +a * +b
    return acc
  }, 0)
  return sum
}

const getResult = (input: string) => {
  const muls = getValidMuls(input)
  const total = getTotal(muls)
  console.log(total)
  return total
}

getResult(exampleInput)
getResult(challengeInput)
