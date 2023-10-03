# from django.shortcuts import redirect,render
# from django.template.response import TemplateResponse
# from django.http import HttpResponse,HttpResponseRedirect
# from .adminmodels import AllowedIP
# from django.core.exceptions import PermissionDenied
# from django.urls import reverse
# from django.contrib.auth.models import User
# from datetime import datetime
# ALLOWED_IPS=[]
# SESSION_TIMEOUT_SECONDS = 30 * 60

# class AdminLoginRestrictionMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         if request.path == '/admin/':
            
#             client_ip = request.META.get('REMOTE_ADDR', '')
#             ALLOWED_IPS = AllowedIP.objects.filter(is_superuser=True,ip_address=client_ip).values('ip_address')
#             response = self.get_response(request)
#             allowed_ips = AllowedIP.objects.filter(is_superuser=True, ip_address=client_ip)
#             if not allowed_ips.exists():
#                 return render(request, 'forbidden.html')
#             else:
#                 if 'UL_CODE' in request.session:
#                     ALLOWED_ACCESS =  User.objects.filter(is_superuser=True, username=request.user.username)
#                     print("IP:",ALLOWED_IPS)
#                     if ALLOWED_ACCESS.exists():
#                         return response
#                     else:
#                         return render(request, 'forbidden.html')
#                 else:
#                     return self.get_response(request)
#         else:
#            response = self.get_response(request)
#         return response
