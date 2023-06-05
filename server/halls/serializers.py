from rest_framework.serializers import ModelSerializer
from .models import Hall, Table


class TableSerializer(ModelSerializer):
    class Meta:
        model = Table
        fields = ("id", "table_number",)


class HallSerializer(ModelSerializer):
    tables = TableSerializer(many=True)

    class Meta:
        model = Hall
        fields = ("title", "tables",)
