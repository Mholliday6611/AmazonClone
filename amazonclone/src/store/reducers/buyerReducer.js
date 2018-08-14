const initialState ={
	wishlist: [],
	cart : []
}

export default function (state=initialState, action){
	switch(action.type){
		case 'UPDATE_CART':
		return {
			...state,
			cart: action.payload.cart,
			wishlist: action.payload.wishlist
		}
		default:
		return state;
	}
}
