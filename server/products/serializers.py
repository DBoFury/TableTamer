from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Product, Category
from departments.serializers import DepartmentSerializer


class CategorySerializer(ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Category
        fields = ("title", "department",)


class ProductSerializer(ModelSerializer):
    image_url = SerializerMethodField()
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ("id", "title", "description",
                  "price", "stock",
                  "image_url", "is_in_stoplist",
                  "slug", "category")

    def get_image_url(self, obj):
        request = self.context.get("request")
        try:
            return request.build_absolute_uri(obj.image.url)
        except:
            return ""
