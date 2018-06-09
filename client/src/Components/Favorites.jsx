import React, { Component } from 'react';
import Hover from './Hover.jsx';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl : false
    }
    this.onHover = this.onHover.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  onHover () {
    this.setState({
        showUrl : !this.state.showUrl
      })
  }
  handleDelete(id) {
    axios.delete('/faves', {data: {id}})
      .then(() => this.props.getFaves())
      .catch(err => console.error(err));
  }
  
    render () {
      // console.log(this.props.favorites)
    return (
      <div className="favorites">
        <div className="home-btn"><NavLink to="/">
        <button className="waves-effects waves-light red btn">Home</button>
        </NavLink></div>
        <ul className="favorites-container">
          {this.props.favorites.map((favorite) => {
              return ( 
                <li key={favorite.id} className="favorite-item" onMouseEnter={() => {this.onHover()}} onMouseLeave={() => {this.onHover()}}>
                  <div className="favorite-img">
                    <img src={favorite.image_url} width="100px"/>
                  </div>
                  <div className="favorite-description">
                    <h4>{favorite.name}</h4>
                    <section className="restaurant-details">
                      <div className="restaurant-contact-info">
                        <span>Phone: {favorite.display_phone}</span><br></br>
                        <span>Location: {favorite.location.display_address.join(', ')}</span>
                        <div></div>
                        <a className="waves-effects waves-light red btn" href={favorite.url}>{favorite.name}</a>
                        <button className="waves-effects waves-light red btn" onClick={() => this.handleDelete(favorite.id)}>Delete</button>
                      </div>
                    </section>
                  </div>
                </li>
              )
          })}
      </ul>
     </div>
    )
  }

}


export default Favorites;