
import React, { Component } from 'react';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl : false
    }
    this.onHover = this.onHover.bind(this); // displays url
  }

  onHover () {
    // console.log('on the url');
    this.setState({
      showUrl : true
    })
  }
 
  render () {
    return (
      <ul className="favorites-all">
          {/*loop through all fave restaurants, render to page with approp. props from DB*/}
        {this.props.favorites.map((favorite) => {
            console.log(favorite);
            return ( 
              <li className="favorite-item" onMouseOver={() => {this.onHover()}}> {/*creates Mousover event*/}
                <img src={favorite.image_url}/>
                <div className="favorite-description">
                  <h4>{favorite.name}</h4>
                  <section className="restaurant-details">
                    <div className="restaurant-contact-info">
                      <span>Phone: {favorite.display_phone}</span>
                      <span>Location: {favorite.location}</span>
                      {/* <span>url {favorite.url}</span> */}{/*no need to dispaly url since hovered over*/}
                    </div>
                  </section>
                </div>
                {this.state.showUrl ? <Hover favorite={favorite}/> : null} {/*should dispaly url if hovered over*/}
              </li>
            )
        })}
     </ul>
    )
  }

}


export default Favorites;