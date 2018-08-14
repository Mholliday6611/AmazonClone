import api from '../../utils/api';

function setCurrentUser(dispatch, response){
	if(response.data.success){
		localStorage.setItem('token', response.data.token);
    	dispatch({type: 'AUTHENTICATION_SUCCESS', response});
  }
	if(!response.data.success){
	 	dispatch({type: "AUTHENTICATION_FAIL", response})
  }
}

export function refresh(){
	return dispatch => api.refresh()
		.then(response=>{
			setCurrentUser(dispatch,response)
		})
}


export function signup(data,type){
	data.type = type.type
	return dispatch => api.signup(data)
		.then(response=>{
			if(response.data === "User Created"){
				dispatch({type:"SIGNUP_SUCCESS"})
			}
		})
}

export function login(data,type){
	data.type = type.type
	return dispatch => api.login(data)
		.then(response=>{
			console.log(response)
			setCurrentUser(dispatch,response)
		})
}
