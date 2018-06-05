import { Component } from 'react';

class Hover extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    console.log(this.props.url);
    return (
      <div>
        {this.props.url}
      </div>
    );
  }
}

export default Hover;