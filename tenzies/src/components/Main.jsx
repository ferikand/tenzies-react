import "./Main.css"
import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function Main() {
  const [dice, setDice] = useState(() => generateAllNewDice())

  const gameWon =
    dice.every((die) => die.isHeld === true) &&
    dice.every((die) => dice[0].value === die.value)

  if (gameWon) {
    console.log("Game won!")
  }

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
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <br />
      <button className="roll-dies" onClick={rollDice}>
        {gameWon === true ? "Game Won!" : "Roll Dice"}
      </button>
    </main>
  )
}
