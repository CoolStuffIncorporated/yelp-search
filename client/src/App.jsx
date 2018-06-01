import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Components/Search.jsx';
import Display from './Components/Display.jsx';
import Favorites from './Components/Favorites.jsx';
import axios from 'axios';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import {business, data} from './dummydata.js';
let businessIds = data.businesses.map(business => business.id); // dummy data for now

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      restaurants: [],
      currentIndex: 0,
      restaurantID: '',
      restaurant: null
    }
    
    this.getRestaurants = this.getRestaurants.bind(this);
    // this.postFaves = this.postFaves.bind(this);
    this.getFaves = this.getFaves.bind(this);
    console.log('current state of App', this.state);
    this.getRestaurants();
  }
  componentDidMount() {
    // this.getRestaurant(this.state.restaurantID);
  }

  getFaves() {
    axios.get('/faves')
      .then(favorite => console.log('client-side favorite', favorite))
      .catch((err) => { console.error(err); });
  }
  postFaves() {
    // let obj = { id: 'uniqueeeeee', name: 'bobbbby' };
    axios.post('/faves', obj)
      .then(posted => { console.log('posted', posted)})
      .catch(err => { console.log(err) });
  }

  getRestaurants(term = 'tacos', loc = 10017) { //@params: term('string'), loc('integer zipcode'), default params of tacos10017
    console.log('fetching restaurants of', term, loc)
    axios.get('/restaurants', {params: {term, loc}})
    // .then(({data}) => this.setState({ restaurants: data}))
    .then(({data}) => this.setState({ restaurants: data, favorites: data})) // also populate faves with the restaurants data for now
    .then(() => this.setState({restaurantID: this.state.restaurants[0].id}))
    .then(() => this.getRestaurant(this.state.restaurantID))
    // .then(() => console.log(this.state))
    .catch(err => console.log(`Error in fetchRestaurants: ${err}`))
  }
  getRestaurant(id) { //@params: id('string')
    //helper func for moving to next restaurant, invoked in both save & skip funcs in Display component
    axios.get('/restaurant', {params: {id}})
      .then(({data}) => this.setState({ restaurant: data }))
      .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }

  render() {
    let FoodSwiper = (props) => {
      if (!this.state.restaurant) return <div>LOADING</div>;
      return (
        <div>
          <Search getRestaurants={this.getRestaurants} />
        <Display restaurant={this.state.restaurant} />
        </div>
      )

    }
    let Faves = (props) => <Favorites favorites={this.state.favorites} />;
    return (
      <div className="app">
        {/* <header className="navbar">The Amazing Restaurant Finder</header> */}
        <Route exact path="/" render={FoodSwiper} />
        <Route path="/favorites" render={Faves} />
      </div>
    )
  }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));



{/* <Favorites favorites={this.state.favorites} /> */}
{/* <Display restaurant={this.state.restaurant} /> */}




















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
