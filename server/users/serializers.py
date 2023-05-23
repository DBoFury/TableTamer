from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import User


class UserSerializer(ModelSerializer):
    image_url = SerializerMethodField()

    class Meta:
        model = User
        fields = ("first_name", "last_name",
                  "email", "phone_number", "image_url", )

    def get_image_url(self, obj):
        try:
            return obj.image.url
        except:
            return ""
