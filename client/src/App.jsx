import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Components/Search.jsx';
import Display from './Components/Display.jsx';
import axios from 'axios';

import {business, data} from './dummydata.js';
let businessIds = data.businesses.map(business => business.id); // dummy data for now

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [business],
      restaurants: businessIds,
      currentIndex: 0,
      restaurantID: "x7hsZRd_MyrUgAW91FM9qA",
      restaurant: business
    }
    // bind functions up here
    console.log(this.state.restaurants);
  }
  componentDidMount() {
    // this.getRestaurant('burgers', 11220)
  }
  getFaves() {
    axios.get('/faves')
      .then(({res}) => this.setState({ favorites: data}))
      .catch(({err})=> console.log({err}))
  }
  getRestaurants(term, loc) { //@params: term('string'), loc('number zip')
    axios.get('/restaurants', {params: {term, loc}})
    .then(data => console.log(data))// .then(({response}) => this.setState({ restaurants: data.businesses}))
    .catch((err) => console.log(`Error in fetchRestaurants: ${err}`))
  }
  getRestaurant(id) { //@params: id('string')
    //helper func for moving to next restaurant, invoked in both save & skip funcs in Display component
    axios.get('/restaurant', {params: {id}})  //send GET req to '/restaurant' endpoint
      .then(({response}) => { this.setState({ restaurant: data.business })})  // get the restaurant object back & setState
      .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }
  render() {
    return (
      <div className="app">
        <header className="navbar">The Amazing Restaurant Finder</header>
        {/* <Search /> */}
        <Display restaurant={this.state.restaurant} />
        {/* <Favorites favorites={this.state.favorites} /> */}
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
