import jwt
from flask import request, jsonify
from app import app
from functools import wraps
from models import Buyer, Seller

def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None

		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		if not token:
			return jsonify({"message": "Token is missing"}), 401

		try:
			data = jwt.decode(token, app.config['SECRET_KEY'])
			current_user = Buyer.query.filter_by(public_id=data['public_id']).first() if data['type'] == 'buyer' else Seller.query.filter_by(public_id=data['public_id']).first()
			current_user.type = data['type']
		except:
			return jsonify({'message': "Token is invalid"}), 401

		return f(current_user, *args, **kwargs)

	return decorated