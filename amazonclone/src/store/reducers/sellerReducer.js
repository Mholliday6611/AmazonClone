const initialState ={
	inventory:[],
	msg:false
}

export default function (state=initialState, action){
	switch(action.type){
		case 'UPDATE_INVENTORY':
		return {
			...state,
			inventory: action.payload.inventory
		}
		case 'ITEM_ADDED':
		return {
			...state,
			msg:"Item Added to Inventory"
		}
		default:
		return state;
	}
}
