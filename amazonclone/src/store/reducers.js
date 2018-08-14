import{ combineReducers } from 'redux';
import main from './reducers/mainReducer';
import user from './reducers/userReducer';
import seller from "./reducers/sellerReducer"
import buyer from "./reducers/buyerReducer"

const reducer = combineReducers({
  main,
  user,
  seller,
  buyer
});

export default function (state, action){
	if( action.type ==="LOGOUT"){
    	return reducer(undefined, action);
  	}
  return reducer(state, action);
}
