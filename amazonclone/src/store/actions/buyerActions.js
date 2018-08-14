import api from '../../utils/api';

export function getCart(){
	return dispatch => api.getCart()
		.then(response=>{
			dispatch({type:"UPDATE_CART",payload:response.data})
		})
}

export function addToCart(data){
	return dispatch => api.addToCart(data)
		.then(response=>{
			dispatch(getCart())
		})
}