import "./style.css"
import { shuffle } from "./shuffle"

const cards = ["1", "2", "3", "4", "5", "6"]

document.querySelector(".card-container")!.innerHTML = cards
  .map(_ => `<div class='card-item'>${_}</div>`)
  .join("")

let selectedCard: number | null = null
let selectedCardIndex: number | null = null

Array.from(document.querySelectorAll(".card-item")).forEach((card, index) => {
  card.addEventListener("click", () => {
    selectedCard = index
    const id = startShffle()
    setTimeout(() => {
      clearInterval(id)
    }, 5000)
  })
})

const startShffle = () => {
  selectedCardIndex = selectedCard
  return setInterval(() => {
    const { swappedIndexes } = shuffle(cards) //변경할 카드 번호
    if (selectedCard && swappedIndexes.includes(selectedCard)) {
      selectedCardIndex = swappedIndexes.filter(i => i !== selectedCard)[0]
    }

    const cardElements = Array.from(document.querySelectorAll<HTMLElement>(".card-item"))
    const [i, j] = swappedIndexes
    // 각 카드의 현재 위치를 계산
    const cardI = cardElements[i].getBoundingClientRect()
    const cardJ = cardElements[j].getBoundingClientRect()

    // 이동해야 할 거리 계산
    const translateX = cardJ.left - cardI.left

    // 이동 애니메이션 적용
    cardElements[i].style.transform = `translateX(${translateX}px)`
    cardElements[j].style.transform = `translateX(${-translateX}px)`

    // 애니메이션 완료 후 order 변경 및 transform 초기화
    setTimeout(() => {
      const orderI = cardElements[i].style.order
      const orderJ = cardElements[j].style.order
      cardElements[i].style.order = orderJ
      cardElements[j].style.order = orderI

      cardElements[i].style.transform = ""
      cardElements[j].style.transform = ""
    }, 100)
  }, 1000)
}
