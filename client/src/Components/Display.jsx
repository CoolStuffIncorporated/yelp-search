import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0
    }
    this.saveRestaurant = this.saveRestaurant.bind(this);
    this.nextRestaurant = this.nextRestaurant.bind(this);
  }
  nextPhoto() {
    if (this.state.photoIndex === 2) this.setState({photoIndex: 0})
    else this.setState({photoIndex: ++this.state.photoIndex});
  }
  nextRestaurant() {  //helper func for moving to next restaurant, invoked in both save & skip funcs
    console.log('loading next restaurant')
  }
  saveRestaurant(fave) {
    console.log(`saving to faves ${fave}`)
    axios.post('/faves', {fave})
      .then(res => console.log('posted', res))
      .then(() => this.props.getFaves())
      .then(() => this.nextRestaurant())
      .catch(err => console.error(err));
  }
  skipRestaurant() { //(implement later) makes POST req to a '/dislikes' endpoint, then shows next restaurant

  }
  render() {
    let {restaurant, addFave} = this.props;
    return (
      <div className="display">
        <div><NavLink to="/favorites">Faves</NavLink></div>
        <h1>{restaurant.name}</h1>
        <div className="rating">Rating: <span>{restaurant.rating}</span></div>
        <img width="300px" src={restaurant.photos[this.state.photoIndex]} onClick={() => this.nextPhoto()} />
        <div>
        <button class="waves-effects waves-light btn">Skip</button>
        <button class="waves-effects waves-light btn">Info</button>
        <button class="waves-effects waves-light btn" onClick={() => this.saveRestaurant(restaurant)}>Save</button>
        </div>
        <div className="description">
          {/* <p>{restaurant.location.display_address[0]}</p>
          <p>{restaurant.display_phone}</p> */}
        </div>
      </div>
    );
  }
}

export default Display;