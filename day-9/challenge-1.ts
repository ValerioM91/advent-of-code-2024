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

  private reorderDiskMap() {
    let startIndex = 0
    let endIndex = this.diskMap.length - 1

    while (startIndex < endIndex) {
      if (this.diskMap[startIndex] === ".") {
        const temp = this.diskMap[startIndex]
        this.diskMap[startIndex] = this.diskMap[endIndex]
        this.diskMap[endIndex] = temp
        endIndex--
      } else {
        startIndex++
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
