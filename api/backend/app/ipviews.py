# from django.shortcuts import render, redirect
# from django.core.exceptions import ValidationError
# from django.core.validators import validate_ipv4_address, validate_ipv6_address
# from .adminmodels import AllowedIP

# def change_form_viewIP(request, pk):
#     try:
#         allowed_ip = AllowedIP.objects.get(pk=pk)
#     except AllowedIP.DoesNotExist:
#         # Handle the case when the AllowedIP instance with the given pk does not exist
#         # You can redirect to an error page or handle it as appropriate for your application.
#         pass

#     if request.method == 'POST':
#         ip_address = request.POST.get('ip_address')
#         is_superuser = bool(request.POST.get('is_superuser'))

#         try:
#             if ':' in ip_address:
#                 validate_ipv6_address(ip_address)
#             else:
#                 validate_ipv4_address(ip_address)
#         except ValidationError:
#             # Invalid IP address, handle the error as needed
#             error_message = "Invalid IP address. Please enter a valid IP address."
#             return render(request, 'admin/myapp/change_form.html', {'initial_data': {'ip_address': ip_address, 'is_superuser': is_superuser}, 'error_message': error_message})

#         # Save the data to the model instance
#         allowed_ip.ip_address = ip_address
#         allowed_ip.is_superuser = is_superuser
#         allowed_ip.save()

#         # Replace 'success_url' with the URL to redirect after successful form submission
#         return redirect('success_url')

#     # Pre-fill the form with existing data
#     initial_data = {
#         'ip_address': allowed_ip.ip_address,
#         'is_superuser': allowed_ip.is_superuser,
#     }
#     return render(request, 'admin/myapp/change_form.html', {'initial_data': initial_data})

