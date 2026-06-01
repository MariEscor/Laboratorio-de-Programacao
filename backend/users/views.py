from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Evento
from .serializers import EventoSerializer

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

@api_view(['POST'])
def criar_evento(request):
    serializer = EventoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


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

@api_view(['GET'])
def listar_eventos(request):
    eventos = Evento.objects.all()
    serializer = EventoSerializer(eventos, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def editar_evento(request, id):
    evento = Evento.objects.get(id=id)

    serializer = EventoSerializer(
        evento,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def excluir_evento(request, id):
    evento = Evento.objects.get(id=id)
    evento.delete()

    return Response({"msg": "Evento removido"})