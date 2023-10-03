from app. models import * 
from django.http import JsonResponse
from datetime import datetime
from django.db.models.functions import Concat
from django.db.models import F, CharField, Value, Q, Func, Value
from django.db.models.functions import Cast
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

class TransTypeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        cash_flow_cat = request.GET.get('cash_flow_cat', '')
        module_type = request.GET.get('module_type', '')
        trans_type_description = request.GET.get('trans_type_description', '')
        
        if cash_flow_cat == '':
            return JsonResponse('', safe=False)
        else:
            output = MainRefTransactionType.objects.filter(Q(trans_type_description__icontains = trans_type_description), trans_type_cash_flow_category=cash_flow_cat,module_type=module_type).exclude(cash_flow_header='Y').values('trans_type_description','sl_type')
            serializer = MainRefTransactionTypeSerializers(output, many = True)
            return Response(serializer.data)
        

class ActivityTypeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        module_type = request.GET.get('module_type', '')

        output = MainRefTransactionType.objects.filter(module_type=module_type, cash_flow_header='Y').values('trans_type_description','trans_type_cash_flow_category')
        serializer = MainRefTransactionTypeSerializers(output, many = True)

        return Response(serializer.data)
    
class DocTypeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        module = request.GET.get('module', '')
        ul_restriction = request.GET.get('ul_restriction', '')
        ul = [ul_restriction,'0']

        output = MainRefDocTypeSetup.objects.filter(module=module, ul_restriction__in=ul).values('doc_type_name','doc_no_edit_restriction')
        serializer = MainRefDocTypeSetupSerializer(output, many = True)

        return Response(serializer.data)
    
class DocNoView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        module = request.GET.get('module', '')
        doc_type = request.GET.get('doc_type', '')
        ul_id = request.GET.get('ul_id', '')
        ul = [ul_id,'0']
        print(module)
        output = MainRefNumberGenerator.objects.filter(module=module, doc_type=doc_type,ul_id__in=ul).values('next_no')
        if output.exists():
            serializer = MainRefNumberGeneratorSerializers(output, many = True)
            return Response(serializer.data)
        else:
            new_doc_type = MainRefNumberGenerator(module=module,next_no='0',ul_id=ul_id,doc_type=doc_type)
            new_doc_type.save()
            outputNew = MainRefNumberGenerator.objects.filter(module=module, doc_type=doc_type,ul_id__in=ul).values('next_no')
            serializer = MainRefNumberGeneratorSerializers(outputNew, many = True)
            return Response(serializer.data)
        
        
class SearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        str = request.GET.get('str', '')
        SLType = request.GET.get('SLType', '')
        field = request.GET.get('field', '')
        
        if field == 'payee':
            if SLType == 'S':
                output =  MainRefSlSupplier.objects.filter(Q(trade_name__icontains=str),active_status='Y').values('address',name=models.F('trade_name'),idcode=models.F('id_code')).order_by('trade_name')
                # serializer = MainRefSlSupplierSerializers(output, many = True)
                # return Response(serializer.data)
                return Response(output)
            elif SLType == 'C':
                output =  MainRefCustomer.objects.filter(Q(trade_name__icontains=str),active_status='Y').values('address',name=models.F('trade_name'),idcode=models.F('id_code')).order_by('trade_name')
                # serializer = MainRefCustomerSerializers(output, many = True)
                return Response(output)
        elif field == 'drawee':
            output =  MainRefSLBankAccount.objects.filter(Q(bank_name__icontains=str),active_status='Y').values(name=models.F('bank_name'),idcode=models.F('id_code')).order_by('bank_name')
            # serializer = MainRefSLBankAccountSerializers(output, many = True)
            return Response(output)


class AccountTitleView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        str = request.GET.get('str', '')
        
        output = GLRefCOACascade4.objects.filter(Q(acct_description__icontains=str),active_status='Y').values('acct_title_code','acct_description','sl_type','sl_sub_category_id').order_by('acct_description')
        serializer = GLRefCOACascade4Serializer(output, many = True)
        return Response(serializer.data)
    
    
class ApplicationPaymentView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        code = request.GET.get('acc_code', '')
        sltype = request.GET.get('sl_type', '')
        datefrom = request.GET.get('startDate', '')
        dateto = request.GET.get('endDate', '')
        idcode = request.GET.get('payeeID', '')
        
        output = GLTransactionListing.objects.annotate(doc_ref=Concat(Cast(models.F('doc_type'), CharField()),Value('#'),Cast(models.F('doc_no'), CharField()))
                                            ).filter(acct_title_code=code, sl_type=sltype, transacting_party_id=idcode,date_trans__range=(datefrom,dateto)
                                            ).values('doc_ref',
                                                    autonum=models.F('id'),
                                                    ul=models.F('ul_id'),
                                                    accCode=models.F('acct_title_code'),
                                                    acctTitle=models.F('acct_description'),
                                                    sl_code=models.F('sl_id'),
                                                    slName=models.F('sl_description'),
                                                    debit=models.F('credit_amount'),
                                                    credit=Value(0),
                                                    app_payment=Value(0),
                                                    trans_date=models.F('date_trans')
                                            ).exclude(credit_amount='0'
                                            ).order_by('date_trans')
        
        # output = GLTransactionListing.objects.annotate(doc_ref=Concat(models.F('doc_type'), Value('#'),models.F('doc_no'))
        #                                     ).filter(acct_title_code=code, sl_type=sltype, transacting_party_id=idcode,date_trans__range=(datefrom,dateto)
        #                                     ).values('id',
        #                                             'ul_id',
        #                                             'acct_title_code',
        #                                             'acct_description',
        #                                             'sl_id',
        #                                             'sl_description',
        #                                             'credit_amount',
        #                                             'date_trans',
        #                                     ).exclude(credit_amount='0'
        #                                     ).order_by('date_trans')
        
        # serializer = GLTransactionListingSerializer(output, many = True)
        return Response(output)