from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer
from .utils import get_user_data


class UserView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        serializer = UserSerializer(
            request.user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data,
                            status=status.HTTP_202_ACCEPTED)
        return Response("Wrong data format.", status=status.HTTP_412_PRECONDITION_FAILED)


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            email, phone_number, pin_code, password = get_user_data(
                request.data)
        except KeyError as e:
            return Response(str(e), status=status.HTTP_412_PRECONDITION_FAILED)
        user = User.objects.filter(
            Q(email=email) | Q(phone_number=phone_number) | Q(pin_code=pin_code)
        )
        if user.exists():
            user = user.first()
            if pin_code:
                token = RefreshToken.for_user(user)
                return Response({"access_token": str(token.access_token)}, status=status.HTTP_202_ACCEPTED)
            elif user.check_password(password):
                token = RefreshToken.for_user(user)
                return Response({"access_token": str(token.access_token)}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response("Wrong password", status=status.HTTP_403_FORBIDDEN)
        return Response("No such user exists.", status=status.HTTP_404_NOT_FOUND)


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            email, phone_number, pin_code, password = get_user_data(
                request.data)
        except KeyError as e:
            return Response(str(e), status=status.HTTP_412_PRECONDITION_FAILED)
        user = User.objects.filter(
            Q(email=email) | Q(phone_number=phone_number) | Q(pin_code)
        )
        if not user.exists():
            user = User.objects.create(
                email=email,
                phone_number=phone_number,
                pin_code=pin_code
            )
            user.set_password(password)
            user.save()
            token = RefreshToken.for_user(user)
            return Response({"access_token": str(token.access_token)}, status=status.HTTP_201_CREATED)
        return Response("No such user exists.", status=status.HTTP_412_PRECONDITION_FAILED)
