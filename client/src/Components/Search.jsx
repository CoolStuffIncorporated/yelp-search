import React, { Component } from 'react'; 
import axios from 'axios'; 
 
 
export default class Search extends Component { 
  constructor(props) { 
    super(props); 
    this.state = {  
      zip: 10001, 
      foodType: '' 
    } 
    this.onKeyPress = this.onKeyPress.bind(this); 
    this.fetchRestaurantIds = this.fetchRestaurantIds.bind(this); 
  } 
 
  onKeyPress(e) { 
    if (e.key === "enter") { 
      axios.get('/restaurants')
        .then()
        .catch()
    } 
  } 
 
  fetchRestaurantIds(zip) { 
    axios.get('/restaurants') 
      .then(resp => this.setState({ zip })) 
      .catch((err) => console.log(`error in fetch: ${err}`)) 
  } 
   
  render() { 
    let { zip } = this.state; 
    return ( 
      <div className="search"> 
        <input type="text" onKeyPress={zip} value={zip}/> 
      </div> 
    ); 
  }; 
} 
 