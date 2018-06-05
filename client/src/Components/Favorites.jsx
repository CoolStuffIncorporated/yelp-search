import React, { Component } from 'react';
import Hover from './Hover.jsx';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

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
      <ul className="favorites-all">
        <div><NavLink to="/">Home</NavLink></div>
        {this.props.favorites.map((favorite) => {
            return ( 
              <li key={favorite.id} className="favorite-item" onMouseEnter={() => {this.onHover()}} onMouseLeave={() => {this.onHover()}}>
                <img src={favorite.image_url} width="100px"/>
                <div className="favorite-description">
                  <h4>{favorite.name}</h4>
                  <section className="restaurant-details">
                    <div className="restaurant-contact-info">
                      <span>Phone: {favorite.display_phone}</span>
                      <span>Location: {favorite.location.display_address}</span>
                      <br></br>
                      {/* <span>Website</span> */}
                      <a href={favorite.url}>{favorite.name}</a>
                      <button className="waves-effects waves-light btn" onClick={() => this.handleDelete(favorite.id)}>Delete</button>
                    </div>
                  </section>
                </div>
                {/* {this.state.showUrl ? <Hover url={favorite.url}/> : null} */}
              </li>
            )
        })}
     </ul>
    )
  }

}


export default Favorites;