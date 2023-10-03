from app. models import * 
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
from app.serializers import *
from rest_framework.permissions import AllowAny
import json
from rest_framework import status
from django.middleware import csrf
from django.http import JsonResponse
import base64

        
class CustomerDetails(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kw):
        trade_name = request.GET.get('trade_name', '')
        if trade_name == '':
            all_customers = MainRefCustomer.objects.all()
            latest_customer = MainRefCustomer.objects.order_by('-id_code').first()
            serializer_all_customers = MainRefCustomerSerializers(all_customers, many=True)
            serializer_latest_customer = MainRefCustomerSerializers(latest_customer)
            response_data = {
                'all_customers': serializer_all_customers.data,
                'latest_customer': serializer_latest_customer.data
            }
            return Response(response_data)
        else:
            customers = MainRefCustomer.objects.filter(trade_name__contains=trade_name).values('id_code', 'trade_name')
            return JsonResponse(list(customers), safe=False)
    def post(self,request, *args, **kw):
        data = self.request.data
        
        base64_image = data.get('image')
        if base64_image:
            image = base64.b64decode(base64_image.split(',')[1])
          
        SaveCustomer = MainRefCustomer(
            id_code = data['ID_Code'],
            trade_name = data['Tradename'],
            last_name = data['Lname'],
            first_name = data['Fname'],
            middle_name = data['MI'],
            business_phone_no = data['Phone'],
            mobile_no = data['Mobile'],
            fax_no = data['Fax'],
            address = data['Address'],
            city_municipality = data['City'],
            province = data['Province'],
            zip_code = data['ZipCode'],
            vat_registration_type = data['Vat'],
            tax_id_no = data['Tax'],
            group_name = data['Group'],
            area_name = data['Area'],
            agent_name = data['Agent'],
            collector_name = data['Collector'],
            kob_name = data['KOB'],
            sl_sub_category_description = data['sl'],
            remarks = data['Remarks'],
            customer_image = image,
        )
        SaveCustomer.save()
        return Response({'mesage':'Customer Successfully Added'})
    
    def put(self, request, *args, **kwargs):
        data = request.data
        try:
            cutomerDetails = MainRefCustomer.objects.get(id_code=data['ID_Code'])
            cutomerDetails.id_code = data.get('ID_Code', cutomerDetails.id_code)
            cutomerDetails.trade_name = data.get('Tradename', cutomerDetails.trade_name)
            cutomerDetails.last_name = data.get('Lname', cutomerDetails.last_name)
            cutomerDetails.first_name = data.get('Fname', cutomerDetails.first_name)
            cutomerDetails.middle_name = data.get('MI', cutomerDetails.middle_name)
            cutomerDetails.business_phone_no = data.get('Phone', cutomerDetails.business_phone_no)
            cutomerDetails.mobile_no = data.get('Mobile', cutomerDetails.mobile_no)
            cutomerDetails.fax_no = data.get('Fax', cutomerDetails.fax_no)
            cutomerDetails.address = data.get('Address', cutomerDetails.address)
            cutomerDetails.city_municipality = data.get('City', cutomerDetails.city_municipality)
            cutomerDetails.province = data.get('Province', cutomerDetails.province)
            cutomerDetails.zip_code = data.get('ZipCode', cutomerDetails.zip_code)
            cutomerDetails.vat_registration_type = data.get('Vat', cutomerDetails.vat_registration_type)
            cutomerDetails.tax_id_no = data.get('Tax', cutomerDetails.tax_id_no)
            cutomerDetails.active_status = data.get('Status', cutomerDetails.active_status)
            cutomerDetails.group_name = data.get('Group', cutomerDetails.group_name)
            cutomerDetails.area_name = data.get('Area', cutomerDetails.area_name)
            cutomerDetails.agent_name = data.get('Agent', cutomerDetails.agent_name)
            cutomerDetails.collector_name = data.get('Collector', cutomerDetails.collector_name)
            cutomerDetails.kob_name = data.get('KOB', cutomerDetails.kob_name)
            cutomerDetails.sl_sub_category_description = data.get('sl', cutomerDetails.sl_sub_category_description)
            cutomerDetails.remarks = data.get('Remarks', cutomerDetails.remarks)
            base64_image = data.get('image')

            if base64_image:
                image = base64.b64decode(base64_image.split(',')[1])
                cutomerDetails.customer_image = image
            cutomerDetails.save()

            return Response({"message": "UnitLocation updated successfully"}, status=status.HTTP_200_OK)
        except UnitLocation.DoesNotExist:
            return Response({"error": "UnitLocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CustomerSearchResults(APIView):
    def get(self, request, *args, **kwargs):
        trade_name = request.GET.get('trade_name', '')        
        latest_customers = MainRefCustomer.objects.filter(trade_name__icontains=trade_name)
        serializer = MainRefCustomerSerializers(latest_customers, many=True)  # Use many=True for multiple instances
        return Response({'customersSearch': serializer.data})
    def delete(self, request, *args, **kwargs):
        id_code = request.GET.get('id_code', '')   
        MainRefCustomer.objects.filter(id_code=id_code).delete()
        return Response({'message': 'Location Successfully Deleted'})
    
class BankDetails(APIView):
    def get(self, request, *args, **kw):
            Bank_list = MainRefSLBankAccount.objects.all()
            serializer_all_banks= MainRefSLBankAccountSerializers(Bank_list, many=True)
            latest_bank = MainRefSLBankAccount.objects.order_by('-id_code').latest('id_code')
            serializer_latest_Bank = MainRefSLBankAccountSerializers(latest_bank)
            response_data = {
                'all_banks': serializer_all_banks.data,
                'latest_bank': serializer_latest_Bank.data
            }
            return Response(response_data)
        
        
    def post(self, request, *args, **kw):
        data = self.request.data
        SaveBankDetails= MainRefSLBankAccount(
             id_code = data['bank_code'],
             bank_name = data['Bank_Name'],
             bank_branch = data['Bank_Branch'],
             bank_abbreviation = data['Bank_Abbre'],
             sl_code = data['sl_code'],
             sl_account = data['sl_account'],
             acct_title = data['Acct_title'],
             acct_type = data['acct_type'],
             acct_purpose = data['acct_purpose'],
             active_status = data['Status'],
         )
        SaveBankDetails.save()
        return Response({'message':'Successfully Added'})
    
    def put(self, request, *args, **kwargs):
        data = request.data
         # Assuming you're passing the bank ID in the URL
        try:
            bank_details = MainRefSLBankAccount.objects.get(id_code=data['bank_code'])
        except MainRefSLBankAccount.DoesNotExist:
            return Response({'message': 'Bank details not found'}, status=status.HTTP_404_NOT_FOUND)

        bank_details.bank_name = data['Bank_Name']
        bank_details.bank_branch = data['Bank_Branch']
        bank_details.bank_abbreviation = data['Bank_Abbre']
        bank_details.sl_code = data['sl_code']
        bank_details.sl_account = data['sl_account']
        bank_details.acct_title = data['Acct_title']
        bank_details.acct_type = data['acct_type']
        bank_details.acct_purpose = data['acct_purpose']
        bank_details.active_status = data['Status']
        bank_details.save()

        return Response({'message': 'Successfully updated bank details'})
    
    def delete(self, request, *args, **kwargs):
          # Assuming you're passing the bank ID in the URL
        data = request.data
        try:
            bank_details = MainRefSLBankAccount.objects.get(id_code=data['bank_code'])
        except MainRefSLBankAccount.DoesNotExist:
            return Response({'message': 'Bank details not found'}, status=status.HTTP_404_NOT_FOUND)

        bank_details.delete()

        return Response({'message': 'Successfully deleted bank details'})
    
class DocSetupDetails(APIView):
    def get(self, request, *args, **kw):
            DocSetupList = MainRefDocTypeSetup.objects.all()
            serializer_all_banks= MainRefDocTypeSetupSerializer(DocSetupList, many=True)
            return Response(serializer_all_banks.data)
    def post(self, request, *args, **kw):
        data = self.request.data
        SaveDocumentTypeSetup= MainRefDocTypeSetup(
             doc_type_name = data['DocName'],
             module = data['Module'],
             ul_restriction = data['UlRes'],
             site_restriction = data['SiteRes'],
             doc_no_edit_restriction = data['DocNoEdit'],
             tax_type = data['TaxType'],
             collection_type = data['CollectionType'],
             output_tax_item_type = data['OutputTax'],
            allow_no_po = data['AllowPoNo'],
            allow_ppe = data['AllowPPE'],
            active_status = data['Status'],
         )
        SaveDocumentTypeSetup.save()
        return Response({'message':'Successfully Added'})
    def put(self, request):
        data = request.data
        
        try:
            document = MainRefDocTypeSetup.objects.get(id=data['id'])
        except MainRefDocTypeSetup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
      # Update the fields directly
        document.doc_type_name = data['DocName']
        document.module = data['Module']
        document.ul_restriction = data['UlRes']
        document.site_restriction = data['SiteRes']
        document.doc_no_edit_restriction = data['DocNoEdit']
        document.tax_type = data['TaxType']
        document.collection_type = data['CollectionType']
        document.output_tax_item_type = data['OutputTax']
        document.allow_no_po = data['AllowPoNo']
        document.allow_ppe = data['AllowPPE']
        document.active_status = data['Status']

        document.save()  # Save the changes

        return Response(status=status.HTTP_200_OK)
    
    
class SupplierDetails(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kw):
        trade_name = request.GET.get('trade_name', '')
        if trade_name == '':
            all_customers = MainRefSlSupplier.objects.all()
            latest_customer = MainRefSlSupplier.objects.order_by('-id_code').first()
            serializer_all_customers = MainRefSLSupplierSerializer(all_customers, many=True)
            serializer_latest_customer = MainRefSLSupplierSerializer(latest_customer)
            response_data = {
                'all_customers': serializer_all_customers.data,
                'latest_customer': serializer_latest_customer.data
            }
            return Response(response_data)
        else:
            customers = MainRefCustomer.objects.filter(trade_name__contains=trade_name).values('id_code', 'trade_name')
            return JsonResponse(list(customers), safe=False)
    def post(self,request, *args, **kw):
        data = self.request.data
        
        base64_image = data.get('supplier_image')
        if base64_image:
            image = base64.b64decode(base64_image.split(',')[1])
          
        SaveCustomer = MainRefSlSupplier(
            id_code = data['ID_Code'],
            trade_name = data['Tradename'],
            last_name = data['Lname'],
            first_name = data['Fname'],
            middle_name = data['MI'],
            business_phone_no = data['Phone'],
            mobile_no = data['Mobile'],
            fax_no = data['Fax'],
            address = data['Address'],
            city_municipality = data['City'],
            province = data['Province'],
            zip_code = data['ZipCode'],
            vat_registration_type = data['Vat'],
            tax_id_no = data['Tax'],
            group_name = data['Group'],
            # area_name = data['Area'],
            # agent_name = data['Agent'],
            # collector_name = data['Collector'],
            # kob_name = data['KOB'],
            sl_sub_category_description = data['sl'],
            remarks = data['Remarks'],
            supplier_image = image,
        )
        SaveCustomer.save()
        return Response({'mesage':'Customer Successfully Added'})
    
    def put(self, request, *args, **kwargs):
        data = request.data
        try:
            cutomerDetails = MainRefSlSupplier.objects.get(id_code=data['ID_Code'])
            cutomerDetails.id_code = data.get('ID_Code', cutomerDetails.id_code)
            cutomerDetails.trade_name = data.get('Tradename', cutomerDetails.trade_name)
            cutomerDetails.last_name = data.get('Lname', cutomerDetails.last_name)
            cutomerDetails.first_name = data.get('Fname', cutomerDetails.first_name)
            cutomerDetails.middle_name = data.get('MI', cutomerDetails.middle_name)
            cutomerDetails.business_phone_no = data.get('Phone', cutomerDetails.business_phone_no)
            cutomerDetails.mobile_no = data.get('Mobile', cutomerDetails.mobile_no)
            cutomerDetails.fax_no = data.get('Fax', cutomerDetails.fax_no)
            cutomerDetails.address = data.get('Address', cutomerDetails.address)
            cutomerDetails.city_municipality = data.get('City', cutomerDetails.city_municipality)
            cutomerDetails.province = data.get('Province', cutomerDetails.province)
            cutomerDetails.zip_code = data.get('ZipCode', cutomerDetails.zip_code)
            cutomerDetails.vat_registration_type = data.get('Vat', cutomerDetails.vat_registration_type)
            cutomerDetails.tax_id_no = data.get('Tax', cutomerDetails.tax_id_no)
            cutomerDetails.active_status = data.get('Status', cutomerDetails.active_status)
            cutomerDetails.group_name = data.get('Group', cutomerDetails.group_name)
            # cutomerDetails.area_name = data.get('Area', cutomerDetails.area_name)
            # cutomerDetails.agent_name = data.get('Agent', cutomerDetails.agent_name)
            # cutomerDetails.collector_name = data.get('Collector', cutomerDetails.collector_name)
            # cutomerDetails.kob_name = data.get('KOB', cutomerDetails.kob_name)
            cutomerDetails.sl_sub_category_description = data.get('sl', cutomerDetails.sl_sub_category_description)
            cutomerDetails.remarks = data.get('Remarks', cutomerDetails.remarks)
            base64_image = data.get('image')

            if base64_image:
                image = base64.b64decode(base64_image.split(',')[1])
                cutomerDetails.supplier_image = image
            cutomerDetails.save()

            return Response({"message": "UnitLocation updated successfully"}, status=status.HTTP_200_OK)
        except UnitLocation.DoesNotExist:
            return Response({"error": "UnitLocation not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
