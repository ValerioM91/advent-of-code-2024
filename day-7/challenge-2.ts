import { exampleInput, challengeInput } from "./data"

type Lines = {
  result: number
  items: number[]
}[]

type Combinations = Record<number, string[]>

class Challenge {
  private lines: Lines
  private combinations: Combinations = {}
  constructor(input: string) {
    this.lines = this.getLines(input)
    this.testOperations()
  }

  private getLines = (input: string): Lines =>
    input
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [result, items] = line.split(": ")
        return {
          result: Number(result),
          items: items.split(" ").map(Number),
        }
      })

  private generateCombinations(length: number) {
    const operators = ["+", "*", "|"]
    const combinations: string[] = []
    const totalCombinations = Math.pow(operators.length, length)
    // Loop through all possible numbers from 0 to characters^length - 1
    for (let i = 0; i < totalCombinations; i++) {
      let combination = ""

      // Build the combination by using modular arithmetic to determine which character to use
      let num = i
      for (let j = 0; j < length; j++) {
        combination = operators[num % operators.length] + combination
        num = Math.floor(num / operators.length)
      }

      combinations.push(combination)
    }
    this.combinations[length] = combinations
    return combinations
  }

  private testOperation = (items: number[], result: number) => {
    const combinationLength = items.length - 1
    const combinations = this.combinations[combinationLength] ?? this.generateCombinations(combinationLength)

    for (let index = 0; index < combinations.length; index++) {
      const operators = combinations[index].split("")
      const combinationResult = items.slice(1).reduce((acc, item, i) => {
        if (operators[i] === "+") {
          return acc + item
        } else if (operators[i] === "*") {
          return acc * item
        } else {
          return +`${acc}${item}`
        }
      }, items[0])

      if (combinationResult === result) {
        return true
      }
    }

    return false
  }

  private testOperations = () => {
    const sum = this.lines.reduce((sum, line) => {
      if (this.testOperation(line.items, line.result)) {
        sum += line.result
      }
      return sum
    }, 0)
    console.log(sum)
    return sum
  }
}

new Challenge(exampleInput)
new Challenge(challengeInput)
