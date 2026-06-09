from rest_framework.test import APITestCase
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from users.models import Evento

User = get_user_model()


# ==========================================================
# ETAPA 1 - TESTE DE API E ENDPOINTS
# ==========================================================

class APITests(APITestCase):

    # ------------------------------------------------------
    # 1.a Caminhos Felizes
    # Verifica se entradas válidas retornam sucesso (200 OK)
    # ------------------------------------------------------
    def test_register_sucesso(self):

        response = self.client.post(
            "/api/register/",
            {
                "email": "api@gmail.com",
                "password": "123456",
                "nome": "API",
                "sobrenome": "Teste",
                "telefone": "34999999999"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 200)

    # ------------------------------------------------------
    # 1.b Tratamento de Erros
    # Verifica se dados inválidos retornam 400 Bad Request
    # ------------------------------------------------------
    def test_register_sem_email(self):

        response = self.client.post(
            "/api/register/",
            {
                "password": "123456"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 400)

    # ------------------------------------------------------
    # 1.c Idempotência
    # Verifica se o cadastro duplicado falha, não criando
    # um novo usuário
    # ------------------------------------------------------
    def test_email_duplicado(self):

        self.client.post(
            "/api/register/",
            {
                "email": "duplicado@gmail.com",
                "password": "123456",
                "nome": "Teste",
                "sobrenome": "Teste",
                "telefone": "123"
            },
            format="json"
        )

        response = self.client.post(
            "/api/register/",
            {
                "email": "duplicado@gmail.com",
                "password": "123456",
                "nome": "Teste",
                "sobrenome": "Teste",
                "telefone": "123"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 400)

    # ------------------------------------------------------
    # 1.d Validação de Contrato
    # Endpoint protegido deve rejeitar requisição sem JWT
    # ------------------------------------------------------
    def test_criar_evento_sem_autenticacao(self):

        response = self.client.post(
            "/api/eventos/criar/",
            {
                "nome": "Evento Teste"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 401)


# ==========================================================
# ETAPA 2 - TESTE DE BANCO DE DADOS E ARMAZENAMENTO
# ==========================================================

class DatabaseTests(TestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            email="db@gmail.com",
            password="123456",
            nome="DB",
            sobrenome="Teste",
            telefone="123"
        )

    # ------------------------------------------------------
    # 2.a Integridade dos Dados
    # Verifica se a criação de um evento realmente grava
    # informações no banco de dados
    # ------------------------------------------------------
    def test_criar_evento_no_banco(self):

        antes = Evento.objects.count()

        Evento.objects.create(
            usuario=self.user,
            nome="Evento Teste",
            data="2026-06-09",
            local="IFTM",
            descricao="Descrição"
        )

        depois = Evento.objects.count()

        self.assertEqual(depois, antes + 1)

    # ------------------------------------------------------
    # 2.a Integridade dos Dados
    # Verifica se a exclusão remove corretamente o registro
    # do banco de dados
    # ------------------------------------------------------
    def test_excluir_evento(self):

        evento = Evento.objects.create(
            usuario=self.user,
            nome="Evento",
            data="2026-06-09",
            local="IFTM",
            descricao="Descrição"
        )

        evento.delete()

        self.assertFalse(
            Evento.objects.filter(id=evento.id).exists()
        )

    # ------------------------------------------------------
    # 2.b Restrições de Esquema
    # Verifica a unicidade do campo email através da
    # geração de IntegrityError
    # ------------------------------------------------------
    def test_email_unico(self):

        with self.assertRaises(IntegrityError):

            User.objects.create_user(
                email="db@gmail.com",
                password="123456",
                nome="Outro",
                sobrenome="Usuario",
                telefone="999"
            )

    # ------------------------------------------------------
    # 2.c Transações e ACID
    # Verifica rollback quando uma operação falha
    # ------------------------------------------------------
    def test_evento_invalido_nao_e_salvo(self):

        quantidade_antes = Evento.objects.count()

        try:
            with transaction.atomic():

                Evento.objects.create(
                    usuario=self.user,
                    nome=None,
                    data="2026-06-09",
                    local="IFTM",
                    descricao="Teste"
                )

        except IntegrityError:
            pass

        quantidade_depois = Evento.objects.count()

        self.assertEqual(
            quantidade_antes,
            quantidade_depois
        )

    # ------------------------------------------------------
    # 2.d Migrações
    #
    # Teste realizado manualmente através dos comandos:
    #
    # python manage.py makemigrations
    # python manage.py migrate
    #
    # Resultado esperado:
    # Migrações executadas sem falhas e sem perda de dados.
    # ------------------------------------------------------


# ==========================================================
# ETAPA 3 - LÓGICA DE NEGÓCIO PRINCIPAL
# ==========================================================

class BusinessLogicTests(TestCase):

    # ------------------------------------------------------
    # 3.a Transformação de Dados
    # Verifica a normalização do email realizada pelo
    # UserManager durante a criação do usuário
    # ------------------------------------------------------
    def test_normalizacao_email(self):

        user = User.objects.create_user(
            email="TESTE@GMAIL.COM",
            password="123456",
            nome="Teste",
            sobrenome="Teste",
            telefone="123"
        )

        self.assertIn("@gmail.com", user.email)

    # ------------------------------------------------------
    # 3.b Casos Extremos
    # Verifica o comportamento esperado ao tentar criar
    # usuário sem email
    # ------------------------------------------------------
    def test_usuario_sem_email(self):

        with self.assertRaises(ValueError):

            User.objects.create_user(
                email="",
                password="123456"
            )

    # ------------------------------------------------------
    # 3.a Transformação/Validação de Dados
    # Verifica a associação correta entre evento e usuário
    # ------------------------------------------------------
    def test_evento_associado_ao_usuario(self):

        user = User.objects.create_user(
            email="evento@gmail.com",
            password="123456",
            nome="Evento",
            sobrenome="Teste",
            telefone="123"
        )

        evento = Evento.objects.create(
            usuario=user,
            nome="Evento Teste",
            data="2026-06-09",
            local="IFTM",
            descricao="Descrição"
        )

        self.assertEqual(evento.usuario, user)

    # ------------------------------------------------------
    # 3.c Simulação
    # Simula dois usuários diferentes para verificar o
    # isolamento dos dados entre contas
    # ------------------------------------------------------
    def test_usuario_nao_ve_eventos_de_outro(self):

        user1 = User.objects.create_user(
            email="u1@gmail.com",
            password="123456",
            nome="U1",
            sobrenome="Teste",
            telefone="123"
        )

        user2 = User.objects.create_user(
            email="u2@gmail.com",
            password="123456",
            nome="U2",
            sobrenome="Teste",
            telefone="123"
        )

        Evento.objects.create(
            usuario=user1,
            nome="Evento U1",
            data="2026-06-09",
            local="IFTM",
            descricao="Descrição"
        )

        eventos_user2 = Evento.objects.filter(
            usuario=user2
        )

        self.assertEqual(
            eventos_user2.count(),
            0
        )

        # ------------------------------------------------------
        # 5.a Autenticação
        # Verifica se usuário sem token recebe 401
        # ------------------------------------------------------
        def test_endpoint_protegido_sem_login(self):

            response = self.client.get(
                "/api/eventos/"
            )

            self.assertEqual(
                response.status_code,
                401
            )

        # ------------------------------------------------------
        # 5.a Autorização
        # Verifica se usuário não acessa recurso alheio
        # ------------------------------------------------------
        def test_usuario_nao_acessa_evento_de_outro(self):

            user1 = User.objects.create_user(
                email="u1@gmail.com",
                password="123456",
                nome="U1",
                sobrenome="Teste",
                telefone="123"
            )

            user2 = User.objects.create_user(
                email="u2@gmail.com",
                password="123456",
                nome="U2",
                sobrenome="Teste",
                telefone="123"
            )

            evento = Evento.objects.create(
                usuario=user1,
                nome="Evento",
                data="2026-06-09",
                local="IFTM",
                descricao="Teste"
            )

            self.client.force_authenticate(user=user2)

            response = self.client.delete(
                f"/api/eventos/{evento.id}/excluir/"
            )

            self.assertIn(
                response.status_code,
                [403, 404]
            )

        # ------------------------------------------------------
        # 5.b SQL Injection
        # Verifica proteção contra entradas maliciosas
        # ------------------------------------------------------
        def test_sql_injection_login(self):

            response = self.client.post(
                "/api/login/",
                {
                    "email": "' OR 1=1 --",
                    "password": "' OR 1=1 --"
                },
                format="json"
            )

            self.assertNotEqual(
                response.status_code,
                200
            )