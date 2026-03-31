from django.urls import path
from .views import login, register, rota_protegida

urlpatterns = [
    path('login/', login),
    path('register/', register),
    path('protegido/', rota_protegida),
]