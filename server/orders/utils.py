from products.models import Product
# from users.models import User

from .models import Order, OrderItem


def is_order_data_valid(request):
    user = request.user
    data = request.data
    try:
        if not "is_takeaway" in data:
            raise KeyError("is_takeaway")
        if not "products" in data:
            raise KeyError("products")
        products_data = data["products"]
        if len(products_data) > 0 and isinstance(products_data, list):
            for product in products_data:
                if not "slug" in product:
                    raise KeyError("slug")
                if not "amount" in product:
                    raise KeyError("amount")
                if not "price_per_unit" in product:
                    raise KeyError("price_per_unit")
        if not user.is_authenticated:
            if not "user" in data:
                raise KeyError("user")
            else:
                if not ("phone_number" in data["user"] or "email" in data["user"]):
                    raise KeyError("phone_number | email")
                if not "addresses" in data["user"]:
                    raise KeyError("addresses")
    except KeyError as e:
        return str(e)
    return True


def create_order(request):
    user = request.user
    validated_data = request.data

    user_data = validated_data.pop("user")
    products_data = validated_data.pop("products")
    order = Order.objects.create(**validated_data)
    # order.user = user if user.is_authenticated else User.objects.create(
    #     email=user_data.get("email", None),
    #     phone_number=user_data.get("phone_number", None))
    for product_data in products_data:
        product = Product.objects.get(slug=product_data["slug"])
        OrderItem.objects.create(order=order, product=product,
                                 amount=product_data["amount"],
                                 price_per_unit=product_data["price_per_unit"])
    return order
