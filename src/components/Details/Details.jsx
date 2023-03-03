import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { DetailsContext } from "../../context/DetailsContext";

const Details = ({ text }) => {
  const { pressedKey , setPressedKey } = useContext(DetailsContext);

  // --- Аналог сomponentDidMount ---
  useEffect(() => {
    const onKeyDown = (event) => {
      setPressedKey(event.code);
    };

    window.addEventListener("keydown", onKeyDown);

    // --- Аналог componentWillUnmount ---
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setPressedKey]);


  return (
    <div>
      <h2>Details</h2>
      <p>
        <b>Text from props:</b> {text}
      </p>
      <p>
        <b>Pressed key:</b> {pressedKey}
      </p>
    </div>
  );
};

Details.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Details;
