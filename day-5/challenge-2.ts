import { exampleOrder, exampleInput, challengeInput, challengeOrder } from "./data"

type OrderMap = Record<number, number[]>

class Challenge {
  private orderMap: OrderMap
  private lines: number[][]
  private incorrectLines: number[][]
  private reorderedLines: number[][]
  sum: number

  constructor(orderInput: string, linesInput: string) {
    this.orderMap = this.mapItemsToNextAndIndex(orderInput)
    this.lines = this.getLines(linesInput)
    this.incorrectLines = this.lines.filter((line) => !this.isInOrder(line))
    this.reorderedLines = this.incorrectLines.map(this.reorder)
    this.sum = this.getMiddleItemsSum()
  }

  private mapItemsToNextAndIndex = (orderInput: string) => {
    const map: OrderMap = {}
    orderInput.split("\n").forEach((line) => {
      if (!line) return
      const [item, next] = line.split("|")
      if (!map[+item]) {
        map[+item] = []
      }
      map[+item].push(+next)
    })
    return map
  }

  private getLines = (linesInput: string) =>
    linesInput
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split(",").map((item) => +item))

  private isInOrder = (line: number[]) => {
    for (let index = line.length - 1; index >= 0; index--) {
      const element = line[index]
      const itemsMustBeNext = this.orderMap[element]
      if (!itemsMustBeNext) continue
      for (let j = 0; j < index; j++) {
        const previousElement = line[j]
        if (itemsMustBeNext.includes(previousElement)) {
          return false
        }
      }
    }
    return true
  }

  private reorder = (line: number[]) => {
    const reordered: number[] = []
    for (let index = 0; index < line.length; index++) {
      const element = line[index]
      const itemsMustBeNext = this.orderMap[element]
      let newItemIndex = reordered.length
      for (const item of reordered) {
        if (itemsMustBeNext?.indexOf(item) > -1) {
          newItemIndex = reordered.indexOf(item)
          break
        }
      }
      reordered.splice(newItemIndex, 0, element)
    }
    return reordered
  }

  private getMiddleItemsSum = () =>
    this.reorderedLines.reduce((sum, line) => {
      if (this.isInOrder(line)) {
        const middle = line[Math.floor(line.length / 2)]
        sum += middle
      }
      return sum
    }, 0)
}

const exampleResult = new Challenge(exampleOrder, exampleInput).sum
console.log(exampleResult)

const challengeResult = new Challenge(challengeOrder, challengeInput).sum
console.log(challengeResult)
