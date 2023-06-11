import json

import requests
from django.db.models import Sum
from halls.models import Table
from products.models import Product

from .models import Order, OrderItem


def create_order_items_for_order(order: Order, products_data):
    for product_data in products_data:
        product = Product.objects.get(slug=product_data["slug"])
        order_item = OrderItem.objects.create(order=order, product=product,
                                              amount=product_data["amount"])


def is_order_data_valid(request):
    data = request.data
    try:
        if not "commentary" in data:
            raise KeyError("commentary")
        if not "is_takeaway" in data:
            raise KeyError("is_takeaway")
        if not data.get("is_takeaway") and not "table" in data:
            raise KeyError("table")
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
    table_id = validated_data.pop("table", None)
    order = Order.objects.create(**validated_data, user=user)
    order.table = Table.objects.get(pk=table_id) if table_id else None
    create_order_items_for_order(order, products_data)
    order.save()
    return order


def update_order(request, order: Order):
    validated_data = request.data

    products_data = validated_data.pop("products")

    is_takeaway = validated_data.pop("is_takeaway", order.is_takeaway)

    if not is_takeaway:
        table_id = validated_data.pop("table", order.table.id)
        order.table = Table.objects.get(pk=table_id)

    commentary = validated_data.pop("commentary", order.commentary)

    order.is_takeaway = is_takeaway

    order.commentary = commentary

    order.order_items.all().delete()

    create_order_items_for_order(order, products_data)

    order.save()

    return order


def post_receipts(order: Order):
    def _get_order_item_dict(order_item: OrderItem):
        price_per_unit = order_item.product.price
        full_price = order_item.amount * price_per_unit
        return {"title": order_item.product.title,
                "amount": order_item.amount,
                "price_per_unit": price_per_unit,
                "full_price": full_price}

    departments = {}

    order_items = order.order_items.all()\
        .select_related("product")
    for order_item in order_items:
        department_url = order_item.product\
            .category.department.title.lower()
        if department_url in departments:
            departments[department_url].append(
                _get_order_item_dict(order_item))
        else:
            departments[department_url] = [
                _get_order_item_dict(order_item)]

    for department_url, products in departments.items():
        requests.post(f"http://{department_url}-department/print-order",
                      headers={"Content-Type": "application/json"},
                      json=json.dumps({"id": order.id,
                                       "created_at": order.created_at.strftime("%d %B %Y %H:%M"),
                                       "products": products,
                                       "is_takeaway": order.is_takeaway,
                                       "hall": str(order.table.hall) if order.table else None,
                                       "table": str(order.table),
                                       "commentary": order.commentary, "user": str(order.user)}))
