import React, { Component } from 'react';
import Input from '../Multi/Input'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login,signup} from "../../store/actions/userActions"

var inputs = [{name:"username",type:"text"},{name:"email",type:"text"},{name:"password",type:"password"}]
class SellerRegister extends Component {
  render() {
  	console.log(this.props)
    return (
    	this.props.loggedIn ? 
    	(<Redirect to="/profile" />)
    	:
    	(<div>
    		<h1>Register</h1>
    			<Input inputs={inputs} execute={this.props.signup} options={{type:"seller"}} />
      		<h1>Login</h1>
      			<Input inputs={inputs.slice(1)} execute={this.props.login} options={{type:"seller"}}/>
      	 </div>)
    );
  }
}

function matchStateToProps(state){
	return state.user
}
function mapDispatchToProps(dispatch){
  return({
    login: (data,type) => dispatch(login(data,type)),
    signup: (data,type)=> dispatch(signup(data,type))
  })
}
export default connect(matchStateToProps,mapDispatchToProps)(SellerRegister);