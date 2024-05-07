// @ts-ignore
import evaluatex from 'evaluatex'

const ERROR = 0.000001

type Step = {
  prev: number,
  current: number,
  currentF: number,
  delta: number,
}

type solveReturn = {
  solution: number,
  steps: Step[],
}

export function solve(
  eq: string,
  left: number,
  right: number,
) : solveReturn {

  function f(x: number): number {
    return evaluatex(eq)({ x })
  }

  function derivative(x: number) {
    const d = 0.000001
    return (f(x + d) - f(x)) / d
  }

  if(f(left) === left) {
    return {
      solution: left,
      steps: []
    }
  }
  
  if(f(right) === right) {
    return {
      solution: right,
      steps: []
    }
  }

  if((f(left) - left) * (f(right) - right) > 0) {
    throw new Error('Mozda nema rešenja')
  }

  let i = left
  let q = Math.abs(derivative(i))
  while(i <= right) {
    const d = Math.abs(derivative(i))
    if(d > q) {
      q = d
    }
    i += 0.1
  }

  if(q > 1) {
    throw new Error('Funkcija nije kontrakcija')
  } 

  const criteria = q <= 0.5 ? ERROR : (1 - q) / q * ERROR

  let prev = left
  let current = f(left)

  const steps = [] as Step[]
  steps.push({
    prev,
    current,
    currentF: f(current),
    delta: Math.abs(current - prev),
  })

  while(Math.abs(current - prev) > criteria) {
    const tempCurrent = current
    current = f(current)
    prev = tempCurrent

    steps.push({
      prev: tempCurrent,
      current: current,
      currentF: f(current),
      delta: Math.abs(current - tempCurrent),
    })
  }

  return {
    solution: current,
    steps,
  }
}





