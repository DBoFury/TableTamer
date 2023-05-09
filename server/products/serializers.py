from rest_framework.serializers import ModelSerializer, CharField
from .models import Product, Category, AttributeValue
from departments.serializers import DepartmentSerializer


class AttributeValueSerializer(ModelSerializer):
    title = CharField(source='attribute.title', read_only=True)
    title_ukr = CharField(source='attribute.title_ukr', read_only=True)

    class Meta:
        model = AttributeValue
        fields = ("title", "title_ukr", "value", "value_ukr", "price_addition")


class CategorySerializer(ModelSerializer):
    department = DepartmentSerializer()
    attributes = AttributeValueSerializer(
        many=True, source="attribute_values")

    class Meta:
        model = Category
        fields = ("department", "title", "title_ukr", "attributes")


class ProductSerializer(ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ("id", "title", "title_ukr", "description",
                  "description_ukr", "price", "stock",
                  "image_url", "is_in_stoplist",
                  "slug", "category")
