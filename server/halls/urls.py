from .views import HallsListView
from django.urls import path


urlpatterns = [
    path("halls", HallsListView.as_view()),
]
