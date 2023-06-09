from django.urls import path

from .views import LoginView, RegisterView, UserView

urlpatterns = [
    path("login", LoginView.as_view()),
    path("register", RegisterView.as_view()),
    path("user-details", UserView.as_view()),
]
