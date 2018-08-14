import React, { Component } from 'react';
import Input from '../Multi/Input'
import {connect} from 'react-redux'
import {getInventory, addToInventory} from "../../store/actions/sellerActions"

var inputs = [{name:"name",type:"text"},{name:"price",type:"number"},{name:"description",type:"text"}]

class Seller extends Component {
  componentDidMount(){
  	this.props.getInventory()
  }
  renderInventory(inventory){
  	console.log(inventory)
  	if(inventory.length === 0){
  		return <h1>Inventory Empty</h1>
  	}else{
  		return inventory.map(i=><li key={i.id}>{i.name}</li>)
  	}
  	
  }	
  render() {
  	console.log(this.props)
    return (
      <div>
      	<div className="Inventory">
      		<div className="inventoryView">
      			<ul>
      				{this.renderInventory(this.props.inventory)}
      			</ul>
      		</div>
      		<div className="addToInventory">
      			<Input inputs={inputs} execute={this.props.addToInventory} />
      		</div>
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state){
	return state.seller
}
function mapDispatchToProps(dispatch){
	return({
		getInventory: ()=> dispatch(getInventory()),
		addToInventory: (data)=> dispatch(addToInventory(data))
	})
}
export default connect(mapStateToProps, mapDispatchToProps)(Seller);