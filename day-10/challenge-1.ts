import { exampleInput, challengeInput } from "./data"

type Grid = number[][]
type Node = [number, number]

class Challenge {
  private grid: Grid
  private trailHeads: Node[] = []
  validPathsCount: number

  constructor(input: string) {
    this.grid = this.getGrid(input)
    this.getTrailHeads()
    this.validPathsCount = this.countValidPaths()
    console.log(this.validPathsCount)
  }

  private getGrid(input: string) {
    return input
      .trim()
      .split("\n")
      .map((row) => row.split("").map(Number))
  }

  private getTrailHeads() {
    const trailHeads: Node[] = []
    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0) {
          trailHeads.push([x, y])
        }
      })
    })
    this.trailHeads = trailHeads
  }

  private isOutOfBounds = ([x, y]: Node) => x < 0 || y < 0 || x >= this.grid[0].length || y >= this.grid.length

  private findAdjacentNodes([x, y]: Node, value: number) {
    const left: Node = [x - 1, y]
    const right: Node = [x + 1, y]
    const up: Node = [x, y - 1]
    const down: Node = [x, y + 1]
    const positions = [left, right, up, down].filter(([x, y]) => !this.isOutOfBounds([x, y]))

    return positions.reduce((acc: Node[], node) => {
      if (this.grid[node[1]][node[0]] === value + 1) {
        acc.push(node)
      }
      return acc
    }, [])
  }

  private findPath(node: Node) {
    let value = 0
    let lastNodes = [node]
    while (value < 9) {
      const tempNodes = []
      for (const lastNode of lastNodes) {
        const adjacentNodes = this.findAdjacentNodes(lastNode, value)
        tempNodes.push(...adjacentNodes)
      }
      if (tempNodes.length === 0) {
        break
      }
      lastNodes = tempNodes
      value++
    }
    return new Set(lastNodes.map((node) => `${node[0]}$${node[1]}`)).size
  }

  private countValidPaths() {
    return this.trailHeads.reduce((acc, trailHead) => {
      return acc + this.findPath(trailHead)
    }, 0)
  }
}

new Challenge(exampleInput)
new Challenge(challengeInput)
