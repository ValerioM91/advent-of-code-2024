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
    const combinations: string[] = []
    const totalCombinations = Math.pow(2, length)
    // Loop through all possible numbers from 0 to 2^length - 1
    for (let i = 0; i < totalCombinations; i++) {
      let combination = ""
      // Build the combination by checking each bit of the number
      for (let j = 0; j < length; j++) {
        combination += i & (1 << (length - j - 1)) ? "+" : "*"
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
        } else {
          return acc * item
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
