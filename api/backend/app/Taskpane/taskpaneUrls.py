from django.urls import path
from django.urls import path
from app.Taskpane.taskpaneViews import *

urlpatterns = [
    path('transType', TransTypeView.as_view(), name='TransTypeView'),
    path('activityType', ActivityTypeView.as_view(), name='ActivityTypeView'),
    path('docType', DocTypeView.as_view(), name='DocTypeView'),
    path('docNo', DocNoView.as_view(), name='DocNoView'),
    path('search', SearchView.as_view(), name='SearchView'),
    path('searchAccountTitle', AccountTitleView.as_view(), name='AccountTitleView'),
    path('applicationPayment', ApplicationPaymentView.as_view(), name='ApplicationPaymentView'),
]

