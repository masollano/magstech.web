from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

        

class UnitLocationSerializers(serializers.ModelSerializer):
    class Meta:
        model = UnitLocation
        fields = '__all__'
        
class authenticateSerializers(serializers.ModelSerializer):
    class Meta:
        model = authenticate
        fields = '__all__'

class MainRefCustomerSerializers(serializers.ModelSerializer):
    class Meta:
        model = MainRefCustomer
        fields = '__all__'
        
class MainRefTransactionTypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = MainRefTransactionType
        fields = '__all__'
        

class MainRefSLBankAccountSerializers(serializers.ModelSerializer):
    class Meta:
        model = MainRefSLBankAccount
        fields = '__all__'
        
class MainRefDocTypeSetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainRefDocTypeSetup
        fields = '__all__'

class MainRefSLSupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainRefSlSupplier
        fields = '__all__'

class GLTransactionListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLTransactionListing
        fields = '__all__'

class GLRefCOACascadeCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLRefCOAComplete
        fields = '__all__'

class GLRefCOACascade4Serializer(serializers.ModelSerializer):
    class Meta:
        model = GLRefCOACascade4
        fields = '__all__'

class GLRefCOACascade3Serializer(serializers.ModelSerializer):
    class Meta:
        model = GLRefCOACascade3
        fields = '__all__'

class GLRefCOACascade2Serializer(serializers.ModelSerializer):
    class Meta:
        model = GLRefCOACascade2
        fields = '__all__'

class GLRefCOACascade1Serializer(serializers.ModelSerializer):
    class Meta:
        model = GLRefCOACascade1
        fields = '__all__'

class GLGJListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLGJList
        fields = '__all__'

class GLGJAdjmntToPayableSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLGJAdjmntToPayable
        fields = '__all__'

class GLCRBListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLCRBList
        fields = '__all__'

class GLCDBListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLCDBList
        fields = '__all__'

class GLARBListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLARBList
        fields = '__all__'

class GLAPBPmtToPayableSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLAPBPmtToPayable
        fields = '__all__'

class GLAPBListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLAPBList
        fields = '__all__'