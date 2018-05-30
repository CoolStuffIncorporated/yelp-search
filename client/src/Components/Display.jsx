import React, { Component } from 'react';

class Display extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {restaurant} = this.props;
    return (
      <div className="display">
        <h1>{restaurant.name}</h1>
        <div className="rating">Rating: <span>{restaurant.rating}</span></div>
        <img width="300px" src={restaurant.photos[0]} />
        <div className="description">
          <p>{restaurant.location.display_address[0]}</p>
          <p>{restaurant.display_phone}</p>
        </div>
      </div>
    );
  }
}

export default Display;