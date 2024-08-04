from rest_framework import viewsets, status, generics, permissions, views
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Survey, Question, Answer
from .serializer import SurveySerializer, QuestionSerializer, AnswerSerializer, RegisterSerializer, UserSerializer, LoginSerializer


# Esta clase sirve para mostrar los datos de la db en la API, la diferencia con
# los serializers es que aquí se definen las acciones que se pueden hacer con los datos

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny] # cualquiera puede acceder al registrarse


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = User.objects.get(email=email) # Buscar al usuario por email
            except User.DoesNotExist:
                return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(username=user.username, password=password) # auth con el username
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
    

class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        survey = self.get_object()
        questions = survey.questions.all()  # Utiliza el related_name definido en el modelo Question
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
                
        for key, value in answer_data.items():
            # Extract the question index from the key (e.g., "q0" -> 0)
            question_index = int(key[1:])
            setattr(answer, f"result{question_index+1}", value)
        
        answer.save()
        serializer = AnswerSerializer(answer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
            

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated] # solo los usuarios autenticados pueden hacer cambios
    
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
