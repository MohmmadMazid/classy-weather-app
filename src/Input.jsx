import React from "react";

class Input extends React.Component {
  render() {
    return (
      <input
        type="text"
        placeholder="search for the location..."
        value={this.props.location}
        onChange={this.props.setLocation}
      />
    );
  }
}

export default Input;
