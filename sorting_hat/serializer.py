from rest_framework import serializers
from .models import Survey, Question, Answer
from django.contrib.auth.models import User

# los serializers convierten los datos de la db en JSON para que la API pueda enviarlos a través de la red

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}} # no se envíala password al cliente en el JSON

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'] # se encripta la contraseña en el create_user
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class SurveySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True) # se muestra el username del usuario que creó la encuesta

    class Meta:
        model = Survey
        fields = ['id', 'title', 'description', 'user']
        
        
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'survey', 'text']
        
        
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'survey', 'user', 'result1', 'result2', 'result3', 'result4', 'result5', 'result6', 'result7', 'result8', 'result9', 'result10', 'created_at']