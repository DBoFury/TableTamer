from products.serializers import ProductSerializer
from rest_framework.serializers import ModelSerializer, SerializerMethodField, ReadOnlyField, CharField
from users.serializers import UserSerializer


from .models import Order, OrderItem, SelectedAttribute


class SelectedAttributeSerializer(ModelSerializer):
    title = ReadOnlyField(source='attribute_value.attribute.title')
    value = ReadOnlyField(source='attribute_value.value')
    price_addition = ReadOnlyField(source='attribute_value.price_addition')

    class Meta:
        model = SelectedAttribute
        fields = ("title", "value",
                  "price_addition", )


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()
    attribute_values = SelectedAttributeSerializer(
        many=True, source="selected_attributes")

    class Meta:
        model = OrderItem
        fields = ("product", "attribute_values", "amount", )


class OrderSerializer(ModelSerializer):
    hall = CharField(source="table.hall.title", allow_null=True)
    table = CharField(source="table.title", allow_null=True)
    products = OrderItemSerializer(many=True, source="order_items")
    user = UserSerializer()
    full_price = SerializerMethodField()
    submission = SerializerMethodField()

    def get_full_price(self, obj):
        return obj.full_price

    def get_submission(self, obj):
        return obj.submission

    class Meta:
        model = Order
        fields = "__all__"
