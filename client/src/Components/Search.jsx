import React, { Component } from 'react';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTypes: ['tacos', 'burgers', 'hot dogs', 'salad', 'ramen'],
      zip: 10001,
      foodType: '',
    };
    this.inputZip = this.inputZip.bind(this);
    this.inputFood = this.inputFood.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

  inputZip(e) {
    // console.log(e.target.value);
    this.setState({ zip: e.target.value }, () => console.log(this.state));
  }

  checkEnter(e) {
    console.log(e.key);
    if (e.key === 'Enter') {
      console.log(`Getting restaurants with these parameters: ${this.state.foodType}, ${this.state.zip}`);
      this.props.getRestaurants(this.state.foodType, this.state.zip);
    }
  }

  inputFood(e) {
    // console.log(e.target.value);
    this.setState({ foodType: e.target.value }, () => console.log(this.state));
  }
  render() {
    return (
      <div className="search">
      <select onChange={this.inputFood}>
        {this.state.foodTypes.map(foodType => <option key={foodType}>{foodType}</option>)}
      </select>
        <input placeholder="ZIP CODE" type="number" onChange={this.inputZip} onKeyUp={this.checkEnter}/>
      </div>
    );
  }
}

export default Search;
