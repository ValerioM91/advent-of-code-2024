import { challengeInput, exampleInput2 } from "./data"

type Mul = {
  value: `mul(${number},${number})`
  index: number
}

class MullItOver {
  private muls: Mul[]
  private validIntervals: number[][]
  private validMuls: Mul[]
  total: number

  constructor(private input: string) {
    this.muls = this.getMulsWithIndexes(this.input)
    this.validIntervals = this.getValidIntervals(this.input)
    this.validMuls = this.getValidMuls()
    this.total = this.getTotal()
  }

  private getMulsWithIndexes = (input: string) => {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g
    const muls = [...input.matchAll(regex)].map((match) => ({
      value: match[0],
      index: match.index,
    })) as Mul[]
    return muls
  }

  private getValidIntervals = (input: string) => {
    const dontIndexes = [...input.matchAll(/don't\(\)/g)].map((match) => match.index)
    const doIndexes = [...input.matchAll(/do\(\)/g)].map((match) => match.index)
    const validIntervals = [[0, dontIndexes[0]]]

    let temp: null | number = dontIndexes[0]
    while (temp !== null) {
      const currentDontIndex = temp as number
      const nextDoIndex = doIndexes.find((doIndex) => doIndex > currentDontIndex)
      if (!nextDoIndex) {
        temp = null
        break
      }
      const nextDontIndex = dontIndexes.find((dont) => dont > nextDoIndex)
      validIntervals.push([nextDoIndex, nextDontIndex ?? Infinity])
      temp = nextDontIndex ?? null
    }

    return validIntervals
  }

  private isMulInValidInterval = (index: number) => {
    const interval = this.validIntervals.find((el) => {
      return el[1] > index && el[0] < index
    })
    return !!interval
  }

  private getValidMuls = () => {
    const validMuls: Mul[] = []
    this.muls.forEach((mul) => {
      if (this.isMulInValidInterval(mul.index)) {
        validMuls.push(mul)
      }
    })
    return validMuls
  }

  private getTotal = () => {
    const sum = this.validMuls.reduce((acc, curr) => {
      const [a, b] = curr.value.slice(4, -1).split(",")
      acc += +a * +b
      return acc
    }, 0)
    return sum
  }
}

const exampleTotal = new MullItOver(exampleInput2).total
console.log(exampleTotal)

const challengeTotal = new MullItOver(challengeInput).total
console.log(challengeTotal)
