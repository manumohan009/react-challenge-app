import { useState, useRef } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  const inputRef = useRef();

  function handleClick(event) {
    const inputValue = inputRef.current.value;
    setEnteredPlayerName(inputValue);
    playerName.current.value = '';
  }


  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity' } </h2>
      <p>
        <input ref={inputRef} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
