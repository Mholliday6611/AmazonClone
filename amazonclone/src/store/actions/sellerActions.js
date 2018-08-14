import api from '../../utils/api';

export function getInventory(){
	return dispatch => api.getInventory()
		.then(response =>{
			dispatch({type:"UPDATE_INVENTORY",payload:response.data})
		})
}
export function addToInventory(data){
	return dispatch => api.addToInventory(data)
		.then(response =>{
			dispatch({type:"ITEM_ADDED"})
			dispatch(getInventory())
		})
}