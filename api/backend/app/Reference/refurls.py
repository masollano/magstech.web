# from app.Reference.refviews import views
from django.urls import path
from django.urls import path
from app.Reference.refviews import *

urlpatterns = [
    path('customer-details', CustomerDetails.as_view(), name='CustomerDetails'),
    path('customer-search', CustomerSearchResults.as_view(), name='CustomerSearchResults'),
    path('bank-details', BankDetails.as_view(), name='BankDetails'),
    path('Document-Setup', DocSetupDetails.as_view(), name='DocSetupDetails'),
    path('supplier-details', SupplierDetails.as_view(), name='SupplierDetails'),

]

