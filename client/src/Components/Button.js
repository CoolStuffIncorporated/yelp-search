import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button type="button" onClick={this.props.onClick}>Click</button>
    )
  }
}


class TextInput extends Component {
  render() {
    return (
      <input
        className={{'color': 'red'}} 
        onChange={this.props.onChange} value={}
      />
        Input
      </input>
    );
  }
}