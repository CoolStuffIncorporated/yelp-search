import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import ReactTransitions from 'react-transitions';
import axios from 'axios';
// import Search from './Search.jsx';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      showInfo: false,
    };
    // this.skipRestaurant = this.skipRestaurant.bind(this); // implement later
    this.saveRestaurant = this.saveRestaurant.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }
  nextPhoto() {
    if (this.state.photoIndex === 2) this.setState({ photoIndex: 0 });
    else this.setState({ photoIndex: ++this.state.photoIndex });
  }

  saveRestaurant(fave) {
    console.log(`saving to faves ${fave}`);
    axios.post('/faves', { fave })
      .then(res => console.log('posted', res))
      .then(() => this.props.getFaves())
      .then(() => this.props.nextRestaurant(this.props.nextIndex))
      .catch(err => console.error(err));
  }

  // skipRestaurant(nextIndex, restaurant) { //(implement later) makes POST req to a '/dislikes' endpoint, then shows next restaurant
  //   this.props.nextRestaurant(nextIndex);  
  // }

  showInfo () {
    this.setState({
      showInfo: !this.state.showInfo,
    });
  }

  render() {
    const { restaurant, addFave } = this.props;
    const imgPath = `./assets/yelp_stars/${restaurant.rating}.png`;
    return (
      <div className="display">
        <div>
          <NavLink to="/favorites">
          <ReactTransitions
            transition="move-to-left-move-from-right"
            width={ 100 }
            height={ 50 }
          >
            {/* The child element put here changes with animation. */}
            {/* <img key="uniqueKey" src="..." /> */}
            <button className="waves-effects waves-light red btn" key="uniqueKey">Faves</button>
          </ReactTransitions>
          </NavLink></div>
          <h1>{restaurant.name}</h1>
          {/* <div className="rating">Rating: <span>{restaurant.rating}</span></div> */}
          <div className="rating"><img src={imgPath} /></div>
          { !this.state.showInfo
            ?
            <ReactTransitions
              transition="move-to-left-move-from-right"
              width={ 300 }
              height={ 600 }
            >
              <img key="uniqueKey" src={restaurant.photos[this.state.photoIndex]} onClick={() => this.nextPhoto()} /> 
            </ReactTransitions>
            :
            <div>
              <span>Phone: {restaurant.display_phone}</span><br></br>
              <a key="uniqueKey" href={restaurant.url}>{restaurant.name}</a><br></br>
              <span>Address: {restaurant.location.display_address}</span>
            </div>
          }
        <div>
          <button className="waves-effects waves-light red btn" onClick={() => this.props.nextRestaurant(this.props.nextIndex)}>Skip</button>
          <button className="waves-effects waves-light red btn" onClick={() => this.showInfo() }>{!this.state.showInfo ? 'Contact Info' : 'Tasty Pics'}</button>
          <button className="waves-effects waves-light red btn" onClick={() => this.saveRestaurant(restaurant)}>Save</button>
        </div>
        {/* <div className="description">
          {/* <p>{restaurant.location.display_address[0]}</p>
          <p>{restaurant.display_phone}</p> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Display;
