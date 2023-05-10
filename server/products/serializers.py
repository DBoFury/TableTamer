from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Product, Category, AttributeValue, Attribute
from departments.serializers import DepartmentSerializer


class AttributeValueSerializer(ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = ("value", "value_ukr", "price_addition")


class AttributeSerializer(ModelSerializer):
    values = AttributeValueSerializer(many=True)

    class Meta:
        model = Attribute
        fields = ("title", "title_ukr", "values")


class CategorySerializer(ModelSerializer):
    department = DepartmentSerializer()
    attributes = SerializerMethodField()

    class Meta:
        model = Category
        fields = ("title", "title_ukr", "department", "attributes")

    def get_attributes(self, obj):
        return AttributeSerializer(obj.attributes.distinct(),
                                   many=True).data


class ProductSerializer(ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ("id", "title", "title_ukr", "description",
                  "description_ukr", "price", "stock",
                  "image_url", "is_in_stoplist",
                  "slug", "category")
