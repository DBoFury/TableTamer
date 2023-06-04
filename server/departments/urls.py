from .views import DepartmentsListView
from django.urls import path


urlpatterns = [
    path("departments", DepartmentsListView.as_view()),
]
