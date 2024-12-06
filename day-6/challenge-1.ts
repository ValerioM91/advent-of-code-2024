import { exampleInput, challengeInput } from "./data"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

class Challenge {
  private grid: string[][]
  private walkedCoordinates: string[] = []
  uniqueCoordinatesCount: number

  constructor(input: string) {
    this.grid = this.getGrid(input)
    this.move("UP")
    this.uniqueCoordinatesCount = this.countUniqueCoordinates()
    console.log(this.uniqueCoordinatesCount)
  }

  private getGrid = (input: string) =>
    input
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split(""))

  private getStart = () => {
    const y = this.grid.findIndex((row) => row.includes("^"))!
    const x = this.grid[y].findIndex((cell) => cell === "^")!
    return [x, y] as const
  }

  private getNextCoordinates = (direction: Direction, x: number, y: number) => {
    switch (direction) {
      case "UP":
        return [x, y - 1]
      case "DOWN":
        return [x, y + 1]
      case "LEFT":
        return [x - 1, y]
      case "RIGHT":
        return [x + 1, y]
    }
  }

  private isOutOfBounds = (x: number, y: number) => x < 0 || y < 0 || x >= this.grid[0].length || y >= this.grid.length

  private isBlocked = (x: number, y: number) => this.grid[y][x] === "#"

  private changeDirection = (direction: Direction) => {
    const directions: Direction[] = ["UP", "RIGHT", "DOWN", "LEFT"]
    const currentIndex = directions.indexOf(direction)
    const nextIndex = (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  private move = (direction: Direction) => {
    let [x, y] = this.getStart()
    this.walkedCoordinates.push(`${x},${y}`)

    let walk = true

    while (walk) {
      const [nextX, nextY] = this.getNextCoordinates(direction, x, y)
      if (this.isOutOfBounds(nextX, nextY)) {
        walk = false
        break
      }
      if (this.isBlocked(nextX, nextY)) {
        direction = this.changeDirection(direction)
        continue
      }
      x = nextX
      y = nextY
      this.walkedCoordinates.push(`${x},${y}`)
    }
  }

  private countUniqueCoordinates = () => new Set(this.walkedCoordinates).size
}

new Challenge(exampleInput)
new Challenge(challengeInput)
