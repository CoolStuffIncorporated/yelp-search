import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Search from './Components/Search.jsx';
import Display from './Components/Display.jsx';
import Favorites from './Components/Favorites.jsx';
import { business, data } from './dummydata.js';

const businessIds = data.businesses.map(business => business.id); // dummy data for now

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
    this.getFaves = this.getFaves.bind(this);
    console.log('current state of App', this.state);
    this.getFaves = this.getFaves.bind(this);
    this.nextRestaurant = this.nextRestaurant.bind(this);
  }
  componentDidMount() {
    // this.getRestaurant(this.state.restaurantID);
    this.getRestaurants();
    this.getFaves();
  }
  getFaves() {
    axios.get('/faves')
      .then(({data}) => this.setState({favorites: data}))
      .catch(err => console.error(err));
  }
  getRestaurants(term = 'tacos', loc = 10017) { //@params: term('string'), loc('integer zipcode'), default params of tacos10017
    console.log('fetching restaurants of', term, loc)
    axios.get('/restaurants', {params: {term, loc}})
      .then(({data}) => this.setState({ restaurants: data}))
      // .then(() => console.log('get res, state', this.state))
      .then(() => this.setState({restaurantID: this.state.restaurants[this.state.currentIndex].id}))
      .then(() => this.getRestaurant(this.state.restaurantID))
      .catch(err => console.log(`Error in fetchRestaurants: ${err}`))
  }
  getRestaurant(id) { //@params: id('string')
    //helper func for moving to next restaurant, invoked in both save & skip funcs in Display component
    axios.get('/restaurant', {params: {id}})
      .then(({data}) => this.setState({ restaurant: data }))
      .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }

  nextRestaurant () { //@params: none, contorlled component that resets rest state
    // helper func that moves down restuarant array to display next restaurant, and set rest id correspondingly
    console.log('REST in next', this.state.currentIndex);
    console.log('REST in next', this.state.restaurant);
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      thisrestaurant: this.state.restaurants[this.state.currentIndex],
      restaurantID: this.state.restaurants[this.state.currentIndex].id,
    }, () => {
      console.log('current index', this.state.currentIndex);
      console.log('this.state.restaurant', this.state.restaurant);
    })
  }

  render() {
    let FoodSwiper = (props) => {
      if (!this.state.restaurant) return <div>LOADING</div>;
      return (
        <div>
          <Search getRestaurants={this.getRestaurants} />
          <Display restaurant={this.state.restaurant} getFaves={this.getFaves} nextRestaurant={this.nextRestaurant} />
        </div>
      )
    }
    let Faves = (props) => <Favorites favorites={this.state.favorites} getFaves={this.getFaves} />;
    return (
      <div className="app">
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