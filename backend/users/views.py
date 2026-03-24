from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)

    if user:
        return Response({'message': 'Login realizado com sucesso'})
    else:
        return Response({'error': 'Credenciais inválidas'}, status=400)