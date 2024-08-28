"""
URL configuration for sorting_hat_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    # antes estaba asi
    path("", include("sorting_hat.urls")), # incluye las urls del file urls.py del directorio sorting_hat
    
    # ahora esta asi para supuestamente desplegar el frontend
    # path("", include("sorting_hat.urls")),  # Mantén las rutas de la API separadas
    # path("", TemplateView.as_view(template_name="index.html")),  # Sirve la aplicación React para cualquier otra URL
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])