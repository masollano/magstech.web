from django.db import models

class UnitLocation(models.Model):
    id = models.AutoField(primary_key=True)
    ul_code = models.PositiveSmallIntegerField(default=0)
    unit_description = models.CharField(max_length=30, default=' ')
    location_description = models.CharField(max_length=40, default='')
    alpha_code = models.CharField(max_length=10, default='')

    class Meta:
        db_table = 'tbl_main_ref_unit_location'
        
class AllowedIP(models.Model):
    ip_address = models.GenericIPAddressField(unique=True)
    is_superuser = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.ip_address}"


class MainRefSLBankAccount(models.Model):
    id = models.AutoField(primary_key=True)
    id_code = models.CharField(max_length=10, default='0')
    sl_code = models.IntegerField(default=0)
    sl_account = models.CharField(max_length=150, default='')
    bank_name = models.CharField(max_length=150, default=' ')
    bank_branch = models.CharField(max_length=50, default=' ')
    bank_abbreviation = models.CharField(max_length=150, default=' ')
    acct_title = models.CharField(max_length=150, default='')
    acct_type = models.CharField(max_length=150, default='')
    acct_purpose = models.CharField(max_length=150, default='')
    active_status = models.CharField(max_length=1, default='Y')

    class Meta:
        db_table = 'tbl_main_ref_sl_bank_account'

class MainRefSlSupplier(models.Model):
    id = models.AutoField(primary_key=True)
    id_code = models.PositiveIntegerField(default=0)
    trade_name = models.CharField(max_length=150, default='')
    supplier_class = models.CharField(max_length=15, default=' ')
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=20)
    business_phone_no = models.CharField(max_length=15, default=' ')
    mobile_no = models.CharField(max_length=15, default=' ')
    fax_no = models.CharField(max_length=15, default=' ')
    address = models.CharField(max_length=150, default=' ')
    city_municipality = models.CharField(max_length=150, default=' ')
    province = models.CharField(max_length=150, default=' ')
    zip_code = models.PositiveIntegerField(default=0)
    trade = models.CharField(max_length=1, default='')
    vat_registration_type = models.CharField(max_length=1, default='')
    tax_id_no = models.CharField(max_length=25, default=' ')
    active_status = models.CharField(max_length=1, default='Y')
    group_id = models.PositiveIntegerField(default=0)
    group_name = models.CharField(max_length=150, default=' ')
    remarks = models.CharField(max_length=100, default=' ')
    supplier_image = models.BinaryField(null=True, blank=True)
    date_entered = models.DateField(default='1960-01-01')
    ul_code = models.PositiveIntegerField(default=0)
    sl_sub_category_id = models.PositiveIntegerField(default=0)
    sl_sub_category_description = models.CharField(max_length=50, default='')

    class Meta:
        db_table = 'tbl_main_ref_sl_supplier'


class MainRefCustomer(models.Model):
    id = models.AutoField(primary_key=True)
    id_code = models.BigIntegerField(default=0)
    trade_name = models.CharField(max_length=150, default=' ')
    customer_class = models.CharField(max_length=15, default=' ')
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=20)
    business_phone_no = models.CharField(max_length=15, default=' ')
    mobile_no = models.CharField(max_length=15, default=' ')
    fax_no = models.CharField(max_length=15, default=' ')
    address = models.CharField(max_length=150, default=' ')
    city_municipality = models.CharField(max_length=150, default=' ')
    province = models.CharField(max_length=150, default=' ')
    zip_code = models.IntegerField(default=0)
    vat_registration_type = models.CharField(max_length=1, default='')
    tax_id_no = models.CharField(max_length=25, default=' ')
    active_status = models.CharField(max_length=1, default='Y')
    group_id = models.IntegerField(default=0)
    group_name = models.CharField(max_length=150, default=' ')
    area_id = models.IntegerField(default=0)
    area_name = models.CharField(max_length=150, default=' ')
    agent_id = models.IntegerField(default=0)
    agent_name = models.CharField(max_length=150, default=' ')
    collector_id = models.IntegerField(default=0)
    collector_name = models.CharField(max_length=150, default=' ')
    kob_id = models.IntegerField(default=0)
    kob_name = models.CharField(max_length=150, default=' ')
    remarks = models.CharField(max_length=100, default=' ')
    customer_image = models.BinaryField(null=True)
    date_entered = models.DateField(default='1900-01-01')
    ul_code = models.IntegerField(default=0)
    sl_sub_category_id = models.IntegerField(default=0)
    sl_sub_category_description = models.CharField(max_length=50, default='')

    class Meta:
        db_table = 'tbl_main_ref_sl_customer'
        

#TASK PANE MODELS
class MainRefTransactionType(models.Model):
    id = models.AutoField(primary_key=True)
    trans_type_id = models.IntegerField(default=0)
    module_type = models.CharField(max_length=3, default='')
    cash_flow_header = models.CharField(max_length=1, default='')
    trans_type_cash_flow_category = models.CharField(max_length=10, default='')
    trans_type_description = models.CharField(max_length=100, default=' ')
    sl_type = models.CharField(max_length=1, default='')
    sl_sub_category_id = models.IntegerField(null=True, default=None)
    sl_sub_category_description = models.CharField(max_length=100, default='')
    active_status = models.CharField(max_length=1, default='Y')
    wtax = models.CharField(max_length=1, default='')
    
    class Meta:
        db_table = 'tbl_main_ref_transaction_type'
        

class MainRefDocTypeSetup(models.Model):
    id = models.BigAutoField(primary_key=True)
    doc_type_name = models.CharField(max_length=15, default='')
    module = models.CharField(max_length=15, default='')
    ul_restriction = models.IntegerField(default=0)
    site_restriction = models.IntegerField(default=1)
    doc_no_edit_restriction = models.CharField(max_length=1, default='N')
    tax_type = models.CharField(max_length=10, default='')
    collection_type = models.CharField(max_length=25, default='')
    output_tax_item_type = models.CharField(max_length=10, default='')
    allow_no_po = models.CharField(max_length=10, default='')
    allow_ppe = models.CharField(max_length=1, default='')
    active_status = models.CharField(max_length=1, default='Y')
    
    class Meta:
        db_table = 'tbl_main_ref_doc_type_setup'


class GLRefCOAComplete(models.Model):
    id = models.AutoField(primary_key=True)
    cascade_id_1st = models.IntegerField(null=True, default=None)
    cascade_id_2nd = models.IntegerField(null=True, default=None)
    cascade_id_3rd = models.IntegerField(null=True, default=None)
    cascade_id_4th = models.IntegerField(null=True, default=None)
    acct_title_code = models.CharField(max_length=15, default='0')
    acct_description = models.CharField(max_length=1000, default=' ')
    active_status = models.CharField(max_length=1, default='Y')
    
    cascade_1st = models.ForeignKey('GLRefCOACascade1', on_delete=models.CASCADE, db_column='1st_cascade_id', null=True)
    cascade_2nd = models.ForeignKey('GLRefCOACascade2', on_delete=models.CASCADE, db_column='2nd_cascade_id', null=True)
    cascade_3rd = models.ForeignKey('GLRefCOACascade3', on_delete=models.CASCADE, db_column='3rd_cascade_id', null=True)
    cascade_4th = models.ForeignKey('GLRefCOACascade4', on_delete=models.CASCADE, db_column='4th_cascade_id', null=True)
    
    class Meta:
        db_table = 'tbl_gl_ref_coa_complete'

class GLTransactionListing(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    transacting_party = models.CharField(max_length=100, default='')
    transacting_party_id = models.IntegerField(null=True, default=None)
    transacting_party_type = models.CharField(max_length=25, default='')
    gl_module = models.CharField(max_length=4, default='')
    transaction_id = models.IntegerField(null=True, default=None)
    doc_type = models.CharField(max_length=15, default='')
    doc_no = models.BigIntegerField(default=0)
    date_trans = models.DateTimeField(null=True, default=None)
    trans_type = models.CharField(max_length=100, default='')
    coa_complete_id = models.IntegerField(null=True, default=None)
    cascade_code_1st = models.IntegerField(default=0)
    cascade_code_2nd = models.IntegerField(default=0)
    cascade_code_3rd = models.IntegerField(default=0)
    cascade_code_4th = models.IntegerField(default=0)
    acct_title_code = models.IntegerField(default=0)
    acct_description = models.CharField(max_length=100, default='')
    sl_type = models.CharField(max_length=1, default='')
    sl_id = models.IntegerField(null=True, default=None)
    sl_description = models.CharField(max_length=100, default='')
    sl_sub_category_id = models.IntegerField(null=True, default=None)
    sl_sub_category_description = models.CharField(max_length=100, default='')
    debit_amount = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    credit_amount = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    transaction_status = models.CharField(max_length=20, default='')
    posting_status = models.CharField(max_length=2, default='')
    payment_status = models.CharField(max_length=10, default='')
    pos_terminal_no = models.CharField(max_length=10, default='')
    due_date = models.DateField(default='1900-01-01')
    coa_complete_reference = models.ForeignKey(GLRefCOAComplete, on_delete=models.CASCADE, db_column='coa_complete_reference_id', null=True)


    class Meta:
        db_table = 'tbl_gl_transaction_listing'

class GLRefCOACascade1(models.Model):
    id = models.AutoField(primary_key=True)
    cascade_code_1st = models.IntegerField(default=0)
    element_description = models.CharField(max_length=100)
    active_status = models.CharField(max_length=1, default='Y')
    
    class Meta:
        db_table = 'tbl_gl_ref_coa_cascade1'
    
class GLRefCOACascade2(models.Model):
    id = models.AutoField(primary_key=True)
    cascade_id_1st = models.IntegerField(null=True, default=None)
    cascade_code_2nd = models.IntegerField(default=0)
    classification_description = models.CharField(max_length=100)
    active_status = models.CharField(max_length=1, default='Y')
    
    cascade_1st = models.ForeignKey('GLRefCOACascade1', on_delete=models.CASCADE, db_column='1st_cascade_id', null=True)
    
    class Meta:
        db_table = 'tbl_gl_ref_coa_cascade2'

class GLRefCOACascade3(models.Model):
    id = models.AutoField(primary_key=True)
    cascade_id_2nd = models.IntegerField(null=True, default=None)
    cascade_code_3rd = models.IntegerField(default=0)
    aggregate_description = models.CharField(max_length=100)
    acct_desc = models.CharField(max_length=1000, default=' ')
    active_status = models.CharField(max_length=1, default='Y')
    
    cascade_2nd = models.ForeignKey('GLRefCOACascade2', on_delete=models.CASCADE, db_column='2nd_cascade_id', null=True)
    
    class Meta:
        db_table = 'tbl_gl_ref_coa_cascade3'

class GLRefCOACascade4(models.Model):
    id = models.AutoField(primary_key=True)
    cascade_id_3rd = models.IntegerField(null=True, default=None)
    cascade_code_4th = models.IntegerField(default=0)
    acct_title_code = models.CharField(max_length=15, default='0')
    acct_description = models.CharField(max_length=1000, default=' ')
    with_sl = models.CharField(max_length=1, default='')
    sl_type = models.CharField(max_length=1, default='')
    sl_sub_category_id = models.IntegerField(null=True, default=None)
    sl_sub_category_description = models.CharField(max_length=100, default='')
    sl_id = models.IntegerField(null=True, default=None)
    sl_description = models.CharField(max_length=100, default='')
    calculation = models.PositiveSmallIntegerField(default=0)
    alternative_acct_code = models.CharField(max_length=50, default=' ')
    alternative_acct_description = models.CharField(max_length=100, default=' ')
    active_status = models.CharField(max_length=1, default='Y')
    
    cascade_3rd = models.ForeignKey('GLRefCOACascade3', on_delete=models.CASCADE, db_column='3rd_cascade_id', null=True)
    
    class Meta:
        db_table = 'tbl_gl_ref_coa_cascade4'
        
class GLGJAdjmntToPayable(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    source_module_adjustment = models.CharField(max_length=4, default='', blank=True)
    doc_type_adjustment = models.CharField(max_length=15, default='', blank=True)
    doc_no_adjustment = models.BigIntegerField(default=0)
    date_trans_adjustment = models.DateTimeField(null=True, default=None)
    trans_type_adjustment = models.CharField(max_length=50, default='', blank=True)
    total_amount_adjustment = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    source_module_payable = models.CharField(max_length=5, default='', blank=True)
    doc_type_payable = models.CharField(max_length=15, default='', blank=True)
    doc_no_payable = models.BigIntegerField(default=0)
    date_trans_payable = models.DateTimeField(null=True, default=None)
    total_amount_payable = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    acct_title_code_payable = models.CharField(max_length=15, default='0', blank=True)
    acct_description_payable = models.CharField(max_length=150, default='', blank=True)
    sl_type_payable = models.CharField(max_length=1, default='', blank=True)
    sl_id_payable = models.IntegerField(null=True, default=None)
    sl_description_payable = models.CharField(max_length=50, default=None, blank=True)
    transaction_status = models.CharField(max_length=20, default='', blank=True)
    posting_status = models.CharField(max_length=2, default='', blank=True)
    
    class Meta:
        db_table = 'tbl_gl_gj_adjmnt_to_payable'
   

class GLAPBList(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    transacting_party_id = models.IntegerField(null=True, default=None)
    transacting_party = models.CharField(max_length=100, default='')
    doc_type = models.CharField(max_length=15, default='')
    doc_no = models.BigIntegerField(default=0)
    date_trans = models.DateTimeField(null=True, default=None)
    trans_type = models.CharField(max_length=150, default='')
    transaction_status = models.CharField(max_length=1, default='')
    sys_type = models.CharField(max_length=5, default='')
    prepared_by = models.CharField(max_length=60, null=True, default=None)
    prepared_date = models.CharField(max_length=25, null=True, default=None)
    reviewed_by = models.CharField(max_length=60, null=True, default=None)
    reviewed_date = models.CharField(max_length=25, null=True, default=None)
    approved_by = models.CharField(max_length=60, null=True, default=None)
    approved_date = models.CharField(max_length=25, null=True, default=None)
    cancel_by = models.CharField(max_length=60, null=True, default=None)
    cancel_date = models.CharField(max_length=25, null=True, default=None)
    remarks = models.CharField(max_length=100, null=True, default=None)
    terms_payment = models.DecimalField(max_digits=15, decimal_places=3, default=0.000)
    due_date = models.DateField(null=True, default=None)
    
    class Meta:
        db_table = 'tbl_gl_apb_list'


class GLAPBPmtToPayable(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    source_module_payment = models.CharField(max_length=4, default='', blank=True)
    doc_type_payment = models.CharField(max_length=15, default='', blank=True)
    doc_no_payment = models.BigIntegerField(default=0)
    date_trans_payment = models.DateTimeField(null=True, default=None)
    trans_type_payment = models.CharField(max_length=50, default='', blank=True)
    total_amount_payment = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    source_module_payable = models.CharField(max_length=5, default='', blank=True)
    doc_type_payable = models.CharField(max_length=15, default='', blank=True)
    doc_no_payable = models.BigIntegerField(default=0)
    date_trans_payable = models.DateTimeField(null=True, default=None)
    total_amount_payable = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    acct_title_code_payable = models.CharField(max_length=15, default='0', blank=True)
    acct_description_payable = models.CharField(max_length=150, default='', blank=True)
    sl_type_payable = models.CharField(max_length=1, default='', blank=True)
    sl_id_payable = models.IntegerField(null=True, default=None)
    sl_description_payable = models.CharField(max_length=50, default=None, blank=True)
    transaction_status = models.CharField(max_length=20, default='', blank=True)
    posting_status = models.CharField(max_length=2, default='', blank=True)
    
    class Meta:
        db_table = 'tbl_gl_apb_pmt_to_payable'

class GLARBList(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    transacting_party_id = models.IntegerField(null=True, default=None)
    transacting_party = models.CharField(max_length=100, default='')
    doc_type = models.CharField(max_length=15, default='')
    doc_no = models.BigIntegerField(default=0)
    date_trans = models.DateTimeField(null=True, default=None)
    trans_type = models.CharField(max_length=150, default='')
    transaction_status = models.CharField(max_length=1, default='')
    sys_type = models.CharField(max_length=5, default='')
    prepared_by = models.CharField(max_length=60, null=True, default=None)
    prepared_date = models.CharField(max_length=25, null=True, default=None)
    reviewed_by = models.CharField(max_length=60, null=True, default=None)
    reviewed_date = models.CharField(max_length=25, null=True, default=None)
    approved_by = models.CharField(max_length=60, null=True, default=None)
    approved_date = models.CharField(max_length=25, null=True, default=None)
    cancel_by = models.CharField(max_length=60, null=True, default=None)
    cancel_date = models.CharField(max_length=25, null=True, default=None)
    remarks = models.CharField(max_length=100, null=True, default=None)
    terms_payment = models.DecimalField(max_digits=15, decimal_places=3, default=0.000)
    due_date = models.DateField(null=True, default=None)
    
    class Meta:
        db_table = 'tbl_gl_arb_list'
      
class GLCRBList(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    transacting_party_id = models.IntegerField(null=True, default=None)
    transacting_party = models.CharField(max_length=100, default='')
    doc_type = models.CharField(max_length=15, default='')
    doc_no = models.BigIntegerField(default=0)
    date_trans = models.DateTimeField(null=True, default=None)
    trans_type = models.CharField(max_length=150, default='')
    transaction_status = models.CharField(max_length=1, default='')
    sys_type = models.CharField(max_length=5, default='')
    prepared_by = models.CharField(max_length=60, null=True, default=None)
    prepared_date = models.CharField(max_length=25, null=True, default=None)
    reviewed_by = models.CharField(max_length=60, null=True, default=None)
    reviewed_date = models.CharField(max_length=25, null=True, default=None)
    approved_by = models.CharField(max_length=60, null=True, default=None)
    approved_date = models.CharField(max_length=25, null=True, default=None)
    cancel_by = models.CharField(max_length=60, null=True, default=None)
    cancel_date = models.CharField(max_length=25, null=True, default=None)
    remarks = models.CharField(max_length=100, null=True, default=None)
    
    class Meta:
        db_table = 'tbl_gl_crb_list'        

class GLCDBList(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    transacting_party_id = models.IntegerField(null=True, default=None)
    transacting_party = models.CharField(max_length=100, default='')
    doc_type = models.CharField(max_length=15, default='')
    doc_no = models.BigIntegerField(default=0)
    date_trans = models.DateTimeField(null=True, default=None)
    trans_type = models.CharField(max_length=150, default='')
    check_date = models.DateField(null=True, default=None)
    check_drawee_bank = models.CharField(max_length=100, null=True, default=None)
    check_type = models.CharField(max_length=1, default='')
    check_amount = models.DecimalField(max_digits=21, decimal_places=3, default=0.000)
    check_payee = models.CharField(max_length=50, default='')
    transaction_status = models.CharField(max_length=1, default='')
    sys_type = models.CharField(max_length=5, default='')
    prepared_by = models.CharField(max_length=60, null=True, default=None)
    prepared_date = models.CharField(max_length=25, null=True, default=None)
    reviewed_by = models.CharField(max_length=60, null=True, default=None)
    reviewed_date = models.CharField(max_length=25, null=True, default=None)
    approved_by = models.CharField(max_length=60, null=True, default=None)
    approved_date = models.CharField(max_length=25, null=True, default=None)
    cancel_by = models.CharField(max_length=60, null=True, default=None)
    cancel_date = models.CharField(max_length=25, null=True, default=None)
    remarks = models.CharField(max_length=100, null=True, default=None)
    
    class Meta:
        db_table = 'tbl_gl_cdb_list'

class GLGJList(models.Model):
    id = models.AutoField(primary_key=True)
    ul_id = models.IntegerField(null=True, default=None)
    transacting_party_id = models.IntegerField(null=True, default=None)
    transacting_party = models.CharField(max_length=100, default='')
    doc_type = models.CharField(max_length=15, default='')
    doc_no = models.BigIntegerField(default=0)
    date_trans = models.DateTimeField(null=True, default=None)
    trans_type = models.CharField(max_length=150, default='')
    transaction_status = models.CharField(max_length=1, default='')
    sys_type = models.CharField(max_length=5, default='')
    prepared_by = models.CharField(max_length=60, null=True, default=None)
    prepared_date = models.CharField(max_length=25, null=True, default=None)
    reviewed_by = models.CharField(max_length=60, null=True, default=None)
    reviewed_date = models.CharField(max_length=25, null=True, default=None)
    approved_by = models.CharField(max_length=60, null=True, default=None)
    approved_date = models.CharField(max_length=25, null=True, default=None)
    cancel_by = models.CharField(max_length=60, null=True, default=None)
    cancel_date = models.CharField(max_length=25, null=True, default=None)
    remarks = models.CharField(max_length=100, null=True, default=None)
    
    class Meta:
        db_table = 'tbl_gl_gj_list'
        
        
class MainRefNumberGenerator(models.Model):
    id = models.AutoField(primary_key=True)
    module = models.CharField(max_length=15, default=' ')
    next_no = models.DecimalField(max_digits=12, decimal_places=0, default=0)
    ul_id = models.PositiveSmallIntegerField(default=0)
    doc_type = models.CharField(max_length=10, default='')
    sys_type = models.CharField(max_length=4, default='')

    class Meta:
        db_table = 'tbl_main_ref_number_generator'
    def __str__(self):
        return f"ID: {self.id}, Module: {self.module}, Next No: {self.next_no}, UL ID: {self.ul_id}, Doc Type: {self.doc_type}, Sys Type: {self.sys_type}"
