import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import ReactTransitions from 'react-transitions';
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
      restaurant: null,
      restaurantInfo: null,
      isHidden: true,
    };
    this.getFaves = this.getFaves.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.getRestaurant = this.getRestaurant.bind(this);
    this.getFaves = this.getFaves.bind(this);
    this.nextRestaurant = this.nextRestaurant.bind(this);
    console.log('current state of App', this.state);
  }
  componentDidMount() {
    // this.getRestaurant(this.state.restaurantID);
    this.getRestaurants();
    this.getFaves();
  }
  getFaves() {
    axios.get('/faves')
      .then(({ data }) => this.setState({ favorites: data }))
      .catch(err => console.error(err));
  }
  getRestaurants(term = 'tacos', loc = 10017) { //@params: term('string'), loc('integer zipcode'), default params of tacos10017
    console.log('fetching restaurants of', term, loc);
    axios.get('/restaurants', { params: { term, loc } })
      .then(({ data }) => this.setState({ restaurants: data }))
      .then(() => console.log('get res, state', this.state))
      .then(() => this.setState({ restaurantID: this.state.restaurants[this.state.currentIndex].id }))
      .then(() => this.getRestaurant(this.state.restaurantID))
      .catch(err => console.log(`Error in fetchRestaurants: ${err}`));
  }
  getRestaurant(id) { //@params: id('string')
    //helper func for moving to next restaurant, invoked in both save & skip funcs in Display component
    axios.get('/restaurant', { params: { id } })
      .then(({ data }) => this.setState({ restaurant: data }))
      .catch(err => console.log(`Error inside fetchRestaurant: ${err}`))
  }

  nextRestaurant (nextIndex) { //@params: the next Index, passed down to child via props
    // helper func that moves down restuarant array to display next restaurant, and correspondingly set restaurant and restaurant id
    console.log('the next index', nextIndex);
    this.setState({
      currentIndex: nextIndex,
      restaurantID: this.state.restaurants[nextIndex].id,
    }, () => {
      // console.log('restaurant id', this.state.restaurantID);
      this.getRestaurant(this.state.restaurantID);
      if (nextIndex === 49) { // loops back through the array once limit (20) reached
        this.setState({
          currentIndex: 0,
        });
      }
    });
  }

  render() {
    const FoodSwiper = (props) => {
      if (!this.state.restaurant) return <div className="progress"><div className="indeterminate">LOADING</div></div>;
      return (
        <div>
          <Search getRestaurants={this.getRestaurants} />
          <Display restaurant={this.state.restaurant} getFaves={this.getFaves} nextRestaurant={this.nextRestaurant} currentIndex={this.state.currentIndex} nextIndex={this.state.currentIndex + 1} />
        </div>
      );
    };
    const Faves = props => <Favorites favorites={this.state.favorites} getFaves={this.getFaves} />;
    return (
      <div className="app">
        <Route exact path="/" render={FoodSwiper} />
        <Route path="/favorites" render={Faves} />
      </div>
    );
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
