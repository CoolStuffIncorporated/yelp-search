import React, { Component } from 'react';

class Favorites extends Component {
  constructor(props) {
    super(props);
    // this.state = {
       // no need for state, already have favorites coming in as props
       // just refer to faves in parent for current bizes
    // }
    // method binding here any methods needed?
            // to mouseover to show url
  }
 
  render () {
    return (
      <ul className="favorites_all">
          {/*loop through all fave restaurants, render to page with approp. props from DB*/}
        {this.props.restaurants.map((favorite) => {
            return ( 
              <li className="favorite_item">
                <img src={}/>
                <div className="favorite_description">
                  <h4>{favorite.title}</h4>
              </li>
            )
        })}
     </ul>
    )
  }

}













export default Favorites