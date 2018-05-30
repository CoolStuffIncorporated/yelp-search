import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Components/Search.jsx';
import Display from './Components/Display.jsx';
import axios from 'axios';

let dummyBiz = {
  "id": "x7hsZRd_MyrUgAW91FM9qA",
  "alias": "bensons-nyc-new-york",
  "name": "Benson's NYC",
  "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/IRDAMx_lRnwe36Uh0n8ZnA/o.jpg",
  "url": "https://www.yelp.com/biz/bensons-nyc-new-york?adjust_creative=gKPrJPaKyzvmkacQvhrozQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=gKPrJPaKyzvmkacQvhrozQ",
  "display_phone": "(646) 791-5765",
  "review_count": 282,
  "rating": 4.5,
  "location": {
      "address1": "181 Essex St",
      "address2": null,
      "address3": "",
      "city": "New York",
      "zip_code": "10002",
      "country": "US",
      "state": "NY",
      "display_address": [
          "181 Essex St",
          "New York, NY 10002"
      ],
      "cross_streets": "Houston St & Avenue A"
  },
  "photos": [
      "https://s3-media1.fl.yelpcdn.com/bphoto/IRDAMx_lRnwe36Uh0n8ZnA/o.jpg",
      "https://s3-media4.fl.yelpcdn.com/bphoto/MwrXOCQg8_oOFHUTyVJ1hA/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/IqwvRoVNmIiUHTlCWDtzXg/o.jpg"
  ],
  "price": "$$"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [dummyBiz],
      restaurants: [dummyBiz],
      currentIndex: 0,
      restaurantID: "x7hsZRd_MyrUgAW91FM9qA"
    }
    // this.fetchDetails = this.fetchDetails.bind(this);
    // this.fetchDetails = this.fetchDetails.bind(this);
    // this.showFavorites = this.showFavorites.bind(this);
  }
  // showFavorites() {
  //   axios.get('/faves')
  //     .then(({res}) => this.setState({ favorites: data}))
  //     .catch(({err})=> console.log({err}))
  // }
  componentDidMount() {
    // e.preventDefault();
    // this.fetchRestaurant();
  }
  fetchRestaurants() {
    // axios.get('/restaurants')
    //   .then(({response}) => this.setState({ restaurants: [data.businesses, ...state]}))
    //   .catch((err) => console.log(`Error in fetchRestaurants: ${err}`))
  }
  fetchRestaurant() {
    // axios.get('/restaurant')
    //   .then(({response}) => { this.setState({ restaurant: data.businesses[0] })})
    //   .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">The Amazing Restaurant Finder</header>
        {/* <Search /> */}
        <Display restaurant={this.state.restaurants[this.state.currentIndex]} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));























/* IGNORE THIS WORK ON CONTEXT API */
// const MyContext = React.createContext();

// class MyProvider extends Component {
//   state = {
//     favorites: [dummyBiz],
//     restaurants: [dummyBiz],
//     currentRestaurant: dummyBiz,
//     restaurantID: "x7hsZRd_MyrUgAW91FM9qA"
//   }
//   render() {
//     return (
//       <MyContext.Provider value={{state: this.state}}>
//       {this.props.children}
//       </MyContext.Provider>
//     )
//   }
// }

// ReactDOM.render(<MyProvider><App /></MyProvider>, document.getElementById('root'));

///////////////////////////////////////////////////////////////////////
