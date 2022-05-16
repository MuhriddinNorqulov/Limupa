from main.products import products
from main.models import Product
from django.contrib.auth.models import User
admin = User.objects.all()[0]
for i in products:
    Product.objects.create(
        user=admin,
        name=i.get('name'),
        category=i.get('category'),
        rating=i.get('rating'),
        numReviews=i.get('numReviews'),
        countInStock=i.get('countInStock'),
        description=i.get('description'),
        price=i.get('price'),
    )