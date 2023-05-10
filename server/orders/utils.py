from products.models import Product
# from users.models import User

from .models import Order, OrderItem


def is_order_data_valid(request):
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
                if not "selected_attributes" in product:
                    raise KeyError("selected_attributes")
    except KeyError as e:
        return str(e)
    return True


def create_order(request):
    user = request.user
    validated_data = request.data

    products_data = validated_data.pop("products")
    order = Order.objects.create(**validated_data)
    order.user = user
    for product_data in products_data:
        product = Product.objects.get(slug=product_data["slug"])
        OrderItem.objects.create(order=order, product=product,
                                 amount=product_data["amount"])
        # for selected_attribute in product_data["slug"]
    return order
