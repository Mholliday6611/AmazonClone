const initialState ={
	signupsuccess: false,
	loggedIn: false,
	msg: "",
	type:""
}

export default function (state=initialState, action){
	switch(action.type){
		case 'SIGNUP_SUCCESS':
		return {
			...state,
			signupsuccess: true
		}
		case 'AUTHENTICATION_SUCCESS':
		return {
			...state,
			loggedIn: true,
			type: action.response.data.type,
			msg: "Login Success"
		}
		case 'AUTHENTICATION_FAIL':
		return {
			...state,
			msg: action.response.data
		}
		default:
		return state;
	}
}
