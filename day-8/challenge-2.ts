import { exampleInput, challengeInput } from "./data"

type Grid = string[][]
type Node = [number, number]
type FrequenciesWithCoordinates = Record<string, Node[]>

class Challenge {
  private grid: Grid
  private frequenciesWithCoordinates: FrequenciesWithCoordinates
  private antinodesCoordinates: Node[] = []
  uniqueAntinodesCoordinatesCount: number

  constructor(input: string) {
    this.grid = this.getGrid(input)
    this.frequenciesWithCoordinates = this.getFrequenciesWithCoordinates()
    this.findAntinodeLocations()
    this.uniqueAntinodesCoordinatesCount = this.countUniqueAntinodesCoordinates()
    console.log(this.uniqueAntinodesCoordinatesCount)
  }

  private getGrid(input: string) {
    return input
      .trim()
      .split("\n")
      .map((row) => row.split(""))
  }

  private getFrequenciesWithCoordinates() {
    const frequencies: FrequenciesWithCoordinates = {}
    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== ".") {
          if (!frequencies[cell]) {
            frequencies[cell] = []
          }
          frequencies[cell].push([x, y])
        }
      })
    })
    return frequencies
  }

  private isOutOfBounds = (x: number, y: number) => x < 0 || y < 0 || x >= this.grid[0].length || y >= this.grid.length

  private findAntinodes(a: Node, b: Node) {
    const distanceX = b[0] - a[0]
    const distanceY = b[1] - a[1]
    this.antinodesCoordinates.push(a)
    this.antinodesCoordinates.push(b)

    // Right loop
    let rightNode: Node | null = [b[0], b[1]]
    while (rightNode) {
      const antinode: Node = [rightNode[0] + distanceX, rightNode[1] + distanceY]
      if (this.isOutOfBounds(...antinode)) {
        rightNode = null
        break
      }
      rightNode = antinode
      this.antinodesCoordinates.push(antinode)
    }
    // Left loop
    let leftNode: Node | null = [a[0], a[1]]
    while (leftNode) {
      const antinode: Node = [leftNode[0] - distanceX, leftNode[1] - distanceY]
      if (this.isOutOfBounds(...antinode)) {
        leftNode = null
        break
      }
      leftNode = antinode
      this.antinodesCoordinates.push(antinode)
    }
  }

  private findAntinodeLocations() {
    for (const frequency in this.frequenciesWithCoordinates) {
      const frequencyAllCoordinates = this.frequenciesWithCoordinates[frequency]
      for (let index = 0; index < frequencyAllCoordinates.length; index++) {
        const currentElement = frequencyAllCoordinates[index]
        for (let j = index + 1; j < frequencyAllCoordinates.length; j++) {
          const compareElement = frequencyAllCoordinates[j]
          this.findAntinodes(currentElement, compareElement)
        }
      }
    }
  }

  private countUniqueAntinodesCoordinates() {
    return new Set(this.antinodesCoordinates.map((coordinate) => coordinate.join(","))).size
  }
}

new Challenge(exampleInput)
new Challenge(challengeInput)