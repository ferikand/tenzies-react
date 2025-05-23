import "./Main.css"
import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function Main() {
  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }))
  }

  function rollDice() {
    setDice((oldDie) =>
      oldDie.map((die) =>
        die.isHeld === false
          ? {
              ...die,
              value: Math.ceil(Math.random() * 6),
            }
          : die
      )
    )
  }

  function holdDice(dice) {
    setDice((prev) =>
      prev.map((die) => (die.id === dice.id ? { ...die, isHeld: true } : die))
    )
  }

  function hold(id) {
    setDice((oldDie) =>
      oldDie.map((die) =>
        die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die
      )
    )
  }

  const diceElements = dice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      onClick={() => holdDice(dice)}
      isHeld={dice.isHeld}
      hold={() => hold(dice.id)}
    />
  ))

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <br />
      <button className="roll-dies" onClick={rollDice}>
        Roll Dice
      </button>
    </main>
  )
}
