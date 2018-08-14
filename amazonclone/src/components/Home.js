import React, { Component } from 'react';
import {connect} from 'react-redux'
import {recentItems} from "../store/actions/mainActions"
import {Link} from 'react-router-dom'

class Home extends Component {
  
  componentDidMount(){
  	this.props.recentItems()
  }

  renderNewItems(items){
  	if(items.length === 0){
  		return <h1>Loading Newest Items</h1>
  	}else{
  		return items.map((i,k)=><li key={k}><Link to={`/item/${i.public_id}`}>{i.name}</Link></li>)
  	}
  }

  render() {
  	console.log(this.props)
    return (
      <div>
      	HOME
      	<div className="newItems">
      		{this.renderNewItems(this.props.newItems)}
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
		recentItems: ()=> dispatch(recentItems())
	})
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
