import { challengeInput, exampleInput } from "./data"

type Report = number[]
type Direction = "increasing" | "decreasing"

class SafeReports {
  private reports: Report[]
  safeReportsQuantity: number
  constructor(private input: string) {
    this.reports = this.getReports()
    this.safeReportsQuantity = this.getSafeReports()
  }

  private getReports = () => {
    const reports = this.input.split("\n").reduce((acc: Report[], curr) => {
      if (!curr) return acc
      const reportWithNumbers = curr.split(" ").map(n => +n)
      acc.push(reportWithNumbers)
      return acc
    }, [])
    return reports
  }

  private getDifference = (current: number, next: number, direction: Direction) =>
    direction === "increasing" ? next - current : current - next

  private isDifferenceOK = (difference: number) => difference > 0 && difference <= 3

  private findIncreasingOrDecreasing = (report: Report): Direction => {
    let sumOfDifferences = 0
    report.forEach((curr, index) => {
      const next = report[index + 1]
      if (next) {
        return next - curr > 0 ? sumOfDifferences++ : sumOfDifferences--
      }
    })
    return sumOfDifferences > 0 ? "increasing" : "decreasing"
  }

  private isValidReport = (report: Report) => {
    const direction = this.findIncreasingOrDecreasing(report)

    let remainingSkips = 1
    let index = 0
    let current = report[index]
    let next = report[index + 1]

    while (next !== undefined) {
      const difference = this.getDifference(current, next, direction)

      if (this.isDifferenceOK(difference)) {
        index++
      } else {
        if (!remainingSkips) return false
        const nextNext = report[index + 2]
        const differenceCurrentAndNextNext = this.getDifference(current, nextNext, direction)
        const differenceNextAndNextNext = this.getDifference(next, nextNext, direction)

        // It means only the last level is wrong
        if (isNaN(differenceCurrentAndNextNext) && isNaN(differenceNextAndNextNext)) {
          return true
        }

        if (this.isDifferenceOK(differenceCurrentAndNextNext)) {
          report.splice(index + 1, 1)
        } else if (index === 0 && this.isDifferenceOK(differenceNextAndNextNext)) {
          report.splice(0, 1)
        } else {
          return false
        }
        remainingSkips--
      }
      current = report[index]
      next = report[index + 1]
    }
    return true
  }

  private getSafeReports = () => {
    let safeQuantity = 0
    this.reports.forEach(report => {
      return this.isValidReport(report) && safeQuantity++
    })
    return safeQuantity
  }
}

const { safeReportsQuantity: exampleResult } = new SafeReports(exampleInput)
console.log(exampleResult)

const { safeReportsQuantity: challengeResult } = new SafeReports(challengeInput)
console.log(challengeResult)
