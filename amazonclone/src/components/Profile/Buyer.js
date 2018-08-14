import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getCart} from "../../store/actions/buyerActions"

class Buyer extends Component {
  componentDidMount(){
  	this.props.getCart()
  }
  //MAKE THIS TO COMPONENT?!?!
  renderCarts(cart){
  	if(cart.length>0){
  		return cart.map(i=><li>{i.name}</li>)
  	}else{
  		return <h1>No Items added</h1>
  	}
  	
  }
  render() {
    return (
      <div>
      	<div className="cart">
      		<h1>Shopping Cart</h1>
      		{this.renderCarts(this.props.cart)}
      	</div>
      	<div className="cart">
      		<h1>Wishlist</h1>
      		{this.renderCarts(this.props.wishlist)}
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state.buyer
}
function mapDispatchToProps(dispatch){
	return({
		getCart: ()=> dispatch(getCart())
	})
}
export default connect(mapStateToProps,mapDispatchToProps)(Buyer);