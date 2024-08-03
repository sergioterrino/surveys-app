from django.contrib import admin
from .models import Survey, Question, Answer

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 1  # Número de formularios adicionales vacíos para agregar nuevas respuestas

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1  # Número de formularios adicionales vacíos para agregar nuevas preguntas

@admin.register(Survey)
class SurveyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'user')
    search_fields = ('title', 'description')
    inlines = [QuestionInline]  # Muestra las preguntas asociadas en la misma página que la encuesta

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'survey', 'text')
    search_fields = ('text',)
    list_filter = ('survey',)  # Permite filtrar preguntas por encuesta

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'survey', 'user', 'created_at',
        'result1', 'result2', 'result3', 'result4', 
        'result5', 'result6', 'result7', 'result8',
        'result9', 'result10'
    )
    search_fields = ('question__text', 'user__username')
    list_filter = ('survey', 'user')
    readonly_fields = ('created_at',) 
