import React, { Component } from 'react';
let foodTypes = ['Asian fusion', 'barbeque', 'burgers', 'buffets', 'cafes', 'Cajun', 'chicken wings', 'Chinese', 'Greek', 'kebab', 'Mexican', 'pizza', 'sandwiches', 'Thai', 'soup', 'steak', 'waffles', 'vegan', 'tapas', 'hot dogs', 'salad', 'ramen', 'tacos', 'bakery', 'brewery', 'bubble tea', 'coffee', 'desserts', 'donuts', 'gelato', 'ice cream', 'poke', 'pretzels', 'chocolate', 'pasta', 'wineries', 'cheese', 'candy', 'halal', 'sushi'];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTypes ,
      zip: 10017,
      foodType: 'burgers',
    };
    this.inputZip = this.inputZip.bind(this);
    this.inputFood = this.inputFood.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.checkEnterFood = this.checkEnterFood.bind(this);
  }
  componentDidMount() {
    console.log('mounted Search');
    var input = document.getElementById("foodInput");
    new Awesomplete(input, {list: "#mylist", filter: Awesomplete.FILTER_STARTSWITH, minChars: 1, autoFirst: true});
  }
  inputZip(e) {
    this.setState({ zip: e.target.value });
  }
  checkEnter(e) {
    if (e.key === 'Enter') {
      // console.log(`Getting restaurants of: ${this.state.foodType}, ${this.state.zip}`);
      this.props.getRestaurants(this.state.foodType, this.state.zip);
    }
  }
  checkEnterFood(e) {
    if (e.key === 'Enter') this.setState({ foodType: e.target.value }, () => this.props.getRestaurants(this.state.foodType, this.state.zip))
  }
  inputFood(e) {
    this.setState({ foodType: e.target.value });
  }
  render() {
    let imgPath = `./assets/yelp_logo/yelp_fullcolor_outline.png`;
    return (
        <div className="search">
          <img className="yelp-logo" src={imgPath} />
          <canvas></canvas>
          <div className="search-fields">
          {/* <select className="browser-default" onChange={this.inputFood}>
            {this.state.foodTypes.map(foodType => <option key={foodType}>{foodType}</option>)}
          </select> */}

          <input id="foodInput" placeholder="Yummy Food!" onChange={this.inputFood} onKeyUp={this.checkEnterFood}/>
            <select id="mylist">
              {this.state.foodTypes.map(foodType => <option key={foodType}>{foodType}</option>)}
            </select>
            <input id="zip" placeholder="your zip code" type="number" maxLength="5" min="10000" max="99999" onChange={this.inputZip} onKeyUp={this.checkEnter}/>
          </div>
        </div>
    );
  }
}

export default Search;

