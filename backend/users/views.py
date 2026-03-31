from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

# 🔐 LOGIN (AGORA COM JWT)
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)

        return Response({
            'message': 'Login realizado com sucesso',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({'error': 'Credenciais inválidas'}, status=400)


# 📝 REGISTER
@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # campos extras
    nome = request.data.get('nome')
    sobrenome = request.data.get('sobrenome')
    telefone = request.data.get('telefone')

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email já cadastrado'}, status=400)

    user = User.objects.create_user(
        email=email,
        password=password,
        nome=nome,
        sobrenome=sobrenome,
        telefone=telefone
    )

    return Response({'message': 'Usuário criado com sucesso'})


# 🔒 ROTA PROTEGIDA
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rota_protegida(request):
    return Response({
        "msg": "Você está autenticado!",
        "usuario": str(request.user)
    })


# 🔒 OUTRA ROTA PROTEGIDA
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def minha_view(request):
    return Response({"msg": "Autenticado!"})