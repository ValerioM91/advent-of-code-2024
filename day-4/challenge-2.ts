import { exampleInput, challengeInput } from "./data"

type Arrays = string[][]

const createArrays = (input: string): Arrays => {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""))
}

const isMAS = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  const topLeft = arrays[arrayIndex - 1]?.[letterIndex - 1]
  const topRight = arrays[arrayIndex - 1]?.[letterIndex + 1]
  const bottomRight = arrays[arrayIndex + 1]?.[letterIndex + 1]
  const bottomLeft = arrays[arrayIndex + 1]?.[letterIndex - 1]

  const combinationOne = topLeft === "M" && topRight === "M" && bottomRight === "S" && bottomLeft === "S"
  const combinationTwo = topLeft === "S" && topRight === "S" && bottomRight === "M" && bottomLeft === "M"
  const combinationThree = topLeft === "M" && topRight === "S" && bottomRight === "S" && bottomLeft === "M"
  const combinationFour = topLeft === "S" && topRight === "M" && bottomRight === "M" && bottomLeft === "S"

  return combinationOne || combinationTwo || combinationThree || combinationFour
}

const getXmasQuantity = (input: string) => {
  const arrays = createArrays(input)
  let sum = 0
  arrays.forEach((array, arrayIndex) => {
    array.forEach((letter, letterIndex) => {
      if (letter !== "A") return
      if (isMAS(arrays, arrayIndex, letterIndex)) sum++
    })
  })
  console.log(sum)
  return sum
}

getXmasQuantity(exampleInput)
getXmasQuantity(challengeInput)
