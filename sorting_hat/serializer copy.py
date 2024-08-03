from rest_framework import serializers
from .models import User, Survey, Question, Answer

# los serializers convierten los datos de la db en JSON para que la API pueda enviarlos a través de la red

        
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class SurveySerializer(serializers.ModelSerializer):
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