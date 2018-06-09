import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import Search from './Components/Search.jsx';
import Display from './Components/Display.jsx';
import Favorites from './Components/Favorites.jsx';
import { business, data } from './dummydata';

const businessIds = data.businesses.map(business => business.id); // dummy data for now

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      restaurants: [],
      index: 0,
      restaurantID: '',
      restaurant: null,
      offset: 0,
      user: 'anonymous',
      term: null,
      loc: null,
    }
    this.getFaves = this.getFaves.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.nextRestaurant = this.nextRestaurant.bind(this);
  }
  componentDidMount() {
    // setTimeout(() => this.getRestaurants('burgers', 10017), 1000); // for displaying loading bar
    this.getRestaurants('burgers', 10017);
    this.getFaves();
  }
  incrementOffSet() {
    let offset = ++this.state.offset;
    this.setState({offset});
    let {user, term, loc} = this.state;
    axios.put('/search', {user, term, loc, offset})
      .then(data => console.log('incremented offset'))
      .catch(err => console.error('error incrementing offset', err));
  }
  getFaves() {
    axios.get('/faves')
      .then(({data}) => this.setState({favorites: data}))
      .catch(err => console.error(err));
  }
  getRestaurants(term, loc, user = 'anonymous') { //@params: term('string'), loc('integer zipcode'), default params of tacos10017
    this.setState({term, loc});
    axios.get('/restaurants', {params: {user, term, loc}})
      .then(({data}) => {console.log(data); return data})
      .then(({restaurants, offset}) => this.setState({restaurants, offset}))
      .then(() => this.setState({restaurantID: this.state.restaurants[this.state.index].id}))
      .then(() => this.getRestaurant(this.state.restaurantID))
      .catch(err => console.log(`Error in fetchRestaurants: ${err}`));
  }
  getRestaurant(id) { //@params: id('string')
    //helper func for moving to next restaurant, invoked in both save & skip funcs in Display component
    axios.get('/restaurant', {params: {id}})
      .then(({data}) => this.setState({ restaurant: data }))
      .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }

  nextRestaurant() {
    let index = this.state.index === this.state.restaurants.length - 1 ? 0 : ++this.state.index;
    this.setState({index, restaurantID: this.state.restaurants[index].id},
      () => this.getRestaurant(this.state.restaurantID));
    this.incrementOffSet();
  }

  render() {
    let FoodSwiper = (props) => {
      // if (!this.state.restaurant) return <div className="progress"><div className="indeterminate">LOADING</div></div>;
      if (!this.state.restaurant) return <div className="loading"><img src=".\assets\loader-2_food.gif" /></div>;
      return (
        <div id="container">
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

///////////////////////////////////////////////////////////////////////\
