import React, { Component } from 'react';
import Autosuggest from './Autosuggest.jsx';

class wipSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      zip: null,
    };
    this.inputZip = this.inputZip.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.inputFood = this.inputFood.bind(this);
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
  // modify
  inputFood(e) {
    this.setState({ foodType: e.target.value });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: Autosuggest.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'What kind of food are you in the mood for?',
      value,
      onChange: this.onChange,
    };

    const zipProps = {
      id: 'zip',
      placeholder: "What's your zip code?",
      type: 'number',
      maxLength: '5',
      min: '10000',
      max: '99999',
      onChange: this.inputZip,
      onKeyUp: this.checkEnter,
    };

    const imgPath = './assets/yelp_logo/yelp_fullcolor_outline.png';

    return (
      <div className="search">
        <img className="yelp-logo" src={imgPath} />
        <div className="search-fields">
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={Autosuggest.getSuggestionValue}
        renderSuggestion={Autosuggest.renderSuggestion}
        inputProps={inputProps}
        />
        <input {...zipProps}/>
        </div>
      </div>
    );
  }
}

export default wipSearch;
