from app import app, db
from flask import request, jsonify, make_response
import jwt
import uuid
import datetime
from tokenAuth import token_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import *

@app.route('/signup', methods=['POST'])
def signup():
	data = request.get_json()
	newuser = ""

	data['password'] = generate_password_hash(data['password'], method='sha256')
	data['public_id'] = str(uuid.uuid4())
	print(data)
	if data['type'] == "buyer":
		schema = BuyerSchema()
		newuser = schema.load(data)

	if data['type'] == "seller":
		schema = SellerSchema()
		newuser = schema.load(data)

	print(newuser)
	db.session.add(newuser.data)
	db.session.commit()

	return "User Created"

@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()

	if not data or not data['email'] or not data['password']:
		return make_response("Could not verify", 401)

	user = Buyer.query.filter_by(email=data['email']).first() if data['type'] == 'buyer' else Seller.query.filter_by(email=data['email']).first()
	print(user)
	if check_password_hash(user.password, data['password']):
		token = jwt.encode({'public_id': user.public_id,"type": data['type'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
		return jsonify({'token': token.decode('UTF-8'), 'success': True,'type':data['type']})

	return make_response('Could not verify', 401)

@app.route("/refresh", methods=['GET'])
@token_required
def refresh(current_user):
	token = jwt.encode({'public_id': current_user.public_id,"type": current_user.type, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
	return jsonify({'token': token.decode('UTF-8'), 'success': True,'type':current_user.type})

@app.route('/selleradditem', methods=['POST'])
@token_required
def selleradd(current_user):
	data = request.get_json()
	schema = ItemSchema()

	data['seller'] = current_user.id
	data['public_id'] = str(uuid.uuid4())

	new_item = schema.load(data)
	db.session.add(new_item.data)
	db.session.commit()

	return "Item added"

@app.route('/sellergetinventory', methods=['GET'])
@token_required
def getInventory(current_user):

	items = current_user.items

	schema = ItemSchema(many=True)
	inventory = schema.dump(items).data

	return jsonify({'inventory': inventory})

@app.route('/recentitems', methods=['GET'])
def getAllItems():

	items = Item.query.order_by("-id").limit(6).all()

	schema = ItemSchema(exclude=['wishers','buyers','id'],many=True)
	items = schema.dump(items).data

	return jsonify({'items': items})

@app.route('/itemview/<public_id>', methods=['GET'])
def itemView(public_id):

	item = Item.query.filter_by(public_id=public_id).first()

	schema = ItemSchema(exclude=['wishers','buyers','id'])
	item = schema.dump(item).data

	return jsonify({'item': item})

@app.route('/addToCart', methods=['POST'])
@token_required
def addToCart(current_user):
	data = request.get_json()
	item = Item.query.filter_by(public_id=data['item']).first()

	if data['type'] == "cart":
		current_user.cart.append(item)

	if data['type'] == "wishlist":
		current_user.wishlist.append(item)

	db.session.add(current_user)
	db.session.commit()

	return "Item added to cart"

@app.route('/viewcart', methods=['GET'])
@token_required
def viewCart(current_user):
	schema = ItemSchema(exclude=['wishers','buyers','id'],many=True)

	shopping_cart = current_user.cart
	wishlist = current_user.wishlist

	shopping_cart = schema.dump(shopping_cart).data
	wishlist = schema.dump(wishlist).data

	print(shopping_cart,wishlist)
	return jsonify({'cart': shopping_cart,"wishlist":wishlist})