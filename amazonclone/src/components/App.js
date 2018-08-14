import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import '../css/App.css';

import Home from './Home'
import Nav from './Nav'
import Register from './Register'
import SellerLogin from './Register/SellerLogin'
import Profile from "./Profile"
import Item from "./Item"
import {refresh} from "../store/actions/userActions"

class App extends Component {
  componentDidMount(){
  	this.props.dispatch(refresh())
  }
  render() {
    return (
      <div className="App">
      	<Nav />
      	<Router>
      		<Switch>
	      			<Route exact path='/' component={Home} />
	      			<Route exact path='/item/:code' component={Item} />
	      			<Route exact path='/register' component={Register} />
	      			<Route exact path='/sellerLogin' component={SellerLogin} />
	      			<Route exact path='/profile' component={Profile} />
      		</Switch>
      	</Router>
      </div>
    );
  }
}

export default connect()(App);
