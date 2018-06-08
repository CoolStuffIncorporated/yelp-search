import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
  { label: 'bakery' },
  { label: 'bubble tea' },
  { label: 'brewery' },
  { label: 'burgers' },
  { label: 'cheese' },
  { label: 'chocolate' },
  { label: 'coffee' },
  { label: 'desserts' },
  { label: 'donuts' },
  { label: 'gelato' },
  { label: 'halal' },
  { label: 'hot dogs' },
  { label: 'ice cream' },
  { label: 'pasta' },
  { label: 'poke' },
  { label: 'pretzels' },
  { label: 'ramen' },
  { label: 'salad' },
  { label: 'sushi' },
  { label: 'tacos' },
  { label: 'wineries' },
];

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 } }>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? []
    : suggestions.filter(suggestion => {
      const keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

      if (keep) {
        count += 1;
      }
      return keep;
    });
}


const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 250,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      zip: null,
    };
    this.inputZip = this.inputZip.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    // this.inputFood = this.inputFood.bind(this);
  }
  inputZip(e) {
    this.setState({ zip: e.target.value });
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      console.log(`Getting restaurants of: ${this.state.value}, ${this.state.zip}`);
      this.props.getRestaurants(this.state.value, this.state.zip);
    }
  }
  // modify
  // inputFood(e) {
  //   this.setState({ foodType: e.target.value });
  // }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    // const { value, suggestions } = this.state;
    const { classes } = this.props;
    // const inputProps = {

    // };

    // const zipProps = {
    //   id: 'zip',
    //   placeholder: "What's your zip code?",
    //   type: 'number',
    //   maxLength: '5',
    //   min: '10000',
    //   max: '99999',
    //   onChange: this.inputZip,
    //   onKeyUp: this.checkEnter,
    // };

    const imgPath = './assets/yelp_logo/yelp_fullcolor_outline.png';

    return (
      <div className="search">
        <img className="yelp-logo" src={imgPath} />
        <div className="search-fields">
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            classes,
            placeholder: 'What kind of food are you in the mood for?',
            value: this.state.value,
            onChange: this.onChange,
          }}
        />
      );
    }
  }
        <input
          id="zip"
          placeholder="What's your zip code?"
          type="number"
          maxLength="5"
          min="10000"
          max="99999"
          onChange={this.inputZip}
          onKeyUp={this.checkEnter}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
