import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTypes: ['burgers', 'hot dogs', 'salad', 'ramen', 'tacos', 'bakery', 'brewery', 'bubble tea', 'coffee', 'desserts', 'donuts', 'gelato', 'ice cream', 'poke', 'pretzels', 'chocolate', 'pasta', 'wineries', 'cheese', 'candy', 'halal', 'sushi'],
      zip: null,
      foodType: 'burgers',
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
    let imgPath = `./assets/yelp_logo/yelp_fullcolor_outline.png`;
    return (
        <div className="search">
          <img className="yelp-logo" src={imgPath} />
          <select className="browser-default" onChange={this.inputFood}>
            {this.state.foodTypes.map(foodType => <option key={foodType}>{foodType}</option>)}
          </select>
            <input placeholder="ZIP CODE" type="number" maxLength="5" min="10000" max="99999" onChange={this.inputZip} onKeyUp={this.checkEnter}/>
        </div>
    );
  }
}

export default Search;

