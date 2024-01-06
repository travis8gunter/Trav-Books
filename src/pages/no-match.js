import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <h1>We couldn't find that page</h1>
        <Link to='/'>Return to Home Page</Link>
      </div>
    );
  }
}
