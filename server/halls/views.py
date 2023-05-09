from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Hall
from .serializers import HallSerializer


class HallsListView(APIView):
    """
    List all halls
    """

    def get(self, request, format=None):
        halls = Hall.objects.all()
        serializer = HallSerializer(halls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
