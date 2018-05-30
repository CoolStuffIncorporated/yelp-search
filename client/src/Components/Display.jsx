import React, { Component } from 'react';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0
    }
  }
  nextPhoto() {
    if (this.state.photoIndex === 2) this.setState({photoIndex: 0})
    else this.setState({photoIndex: ++this.state.photoIndex});
  }
  render() {
    let {restaurant} = this.props;
    return (
      <div className="display">
        <h1>{restaurant.name}</h1>
        <div className="rating">Rating: <span>{restaurant.rating}</span></div>
        <button>Skip </button>
        <img width="300px" src={restaurant.photos[this.state.photoIndex]} onClick={() => this.nextPhoto()} />
        <button>Save </button>
        <div className="description">
          <p>{restaurant.location.display_address[0]}</p>
          <p>{restaurant.display_phone}</p>
        </div>
      </div>
    );
  }
}

export default Display;