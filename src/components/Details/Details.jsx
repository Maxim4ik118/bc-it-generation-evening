import React, { Component } from "react";
import PropTypes from "prop-types";

class Details extends Component {
  render() {
    return (
      <div>
        <h2>Details</h2>
        <p>
          <b>Text from props:</b> {this.props.text}
        </p>
        <p>
          <b>Counter value from props:</b> {this.props.counterValue}
        </p>

        <button onClick={this.props.handleBtnClick}>Click me</button>
      </div>
    );
  }
}

Details.propTypes = {
  handleBtnClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  counterValue: PropTypes.number.isRequired,
};

export default Details;
