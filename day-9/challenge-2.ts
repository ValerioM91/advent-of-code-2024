import { exampleInput, challengeInput } from "./data"

class Challenge {
  private diskMap: string[]
  checksum: number

  constructor(input: string) {
    this.diskMap = this.getDiskMap(input)
    this.reorderDiskMap()
    this.checksum = this.getChecksum()
    console.log(this.checksum)
  }

  private getDiskMap(input: string) {
    return input
      .trim()
      .split("")
      .reduce((diskMap: string[], char, index) => {
        let id = (index / 2).toString()
        if (index % 2 === 1) {
          id = "."
        }
        for (let i = 0; i < parseInt(char); i++) {
          diskMap.push(id)
        }
        return diskMap
      }, [])
  }

  private countNodes(index: number, char: string, direction: "left" | "right") {
    let count = 0
    while (this.diskMap[index] === char) {
      count++
      if (direction === "left") {
        index--
      } else {
        index++
      }
    }
    return count
  }

  private reorderDiskMap() {
    for (let i = this.diskMap.length - 1; i >= 0; i--) {
      if (this.diskMap[i] === ".") continue
      const nodes = this.countNodes(i, this.diskMap[i], "left")

      let leftIndex = 0
      while (leftIndex < i) {
        if (this.diskMap[leftIndex] !== ".") {
          leftIndex++
          continue
        }

        const freeNodes = this.countNodes(leftIndex, ".", "right")
        if (freeNodes >= nodes) {
          for (let n = 0; n < nodes; n++) {
            const temp = this.diskMap[leftIndex + n]
            this.diskMap[leftIndex + n] = this.diskMap[i - n]
            this.diskMap[i - n] = temp
          }
          break
        } else {
          leftIndex += freeNodes
        }
      }

      if (leftIndex >= i) {
        i -= nodes - 1
      }
    }
  }

  private getChecksum() {
    const sum = this.diskMap.reduce((sum, char, index) => {
      if (char === ".") return sum
      return sum + parseInt(char) * index
    }, 0)
    return sum
  }
}

new Challenge(exampleInput)
new Challenge(challengeInput)
