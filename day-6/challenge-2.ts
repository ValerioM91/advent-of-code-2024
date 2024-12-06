import { exampleInput, challengeInput } from "./data"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Grid = string[][]

class Challenge {
  private grid: Grid
  private walkedCoordinates: string[] = []
  private uniqueCoordinates: string[]
  obstaclesCoordinates: string[] = []

  constructor(input: string) {
    this.grid = this.getGrid(input)
    this.moveStandardPath()
    this.uniqueCoordinates = [...new Set(this.walkedCoordinates)]
    this.findLoopObstacles()
    const result = this.countObstaclesCoordinates()
    console.log(result)
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

  private getNextCoordinates = (x: number, y: number, direction: Direction) => {
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

  private isOutOfBounds = (x: number, y: number, grid: Grid) =>
    x < 0 || y < 0 || x >= grid[0].length || y >= grid.length

  private isBlocked = (x: number, y: number, grid: Grid) => grid[y][x] === "#"

  private changeDirection = (direction: Direction) => {
    const directions: Direction[] = ["UP", "RIGHT", "DOWN", "LEFT"]
    const currentIndex = directions.indexOf(direction)
    const nextIndex = (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  private moveStandardPath = () => {
    let [x, y] = this.getStart()
    this.walkedCoordinates.push(`${x},${y}`)

    let direction: Direction = "UP"
    let walk = true

    while (walk) {
      const [nextX, nextY] = this.getNextCoordinates(x, y, direction)
      if (this.isOutOfBounds(nextX, nextY, this.grid)) {
        walk = false
        break
      }
      if (this.isBlocked(nextX, nextY, this.grid)) {
        direction = this.changeDirection(direction)
        continue
      }
      x = nextX
      y = nextY
      this.walkedCoordinates.push(`${x},${y}`)
    }
  }

  private checkObstaclePath = (grid: Grid, obstacleCoordinates: string) => {
    let [x, y] = this.getStart()
    const walkedCoordinates = [`${x},${y},UP`]

    let direction: Direction = "UP"

    let loop = true
    while (loop) {
      const [nextX, nextY] = this.getNextCoordinates(x, y, direction)

      if (this.isOutOfBounds(nextX, nextY, grid)) {
        loop = false
        break
      }

      if (walkedCoordinates.includes(`${nextX},${nextY},${direction}`)) {
        this.obstaclesCoordinates.push(obstacleCoordinates)
        loop = false
        break
      }

      if (this.isBlocked(nextX, nextY, grid)) {
        direction = this.changeDirection(direction)
        continue
      }

      x = nextX
      y = nextY
      walkedCoordinates.push(`${x},${y},${direction}`)
    }
  }

  private findLoopObstacles = () => {
    this.uniqueCoordinates.forEach((coordinate) => {
      const [x, y] = coordinate.split(",").map(Number)
      if (this.grid[y][x] === "#") return

      const newGrid = this.grid.map((row) => [...row.map((cell) => cell)])
      newGrid[y][x] = "#"
      this.checkObstaclePath(newGrid, coordinate)
    })
  }

  private countObstaclesCoordinates = () => {
    const startPoint = this.getStart().join(",")
    const uniqueObstacles = new Set(this.obstaclesCoordinates)
    uniqueObstacles.delete(startPoint)
    return uniqueObstacles.size
  }
}

new Challenge(exampleInput)
new Challenge(challengeInput)
