from typing import List

from django.http import Http404
from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Order
from .serializers import OrderSerializer
from .utils import (create_order, is_order_data_valid, post_receipts,
                    update_order)


class IsAuthenticated(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_permission(self, request, view):
        if (request.method in ["POST"] or request.user and request.user.is_authenticated):
            return True
        return False


class OrdersListView(APIView):
    """
    List all orders, create order.
    """

    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_sorted_orders(self, orders: List[Order],
                          sort_by_raw: str):
        sort_by = sort_by_raw.replace("-", "")
        is_reverse = sort_by != sort_by_raw
        if sort_by in ["id", "date", "price"]:
            if sort_by == "price":
                orders = sorted(
                    orders, key=lambda t: t.full_price, reverse=is_reverse)
            elif sort_by == "date":
                orders = orders.order_by(
                    f"{'-' if is_reverse else ''}created_at")
            else:
                orders = orders.order_by(f"{'-' if is_reverse else ''}id")
        return orders

    def get(self, request, format=None):
        sort_by = request.GET.get('sort', 'id')
        user = request.user
        orders = self.get_sorted_orders(Order.objects.filter(user=user.id),
                                        sort_by)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        validation_result = is_order_data_valid(request)
        if not isinstance(validation_result, str):
            order = create_order(request)
            post_receipts(order)
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        return Response({"error": validation_result}, status=status.HTTP_400_BAD_REQUEST)


class OrderView(APIView):
    """
    Get order details, update order, delete order
    """

    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_order(self, pk, user):
        try:
            return Order.objects.filter(user=user.id, pk=pk).first()
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        order = self.get_order(pk, request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        order = self.get_order(pk, request.user)
        validation_result = is_order_data_valid(request)
        if not isinstance(validation_result, str):
            order = update_order(request, order)
            post_receipts(order)
            return Response(OrderSerializer(order).data, status=status.HTTP_202_ACCEPTED)
        return Response({"error": validation_result}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order = self.get_order(pk, request.user)
        order.delete()
        return Response(f"Order with id {pk} deleted.", status=status.HTTP_200_OK)
