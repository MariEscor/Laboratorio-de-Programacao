from django.urls import path
from .views import login, register, rota_protegida

from .views import (
    listar_eventos,
    criar_evento,
    editar_evento,
    excluir_evento
)

urlpatterns = [
    path('login/', login),
    path('register/', register),
    path('protegido/', rota_protegida),
    path('eventos/', listar_eventos),
    path('eventos/criar/', criar_evento),
    path('eventos/<int:id>/editar/', editar_evento),
    path('eventos/<int:id>/excluir/', excluir_evento)
]