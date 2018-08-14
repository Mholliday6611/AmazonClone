import api from '../../utils/api';

export function recentItems(){
	return dispatch => api.recentItems()
		.then(response=>{
			dispatch({type:"RECENT_ITEMS",payload:response.data})
		})
}

export function itemView(code){
	return dispatch => api.itemView(code)
		.then(response=>{
			dispatch({type:"ITEM_VIEW",payload:response.data})
		})
}
