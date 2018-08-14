import axios from 'axios'

const baseURL = "http://127.0.0.1:5000/"
var header = function(){
	return {headers: {'x-access-token': localStorage.getItem("token")}}
}

let api = {
	signup: function(data){
		let url = baseURL + "signup"
		return axios.post(url, data)
	},
	login: function(data){
		let url = baseURL + "login"
		return axios.post(url, data)
	},
	refresh: function(data){
		let url = baseURL + "refresh"
		return axios.get(url,header())
	},
	selleradd: function(data){
		let url = baseURL + "selleradditem"
		return axios.post(url, data, header())
	},
	getInventory: function(){
		let url = baseURL + "sellergetinventory"
		return axios.get(url, header())
	},
	recentItems: function(){
		let url = baseURL + "recentitems"
		return axios.get(url)
	},
	itemView: function(code){
		let url = baseURL + "itemview/" + code
		return axios.get(url)
	},
	addToInventory: function(data){
		let url = baseURL + "selleradditem"
		return axios.post(url, data, header())
	},
	addToCart: function(data){
		let url = baseURL + "addToCart"
		return axios.post(url, data, header())
	},
	getCart: function(){
		let url = baseURL + "viewcart"
		return axios.get(url, header())
	}

}

export default api