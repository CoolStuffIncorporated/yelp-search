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
  nextRestaurant() {  //helper func for moving to next restaurant, invoked in both save & skip funcs
    
  }
  saveRestaurant() {  //makes POST req to our '/faves' endpoint, then shows next restaurant

  }
  skipRestaurant() { //(implement later) makes POST req to a '/dislikes' endpoint, then shows next restaurant

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