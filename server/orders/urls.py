from .views import OrdersListView, OrderView
from django.urls import path


urlpatterns = [
    path("orders", OrdersListView.as_view()),
    path("order/<int:pk>", OrderView.as_view()),
]
