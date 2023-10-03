from . import views
from django.urls import path
from django.urls import path
from .views import UnitLocationView,LoginView,logout_view,get_csrf_token

urlpatterns = [
    path('location', UnitLocationView.as_view(), name='UnitLocationView'),
    path('login', LoginView.as_view(), name='LoginView'),
    # path('token', TokenView, name='TokenView'),
    path('logout', logout_view, name='logout_view'),
    path('get-csrf-token/', views.get_csrf_token, name='get_csrf_token'),
]

