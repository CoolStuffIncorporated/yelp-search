import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl: false,
    };
    this.onHover = this.onHover.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  // <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
  onHover() {
    this.setState({
      showUrl: !this.state.showUrl,
    });
  }
  handleDelete(id) {
    axios
      .delete('/faves', { data: { id } })
      .then(() => this.props.getFaves())
      .catch(err => console.error(err));
  }

  render() {
    // console.log(this.props.favorites)
    return (
      <div className="favorites">
        <div className="home-btn">
          <NavLink to="/">
            <button className="btn-floating btn-large waves-effects waves-light red btn">
              <i className="material-icons left">home</i>
            </button>
          </NavLink>
        </div>
        <ul className="favorites-container">
          {this.props.favorites.map(favorite => (
          <li key={favorite.id} className="favorite-item" onMouseEnter={() => { this.onHover(); }} onMouseLeave={() => { this.onHover(); }} >
            <div className="favorite-img">
              <img src={favorite.image_url} width="100px" />
            </div>
            <div className="favorite-description">
              <h4>{favorite.name}</h4>
              <section className="restaurant-details">
                <div className="restaurant-contact-info">
                  <section>
                    <span>
                      Phone: {favorite.display_phone}
                      <i className="material-icons left">phone</i>
                    </span>
                  </section>
                  <br />
                  <span>
                    Location: {favorite.location.display_address.join(', ')}
                  </span>
                  <div />
                  <button className="waves-effects waves-light grey btn" onClick={() => this.handleDelete(favorite.id)} > Delete
                    <i className="material-icons left">delete</i>
                  </button>
                  <a className="btn-large waves-effects waves-light red btn" href={favorite.url}>
                    {favorite.name}
                    <i className="material-icons left">web</i>
                  </a>
                </div>
              </section>
            </div>
          </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
