from rest_framework.serializers import ModelSerializer, CharField
from .models import Department


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ("title", "title_ukr")