import { challengeInput, exampleInput } from "./data"

type NumMap = Map<number, number>

class Challenge {
  map: NumMap = new Map()
  count: number
  constructor(input: string, times: number) {
    input
      .split(" ")
      .map(Number)
      .forEach((el) => this.map.set(el, this.map.get(el) || 0 + 1))
    this.calculate(times)
    this.count = [...this.map.values()].reduce((sum, el) => sum + el, 0)
    console.log(this.count)
  }

  private addToMap(number: number, quantity: number, map: NumMap) {
    map.set(number, (map.get(number) || 0) + quantity)
  }

  private calculate(times: number) {
    for (let index = 0; index < times; index++) {
      const newMap: NumMap = new Map()

      for (const [number, quantity] of this.map) {
        const digits = number.toString().split("")
        if (number === 0) {
          this.addToMap(1, quantity, newMap)
        } else if (digits.length % 2 === 0) {
          const firstHalf = +digits.slice(0, digits.length / 2).join("")
          const secondHalf = +digits.slice(digits.length / 2).join("")
          this.addToMap(firstHalf, quantity, newMap)
          this.addToMap(secondHalf, quantity, newMap)
        } else {
          this.addToMap(number * 2024, quantity, newMap)
        }
      }

      this.map = newMap
    }
  }
}

new Challenge(exampleInput, 25)
new Challenge(challengeInput, 75)
