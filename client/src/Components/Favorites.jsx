import React, { Component } from 'react';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //    no need for state, already have favorites coming in as props
    //    just refer to faves in parent for current bizes
    }
    // method binding here any methods needed?
      // to mouseover to show url
      this.onHover = this.onHover.bind(this);
  }

//   onHover () {
//     console.log('on the url');

//   }
 
  render () {
    return (
      <ul className="favorites-all">
          {/*loop through all fave restaurants, render to page with approp. props from DB*/}
          {/*can add a mouseEnter event if so desired, right now url dispalying with contact info*/}
        {this.props.favorites.map((favorite) => {
            console.log(favorite);
            return ( 
              <li className="favorite-item">
                <img src={favorite.image_url}/>
                <div className="favorite-description">
                  <h4>{favorite.name}</h4>
                  <section className="restaurant-details">
                    <div className="restaurant-contact-info">
                      <span>Phone: {favorite.display_phone}</span>
                      <span>Location: {favorite.location}</span>
                      <span>url {favorite.url}</span>
                    </div>
                  </section>
                </div>
              </li>
            )
        })}
     </ul>
    )
  }

}


export default Favorites;