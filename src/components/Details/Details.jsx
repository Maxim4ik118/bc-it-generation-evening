import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Details = ({ text, pressedKey, handlePressKey }) => {
  //     Getter  Setter
  const [count, setCount] = useState(null);

  const handleIncrement = () => {
    setCount(count === null ? 1 : (prevState) => prevState + 1);
  };

  const handleDecrement = () => {
    setCount(count === null ? -1 : (prevState) => prevState - 1);
  };

  // --- Аналог сomponentDidMount ---
  useEffect(() => {
    const onKeyDown = (event) => {
      handlePressKey(event.code);
    };

    window.addEventListener("keydown", onKeyDown);

    // --- Аналог componentWillUnmount ---
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handlePressKey]);

  // --- Аналог сomponentDidMount + componentDidUpdate ---
  useEffect(() => {
    // Не забути про перевірку на початкове значення
    // аби функція не спрацьовувала при першому рендері
    if (count === null) return;

    console.log("Count has changed!", count);
  }, [count]);


  return (
    <div>
      <h2>Details</h2>
      <p>
        <b>Text from props:</b> {text}
      </p>
      <p>
        <b>Pressed key:</b> {pressedKey}
      </p>
      <p>
        <b>Counter: </b> {count === null ? 0 : count}
      </p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
      <button type="button" onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
};

Details.propTypes = {
  handlePressKey: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  pressedKey: PropTypes.string.isRequired,
};

export default Details;
