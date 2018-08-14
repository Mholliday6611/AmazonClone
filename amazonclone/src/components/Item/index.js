import React, { Component } from 'react';
import {connect} from 'react-redux'
import {itemView,addToCart} from "../../store/actions/mainActions"

class Item extends Component {

  componentDidMount(){
    this.props.itemView(this.props.match.params.code)
  }

  renderItemView(item){
    if(item === false){
      return <h1>Loading...</h1>
    }else{
      return(
          <span>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <button onClick={()=>this.props.addToCart({item:item.public_id,type:"cart"})}>Add To Shopping Cart</button>
            <button onClick={()=>this.props.addToCart({item:item.public_id,type:"wishlist"})}>Add to Wishlist</button>
          </span>
        )
    }
  }
  render() {
    return (
      <div>
      	ITEM
      	<div className="itemView">
          {this.renderItemView(this.props.currentItem)}
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state.main
}
function mapDispatchToProps(dispatch){
	return({
    itemView: (code)=>dispatch(itemView(code)),
    addToCart: (item,type)=>dispatch(addToCart(item,type))
	})
}
export default connect(mapStateToProps,mapDispatchToProps)(Item);
