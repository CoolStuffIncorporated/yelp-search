import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      showInfo: false
    }
    this.saveRestaurant = this.saveRestaurant.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }
  componentDidMount() {
    console.log('mounted Display');
  }
  nextPhoto() {
    let photoIndex = this.state.photoIndex === this.props.restaurant.photos.length - 1 ? 0 : ++this.state.photoIndex;
    this.setState({photoIndex});
  }

  saveRestaurant(fave) {
    console.log(`saving to faves ${fave}`)
    axios.post('/faves', {fave})
      .then(res => console.log('posted', res))
      .then(() => this.props.nextRestaurant())
      .then(() => this.props.getFaves())
      .catch(err => console.error(err));
  }

  showInfo () {
    this.setState({
      showInfo : !this.state.showInfo
    })
  }

  render() {
    let {restaurant, addFave} = this.props;
    let imgPath = `./assets/yelp_stars/${restaurant.rating}.png`;
    const Rating = (props) => (
      <CSSTransition timeout={300} classNames="example">
      <div className="rating"><img src={imgPath} /></div>
      </CSSTransition>
    );
    return (


      <div className="display">
      <div className="display-container">
        <div className="faves-btn"><NavLink to="/favorites">
        <img src="./assets/faves_bookmark.png"/>
        {/* <button className="waves-effects waves-light red btn">Faves</button> */}
        </NavLink></div>
        <h2>{restaurant.name}</h2>
        { !this.state.showInfo 
          ?
          <div className="displayed-img">
            <img src={restaurant.photos[this.state.photoIndex]} onClick={() => this.nextPhoto()} /> 
          </div>
          : 
          <div className="info-btns">
            <span>Phone: {restaurant.display_phone}</span><br></br>
            <u><a href={restaurant.url}>{restaurant.name}</a></u><br></br>
            <span>Address: {restaurant.location.display_address.join(', ')}</span>
          </div>
        }
        <Rating />
        <div className="display-btns">
          <button className="waves-effects waves-light red btn skip-btn" onClick={this.props.nextRestaurant}><i className="far fa-times-circle"></i> Skip</button>
          <button className="waves-effects waves-light red btn show-info-btn" onClick={() => this.showInfo() }>
          {!this.state.showInfo ?
          <span><i className="fas fa-info-circle"></i> Info</span> :
          <span><i className="fas fa-utensils"></i> Pics</span>}
          </button>
          <button className="waves-effects waves-light red btn save-btn" onClick={() => this.saveRestaurant(restaurant)}><i className="far fa-star"></i> Save</button>
        </div>
        <div className="description">
        </div>
      </div>
      </div>


    );
  }
}

export default Display;