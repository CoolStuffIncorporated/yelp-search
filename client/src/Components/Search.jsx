import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTypes: ['tacos', 'burgers', 'hot dogs', 'salad', 'ramen'],
      zip: null,
      foodType: 'tacos',
    };
    this.inputZip = this.inputZip.bind(this);
    this.inputFood = this.inputFood.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }
  inputZip(e) {
    this.setState({ zip: e.target.value });
  }
  checkEnter(e) {
    if (e.key === 'Enter') {
      console.log(`Getting restaurants of: ${this.state.foodType}, ${this.state.zip}`);
      this.props.getRestaurants(this.state.foodType, this.state.zip);
    }
  }
  inputFood(e) {
    this.setState({ foodType: e.target.value });
  }
  render() {
    return (
      <div className="search">
      <select className="browser-default" onChange={this.inputFood}>
        {this.state.foodTypes.map(foodType => <option key={foodType}>{foodType}</option>)}
      </select>
        <input placeholder="ZIP CODE" type="number" maxLength="5" min="10000" max="99999" onChange={this.inputZip} onKeyUp={this.checkEnter}/>
      </div>
    );
  }
}

export default Search;

