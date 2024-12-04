import { exampleInput, challengeInput } from "./data"

type Arrays = string[][]

const createArrays = (input: string): Arrays => {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""))
}

const checkLeft = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex]?.[letterIndex - 1] === "M" &&
    arrays[arrayIndex]?.[letterIndex - 2] === "A" &&
    arrays[arrayIndex]?.[letterIndex - 3] === "S"
  )
}

const checkRight = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex]?.[letterIndex + 1] === "M" &&
    arrays[arrayIndex]?.[letterIndex + 2] === "A" &&
    arrays[arrayIndex]?.[letterIndex + 3] === "S"
  )
}

const checkTop = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex - 1]?.[letterIndex] === "M" &&
    arrays[arrayIndex - 2]?.[letterIndex] === "A" &&
    arrays[arrayIndex - 3]?.[letterIndex] === "S"
  )
}

const checkBottom = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex + 1]?.[letterIndex] === "M" &&
    arrays[arrayIndex + 2]?.[letterIndex] === "A" &&
    arrays[arrayIndex + 3]?.[letterIndex] === "S"
  )
}

const checkTopLeft = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex - 1]?.[letterIndex - 1] === "M" &&
    arrays[arrayIndex - 2]?.[letterIndex - 2] === "A" &&
    arrays[arrayIndex - 3]?.[letterIndex - 3] === "S"
  )
}

const checkTopRight = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex - 1]?.[letterIndex + 1] === "M" &&
    arrays[arrayIndex - 2]?.[letterIndex + 2] === "A" &&
    arrays[arrayIndex - 3]?.[letterIndex + 3] === "S"
  )
}

const checkBottomLeft = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex + 1]?.[letterIndex - 1] === "M" &&
    arrays[arrayIndex + 2]?.[letterIndex - 2] === "A" &&
    arrays[arrayIndex + 3]?.[letterIndex - 3] === "S"
  )
}

const checkBottomRight = (arrays: Arrays, arrayIndex: number, letterIndex: number) => {
  return (
    arrays[arrayIndex + 1]?.[letterIndex + 1] === "M" &&
    arrays[arrayIndex + 2]?.[letterIndex + 2] === "A" &&
    arrays[arrayIndex + 3]?.[letterIndex + 3] === "S"
  )
}

const methods = [
  checkLeft,
  checkRight,
  checkTop,
  checkBottom,
  checkTopLeft,
  checkTopRight,
  checkBottomLeft,
  checkBottomRight,
]

const getXmasQuantity = (input: string) => {
  const arrays = createArrays(input)
  let sum = 0
  arrays.forEach((array, arrayIndex) => {
    array.forEach((letter, letterIndex) => {
      if (letter !== "X") return
      methods.forEach((method) => {
        if (method(arrays, arrayIndex, letterIndex)) {
          sum++
        }
      })
    })
  })
  console.log(sum)
  return sum
}

getXmasQuantity(exampleInput)
getXmasQuantity(challengeInput)
