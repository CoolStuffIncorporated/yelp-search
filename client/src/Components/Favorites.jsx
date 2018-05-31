import React, { Component } from 'react';
import Hover from './Hover.jsx';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl : false
    }
    this.onHover = this.onHover.bind(this);
  }

  onHover () {
    this.setState({
        showUrl : !this.state.showUrl
      })
  }

  
    render () {
      // console.log(this.props.favorites)
    return (
      <ul className="favorites-all">
          {/*loop through all fave restaurants, render to page with approp. props from DB*/}
        {this.props.favorites.map((favorite) => {
            return ( 
              <li key={favorite.id} className="favorite-item" onMouseEnter={() => {this.onHover()}} onMouseLeave={() => {this.onHover()}}>
                <img src={favorite.image_url}/>
                <div className="favorite-description">
                  <h4>{favorite.name}</h4>
                  <section className="restaurant-details">
                    <div className="restaurant-contact-info">
                      <span>Phone: {favorite.display_phone}</span>
                      <span>Location: {favorite.location.display_address}</span>
                      <br></br>
                      {/* <span>Website</span> */}
                      <a href={favorite.url}>{favorite.name}</a>
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