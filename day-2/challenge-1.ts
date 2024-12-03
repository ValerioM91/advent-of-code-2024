import { challengeInput, exampleInput } from "./data"

type Report = number[]

const getReports = (input: string) => {
  const reports = input.split("\n").reduce((acc: Report[], curr) => {
    if (!curr) return acc
    const reportWithNumbers = curr.split(" ").map((n) => +n)
    acc.push(reportWithNumbers)
    return acc
  }, [])

  return reports
}

const isAlwaysIncreasingOrDecreasing = (report: Report) => {
  const originalString = report.join("")
  const sortedString = report.sort((a, b) => a - b).join("")
  const reverseString = report
    .sort((a, b) => b + a)
    .reverse()
    .join("")
  return originalString === sortedString || originalString === reverseString
}

const isElementDifferenceBetweenOneAndThree = (report: Report) => {
  for (let index = 0; index < report.length - 1; index++) {
    const current = report[index]
    const next = report[index + 1]
    const difference = Math.abs(next - current)
    if (difference === 0 || difference > 3) return false
  }
  return true
}

const getSafeReports = (input: string) => {
  const reports = getReports(input)

  let safeQuantity = 0
  reports.forEach((report) => {
    if (!isAlwaysIncreasingOrDecreasing(report)) return
    if (isElementDifferenceBetweenOneAndThree(report)) {
      safeQuantity++
    }
  })
  return safeQuantity
}

const exampleResult = getSafeReports(exampleInput)
console.log(exampleResult)

const challengeResult = getSafeReports(challengeInput)
console.log(challengeResult)
