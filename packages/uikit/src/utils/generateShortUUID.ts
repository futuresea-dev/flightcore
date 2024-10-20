export function generateShortUUID(): string {
  // Function to generate a random integer between min and max
  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Function to generate a random 8-character string
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += randomInt(0, 15).toString(16)
  }
  return result
}
