import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl : false
    }
    this.onHover = this.onHover.bind(this); // displays url
    console.log('props of Favorites', props);
  }
  
  onHover () {
      // console.log('on the url');
      this.setState({
          showUrl : true
        })
      }
      
      render () {
        console.log('props of Favorites in rendering', this.props);
    return (
      <ul className="favorites-all">
        <div><NavLink to="/">Home</NavLink></div>
        {this.props.favorites.map((favorite) => {
            // console.log(favorite);
            return ( 
              <li key={favorite.id} className="favorite-item" onMouseOver={() => {this.onHover()}}> {/*creates Mousover event*/}
                <img src={favorite.image_url} width="200px"/>
                <div className="favorite-description">
                  <h4>{favorite.name}</h4>
                  <section className="restaurant-details">
                    <div className="restaurant-contact-info">
                      <span>Phone: {favorite.display_phone}</span>
                      <span>Location: {favorite.location.display_address}</span>
                      {/* <span>url {favorite.url}</span> */}{/*no need to dispaly url since hovered over*/}
                    </div>
                  </section>
                </div>
                {/* {this.state.showUrl ? <Hover favorite={favorite}/> : null} should dispaly url if hovered over */}
              </li>
            )
        })}
     </ul>
    )
  }

}


export default Favorites;