from rest_framework import viewsets, status, generics, permissions, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Survey, Question, Answer
from .serializer import SurveySerializer, QuestionSerializer, AnswerSerializer, RegisterSerializer, UserSerializer, LoginSerializer
import os
import subprocess
from django.http import JsonResponse, HttpResponse
import io


# Esta clase sirve para mostrar los datos de la db en la API, la diferencia con
# los serializers es que aquí se definen las acciones que se pueden hacer con los datos


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    # cualquiera puede acceder al registrarse
    permission_classes = [permissions.AllowAny]


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                # Buscar al usuario por email
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(username=user.username,
                                password=password)  # auth con el username
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user': UserSerializer(user).data})
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# encontrar el user dado un user.id
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username_by_id(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        return Response({'username': user.username}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found by Id'}, status=status.HTTP_404_NOT_FOUND)


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        survey = self.get_object()  # DRF coje de la url el <int:pk>
        questions = survey.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def submit_answers(self, request, pk=None):
        survey = self.get_object()
        answer_data = request.data
        if not answer_data:
            return Response({"error": "Answer data is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user if request.user.is_authenticated else None

        if request.user.is_authenticated:
            try:
                answer = Answer.objects.get(survey=survey, user=user)
            except Answer.DoesNotExist:
                answer = Answer(survey=survey, user=user)
        else:
            answer = Answer(survey=survey, user=user)

        ADDITIONAL_QUESTIONS = {'question11', 'question12', 'question13'}
        for key, value in answer_data.items():
            # Extract the question index from the key (e.g., "question0" -> 0)
            if key in ADDITIONAL_QUESTIONS:
                # Asignar directamente las preguntas adicionales
                setattr(answer, key, value)
            else:
                question_index = int(key[8:])
                setattr(answer, f"question{question_index+1}", value)

        answer.save()
        serializer = AnswerSerializer(answer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def userSurveys(self, request, pk=None):
        surveys = Survey.objects.filter(user=request.user)
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def get_answers(self, request, pk=None):
        survey = self.get_object()
        answers = Answer.objects.filter(survey=survey)
        # el many=True es para que se muestren todos los datos
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    # solo los usuarios autenticados pueden hacer cambios
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        survey_id = request.data.get('survey')
        text = request.data.get('text')
        if not survey_id or not text:
            return Response({"error": "Survey and text are required"}, status=status.HTTP_400_BAD_REQUEST)
        survey = Survey.objects.get(pk=survey_id)
        question = Question.objects.create(survey=survey, text=text)
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticated]

from .etl import generate_plots
from django.core.exceptions import SuspiciousOperation

# def generate_plot(request, survey_id, plot_type):
#     try:
#         plots = generate_plots(survey_id)

#         if plots is None:
#             raise ValueError("No se encontraron gráficos para el survey_id dado.")

#         if plot_type not in plots:
#             return HttpResponse(status=404)

#         plot = plots[plot_type]
#         return HttpResponse(plot.getvalue(), content_type='image/png')
#     except ValueError as ve:
#         return JsonResponse({'error': str(ve)}, status=400)
#     except SuspiciousOperation as se:
#         return JsonResponse({'error': 'Solicitud sospechosa: {}'.format(se)}, status=400)
#     except Exception as e:
#         # Agrega más información sobre el error aquí
#         return JsonResponse({'error': 'Error interno del servidor: {}'.format(str(e))}, status=500)

import logging

logger = logging.getLogger(__name__)
def generate_plot(request, survey_id, plot_type):
    try:
        plots = generate_plots(request, survey_id, plot_type)
        if plots is None:
            logger.error(f"No se encontraron gráficos para el survey_id dado: {survey_id}")
            return JsonResponse({'error': 'No se encontraron gráficos para el survey_id dado.'}, status=404)

        if plot_type not in plots:
            logger.error(f"Tipo de gráfico no encontrado: {plot_type}")
            return HttpResponse(status=404)

        plot = plots[plot_type]
        img_data = plot.getvalue()

        if img_data.startswith(b'\x89PNG\r\n\x1a\n'):
            response = HttpResponse(img_data, content_type='image/png')
            response["Access-Control-Allow-Origin"] = "*"
            return response
        else:
            logger.error('El archivo generado no es una imagen PNG válida.')
            return JsonResponse({'error': 'El archivo generado no es una imagen PNG válida.'}, status=500)

    except Exception as e:
        logger.error(f"Error interno del servidor: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)