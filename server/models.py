from app import db, ma

cart = db.Table('cart',
	db.Column('buyer_id', db.Integer, db.ForeignKey('buyer.id')),
	db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
	)

wishlist = db.Table('wishlist',
	db.Column('buyer_id', db.Integer, db.ForeignKey('buyer.id')),
	db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
	)

class Buyer(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	public_id = db.Column(db.String(50), unique=True)
	username = db.Column(db.String(50))
	email = db.Column(db.String(50))
	password = db.Column(db.String(80))
	cart = db.relationship('Item', secondary=cart, backref=db.backref('buyers', lazy='dynamic'))
	wishlist = db.relationship('Item', secondary=wishlist, backref=db.backref('wishers', lazy='dynamic'))

class Seller(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	public_id = db.Column(db.String(50), unique=True)
	username = db.Column(db.String(50))
	email = db.Column(db.String(50))
	password = db.Column(db.String(80))
	items = db.relationship('Item', backref='seller', lazy='dynamic')

class Item(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	public_id = db.Column(db.String(50), unique=True)
	name = db.Column(db.String(50))
	price = db.Column(db.Integer)
	description = db.Column(db.String(300))
	seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'))

class BuyerSchema(ma.ModelSchema):
	class Meta:
		model = Buyer

class SellerSchema(ma.ModelSchema):
	class Meta:
		model = Seller

class ItemSchema(ma.ModelSchema):
	class Meta:
		model = Item