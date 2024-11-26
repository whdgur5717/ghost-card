export const shuffle = (() => {
  let previousPair: [number, number] | undefined

  const shuffle = (arr: string[]) => {
    const candidate = []

    // filter로 제외할 것들 먼저 걸러내고 시작
    let availableIndexes = Array.from({ length: arr.length }, (_, i) => i).filter(
      index => !previousPair || !previousPair.includes(index)
    )

    // 두 개의 인덱스를 뽑음
    for (let i = 0; i < 2 && availableIndexes.length > 0; i++) {
      const randomIndex = Math.floor(
        (window.crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32 - 1)) *
          availableIndexes.length
      )
      candidate.push(availableIndexes[randomIndex])
      availableIndexes = availableIndexes.filter((_, idx) => idx !== randomIndex)
    }

    const [i, j] = candidate
    ;[arr[i], arr[j]] = [arr[j], arr[i]]

    previousPair = [i, j]
    return { arr, swappedIndexes: [i, j] }
  }

  return shuffle
})()
