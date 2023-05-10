from rest_framework.serializers import ModelSerializer, SerializerMethodField

from products.serializers import ProductSerializer

from .models import Order, OrderItem


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ("product", "amount")


class OrderSerializer(ModelSerializer):
    products = OrderItemSerializer(many=True, source="order_items")
    # user = UserSerializer()
    full_price = SerializerMethodField()

    def get_full_price(self, obj):
        return obj.full_price

    class Meta:
        model = Order
        fields = "__all__"
