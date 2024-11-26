import "./style.css"
import { shuffle } from "./shuffle"

const cards = ["1", "2", "3", "4", "5", "6"]

document.querySelector("#card-container")!.innerHTML = cards
  .map((card, i) => `<div class='card-item' style=order:${i}>${card}</div>`)
  .join("")

setInterval(() => {
  const { swappedIndexes } = shuffle(cards)
  const cardElements = Array.from(document.querySelectorAll<HTMLElement>(".card-item"))
  const [i, j] = swappedIndexes

  const orderI = cardElements[i].style.order
  const orderJ = cardElements[j].style.order
  cardElements[i].style.order = orderJ
  cardElements[j].style.order = orderI
}, 1000)
