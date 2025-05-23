import "./Die.css"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  }
  return (
    <button className="die" onClick={props.hold} style={styles}>
      {props.value}
    </button>
  )
}
