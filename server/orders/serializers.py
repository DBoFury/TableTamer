from products.serializers import ProductSerializer, AttributeValueSerializer
from rest_framework.serializers import ModelSerializer, SerializerMethodField, ReadOnlyField
from users.serializers import UserSerializer


from .models import Order, OrderItem, SelectedAttribute


class SelectedAttributeSerializer(ModelSerializer):
    title = ReadOnlyField(source='attribute_value.attribute.title')
    title_ukr = ReadOnlyField(source='attribute_value.attribute.title_ukr')
    attribute_value = AttributeValueSerializer()

    class Meta:
        model = SelectedAttribute
        fields = ("title", "title_ukr", "attribute_value", )


class OrderItemSerializer(ModelSerializer):
    product = ProductSerializer()
    attribute_values = SelectedAttributeSerializer(
        many=True, source="selected_attributes")

    class Meta:
        model = OrderItem
        fields = ("product", "attribute_values", "amount", )


class OrderSerializer(ModelSerializer):
    products = OrderItemSerializer(many=True, source="order_items")
    user = UserSerializer()
    full_price = SerializerMethodField()

    def get_full_price(self, obj):
        return obj.full_price

    class Meta:
        model = Order
        fields = "__all__"
