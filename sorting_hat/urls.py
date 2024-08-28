from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.documentation import include_docs_urls
from sorting_hat.views import SurveyViewSet, QuestionViewSet, AnswerViewSet, RegisterView, LoginView, UserView
from .views import get_username_by_id, generate_plot

from django.conf import settings
from django.conf.urls.static import static

# todo este codigo es para hacer la API Rest, es decir,
# para que se pueda hacer un GET, POST, PUT, DELETE

router = routers.DefaultRouter()
router.register(r'surveys', SurveyViewSet, 'surveys')  # api/surveys
router.register(r'questions', QuestionViewSet, 'questions')  # api/questions
router.register(r'answers', AnswerViewSet, 'answers')  # api/answers

# api versioning
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/signup/', RegisterView.as_view()),
    path('api/login/', LoginView.as_view()),
    path('api/user/', UserView.as_view()),
    path('api/surveys/<int:pk>/questions/', SurveyViewSet.as_view({'get': 'questions'})),
    path('api/surveys/<int:pk>/questions/fillout/', SurveyViewSet.as_view({'post': 'submit_answers'})),
    path('api/profile/', SurveyViewSet.as_view({'get':  'userSurveys'})),
    path('api/get_username/<int:user_id>/', get_username_by_id),
    path('api/surveys/<int:pk>/results/overall/', SurveyViewSet.as_view({'get': 'get_answers'})),
    path('api/generate-plot/<int:survey_id>/', generate_plot),

    path('api/docs/', include_docs_urls(title='Sorting Hat API', public=True)),
]

if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)