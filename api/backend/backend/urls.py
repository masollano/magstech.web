
from django.contrib import admin
from django.urls import path,include, re_path
from django.views.generic import TemplateView
from app import views
from app.views import LoginView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls')),
    path('api/',include('app.urls')),
    path('api/',include('app.Reference.refurls')),
    path('api/taskpane/',include('app.Taskpane.taskpaneUrls')),
    
]
