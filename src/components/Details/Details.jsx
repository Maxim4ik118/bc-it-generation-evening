import React, { Component } from "react";
import PropTypes from "prop-types";

class Details extends Component {
  onKeyDown = (event) => {
    this.props.handlePressKey(event.code);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown)

    /* 
      Метод спрацьовує після успішного 
      першого рендеру компоненти, та використовується для:
      
      1. Встановлення HTTP-запитів на сервер.
      2. Встановити setTimeout|setInterval
      3. Встановлення глобальних слухачів подій addEventListener
      4. Звертатися до зовнішніх АПІ (localStorage)
    */
  }

  componentDidUpdate(prevProps, prevState) {
    /* 
      Метод спрацьовує після оновлення компоненти, 
      та використовується для:
      
      1. Встановлення HTTP-запитів на сервер.
      2. Звертатися до зовнішніх АПІ (localStorage)
      3. Відслідкувати яке саме поле в стейті чи пропсах змінилося
    */
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown)
    /* 
      Метод спрацьовує перед повним видаленням 
      компоненти з ДОМ, та використовується для:

      1. Відхиляння HTTP-запитів.
      2. Очищати асинхронні таймери clearTimeout|clearInterval
      3. Видаляти глобальні слухачі подій removeEventListener
    */
  }

  render() {
    return (
      <div>
        <h2>Details</h2>
        <p>
          <b>Text from props:</b> {this?.props?.text}
          {/* this && this.props && this.props.text*/}
        </p>
        <p>
          <b>Pressed key:</b> {this.props.pressedKey}
        </p>
      </div>
    );
  }
}

Details.propTypes = {
  handlePressKey: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  pressedKey: PropTypes.string.isRequired,
};

export default Details;
