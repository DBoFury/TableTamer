from .views import CategoriesListView, ProductsListView, ProductDetailsView
from django.urls import path


urlpatterns = [
    path("categories", CategoriesListView.as_view()),
    path("products", ProductsListView.as_view()),
    path("product/<slug:slug>", ProductDetailsView.as_view()),
]
