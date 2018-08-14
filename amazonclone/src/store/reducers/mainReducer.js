const initialState ={
	newItems: [],
	recentlyViewed: [],
	currentItem: false
}

export default function (state=initialState, action){
	switch(action.type){
		case 'RECENT_ITEMS':
		return {
			...state,
			newItems: action.payload.items
		}
		case 'ITEM_VIEW':
		return {
			...state,
			currentItem: action.payload.item
		}
		default:
		return state;
	}
}
