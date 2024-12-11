import { challengeInput, exampleInput } from "./data"

class Challenge {
  private array: number[] = []
  count = 0

  constructor(input: string) {
    this.array = input.split(" ").map(Number)
    this.count = this.array.length
    this.calculate(25)
    console.log(this.count)
  }

  private blink(number: number) {
    if (number === 0) {
      return [1]
    }

    const digits = number.toString().split("")
    if (digits.length % 2 === 0) {
      this.count++
      const firstHalf = digits.slice(0, digits.length / 2)
      const secondHalf = digits.slice(digits.length / 2)
      return [+firstHalf.join(""), +secondHalf.join("")]
    }

    return [number * 2024]
  }

  private calculate(times: number) {
    for (let index = 0; index < times; index++) {
      for (let i = 0; i < this.array.length; i++) {
        const number = this.array[i]
        const newNumbers = this.blink(number)
        this.array.splice(i, 1, ...newNumbers)
        i += newNumbers.length - 1
      }
    }
  }
}

new Challenge(exampleInput)
new Challenge(challengeInput)
