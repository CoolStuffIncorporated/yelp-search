import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      showInfo: false
    }
    this.saveRestaurant = this.saveRestaurant.bind(this);
    // this.skipRestaurant = this.skipRestaurant.bind(this); // implement later
    this.showInfo = this.showInfo.bind(this);
  }
  nextPhoto() {
    if (this.state.photoIndex === 2) this.setState({photoIndex: 0})
    else this.setState({photoIndex: ++this.state.photoIndex});
  }

  saveRestaurant(fave) {
    console.log(`saving to faves ${fave}`)
    axios.post('/faves', {fave})
      .then(res => console.log('posted', res))
      .then(() => this.props.getFaves())
      .then(() => this.props.nextRestaurant(this.props.nextIndex))
      .catch(err => console.error(err));
  }

  // skipRestaurant(nextIndex, restaurant) { //(implement later) makes POST req to a '/dislikes' endpoint, then shows next restaurant
  //   this.props.nextRestaurant(nextIndex);
  // }


  showInfo (flippedBoolean) {
    this.setState({
      showInfo : flippedBoolean // refactor to just take flipped state, may not need to pass in any val, BUT set state async could cause issues
    })
  }

  render() {
    let {restaurant, addFave} = this.props;
    return (
      <div className="display">
        <div><NavLink to="/favorites">Faves</NavLink></div>
        <h1>{restaurant.name}</h1>
        <div className="rating">Rating: <span>{restaurant.rating}</span></div>
        { !this.state.showInfo 
          ? 
          <img width="300px" src={restaurant.photos[this.state.photoIndex]} onClick={() => this.nextPhoto()} /> 
          : 
          <div>
            <span>Address: {restaurant.location.display_address}</span><br></br>
            <span>Phone: {restaurant.display_phone}</span><br></br>
            <a href={restaurant.url}>{restaurant.name}</a>
          </div>
        }
        <div>
        <button class="waves-effects waves-light btn" onClick={() => this.props.nextRestaurant(this.props.nextIndex)}>Skip</button>
        <button class="waves-effects waves-light btn" onClick={() => this.showInfo(!this.state.showInfo) }>Info</button>
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