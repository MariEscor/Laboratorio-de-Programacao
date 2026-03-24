from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, get_user_model

User = get_user_model()

# 🔐 LOGIN
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = User.objects.filter(email=email).first()

    if user and user.check_password(password):
        return Response({'message': 'Login realizado com sucesso'})
    else:
        return Response({'error': 'Credenciais inválidas'}, status=400)


# 📝 REGISTER
@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # campos extras (ajusta conforme seu form)
    nome = request.data.get('nome')
    sobrenome = request.data.get('sobrenome')
    telefone = request.data.get('telefone')

    # verifica se já existe
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email já cadastrado'}, status=400)

    # cria usuário
    user = User.objects.create_user(
        email=email,
        password=password,
        nome=nome,
        sobrenome=sobrenome,
        telefone=telefone
    )

    print("USUÁRIO CRIADO:", user)

    return Response({'message': 'Usuário criado com sucesso'})

