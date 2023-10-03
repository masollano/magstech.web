from django.contrib import admin

# Register your models here.
from django.contrib import admin


# from django.db import adminmodels
from .models import AllowedIP


admin.site.site_header = 'LEAD ADMIN'
admin.site.register(AllowedIP)
from django.contrib.auth.models import Permission
admin.site.register(Permission)