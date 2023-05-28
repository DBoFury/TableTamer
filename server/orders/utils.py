from products.models import Product

from products.models import AttributeValue
from .models import Order, OrderItem, SelectedAttribute


def create_order_items_for_order(order: Order, products_data):
    for product_data in products_data:
        attributes = []
        product = Product.objects.get(slug=product_data["slug"])
        order_item = OrderItem.objects.create(order=order, product=product,
                                              amount=product_data["amount"])
        for selected_attribute in product_data.get("attribute_values", []):
            attribute = product.category.attributes.distinct().get(
                title=selected_attribute["title"])
            attributes.append(attribute)
            attribute_value = AttributeValue.objects.get(
                attribute=attribute,
                value=selected_attribute["value"]
            )
            SelectedAttribute.objects.create(order_item=order_item,
                                             attribute_value=attribute_value)
        for attribute_type in product.category.attributes.all().distinct():
            if not attribute_type in attributes:
                default_attribute_value = AttributeValue.objects.get(
                    attribute=attribute_type,
                    price_addition=0
                )
                SelectedAttribute.objects.create(order_item=order_item,
                                                 attribute_value=default_attribute_value)


def is_order_data_valid(request):
    data = request.data
    try:
        if not "commentary" in data:
            raise KeyError("commentary")
        if not "is_takeaway" in data:
            print(data.get("is_takeaway"))
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
    except KeyError as e:
        return str(e)
    return True


def create_order(request):
    user = request.user
    validated_data = request.data

    products_data = validated_data.pop("products")
    order = Order.objects.create(**validated_data, user=user)
    create_order_items_for_order(order, products_data)
    return order


def update_order(request, order: Order):
    validated_data = request.data

    products_data = validated_data.pop("products")

    is_takeaway = validated_data.pop("is_takeaway", order.is_takeaway)
    is_paid = validated_data.pop("is_paid", order.is_paid)
    is_fulfilled = validated_data.pop("is_fulfilled", order.is_fulfilled)

    commentary = validated_data.pop("commentary", order.commentary)

    order.is_takeaway = is_takeaway
    order.is_paid = is_paid
    order.is_fulfilled = is_fulfilled

    order.commentary = commentary

    order.order_items.all().delete()

    create_order_items_for_order(order, products_data)

    order.save()

    return order
