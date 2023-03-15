import React, {  useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { setPressedKey } from "../../redux/productSlice";

const Details = ({ text }) => {
  // const { pressedKey , setPressedKey } = useContext(DetailsContext);
  const pressedKey = useSelector((state) => state.products.pressedKey);
  const dispatch = useDispatch();

  // --- Аналог сomponentDidMount ---
  useEffect(() => {
    const onKeyDown = (event) => {
      // setPressedKey(event.code);
      dispatch(setPressedKey(event.code));
    };

    window.addEventListener("keydown", onKeyDown);

    // --- Аналог componentWillUnmount ---
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);


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
