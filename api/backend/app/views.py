from . models import * 
from django.http import JsonResponse
from datetime import datetime
from django.db.models.functions import Concat
from django.db.models import F, CharField, Value, Q
from django.db import connection
from django.contrib.auth import authenticate, login
from django.contrib import auth

from rest_framework.views import APIView    
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import UnitLocationSerializers
from rest_framework.permissions import AllowAny
import json
from rest_framework import status
from django.middleware import csrf
from django.http import JsonResponse

def get_csrf_token(request):
    csrf_token = csrf.get_token(request)
    return JsonResponse({'csrf_token': csrf_token})

class LoginView(APIView):
    permission_classes = (AllowAny, )
    
    def post(self, request):
        data = self.request.data
        
        username = data['username']
        password = data['password']
        
        request.session['user_authenticated'] = True
        request.session['user'] = username
        
        try:
            user = auth.authenticate(username=username, password=password) 
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({ 'success': 'User Authenticated','username': username })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
                return Response({ 'error': 'Something went wrong when logging in' })
            
            
        
        

    
# def LoginView(request):
#         data = request.data
#         username = data['username']
#         password = data['password']
#         try:
#             user = auth.authenticate(username=username, password=password) 
#             if user:
#                 login(request, user)
#                 token, created = Token.objects.get_or_create(user=user)
#                 csrf_token = csrf.get_token(request)
#                 return Response({ 'success': 'User Authenticated','token': csrf_token ,'username': username })
#             else:
#                 return Response({ 'error': 'Error Authenticating' })
#         except:
#                 return Response({ 'error': 'Something went wrong when logging in' })
            
            
        
class UnitLocationView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, *args, **kw):

        data = UnitLocation.objects.all()
        serializer = UnitLocationSerializers(data, many=True)
        return Response(serializer.data)
    def post(self,request, *args, **kw):
        data = self.request.data
        print('sacve location',data)
        SaveUnitLocation = UnitLocation(
            ul_code = data['ulCode'],
            unit_description = data['unitDescription'],
            location_description = data['locationDescription'],
        )
        SaveUnitLocation.save()
        return Response({'mesage':'Location Successfully Added'})

    def delete(self, request, *args, **kwargs):
        data = self.request.data
        print('delete location', data)

        UnitLocation.objects.filter(ul_code=data['ulCode']).delete()

        return Response({'message': 'Location Successfully Deleted'})
    
    def put(self, request, *args, **kwargs):
        data = request.data
        # ul_code = kwargs.get('ul_code')  # Retrieve ul_code from URL parameters or kwargs

        try:
            unit_location = UnitLocation.objects.get(ul_code=data['ulCode'])
            unit_location.ul_code = data.get('ulCode', unit_location.ul_code)
            unit_location.unit_description = data.get('unitDescription', unit_location.unit_description)
            unit_location.location_description = data.get('locationDescription', unit_location.location_description)
            unit_location.save()

            return Response({"message": "UnitLocation updated successfully"}, status=status.HTTP_200_OK)
        except UnitLocation.DoesNotExist:
            return Response({"error": "UnitLocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def logout_view(request):

 
        request.session.delete()

        return Response({'message': 'Logged out successfully'})

