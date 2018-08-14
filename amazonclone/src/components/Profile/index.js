import React, { Component } from 'react';
import {connect} from 'react-redux'
import Buyer from './Buyer'
import Seller from './Seller'
class Profile extends Component {
  render() {
    return (
      this.props.type === "buyer"?
      <Buyer />
      :
      <Seller />
    );
  }
}

function mapStateToProps(state){
	return state.user
}
export default connect(mapStateToProps)(Profile);