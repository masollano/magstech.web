import React, {useEffect, useState} from "react";
import { Routes, Route, useNavigate, Link, useAsyncError } from "react-router-dom";
import CashReceipt from "../TaskPane/cashReceipt";
import CashDisbursement from "../TaskPane/cashDisbursement";
import SalesAcctReceivables from "../TaskPane/salesAcctReceivables";
import PurchasesPayables from "../TaskPane/purchasesPayables";
import GeneralJournal from "../TaskPane/generaljournal";
import TransactionListing from "../TaskPane/transactionListing";
import Reports from "../TaskPane/reports";
import TLcashReceipt from '../TaskPane/tl-cashReceipt';
import TLcashDisbursement from '../TaskPane/tl-cashDisbursement';
import TLaccountReceivables from '../TaskPane/tl-accountReceivables';
import TLaccountPayables from '../TaskPane/tl-accountPayables';
import TLgeneralJournal from '../TaskPane/tl-generalJournal';
import TLpostTransaction from '../TaskPane/tl-postTransaction';
import ChartofAccounts from '../Reference/ChartofAccounts';
import CustomerDetails from '../Reference/CustomerDetails';
import BankDetails from "../Reference/BankDetails";
import DocumentTypeSetupDetails from "../Reference/DocumentTypeSetupDetails";
import SupplierDetails from "../Reference/SupplierDetails";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt,faSave,faUsers, faUserGear, faCircleUser, faLongArrowAltLeft, faPowerOff, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { getCurrentMonthDates } from "../TaskPane/JS/globalFunctions";
import UnitLocation from "../Reference/UnitLocation";
import { connect } from 'react-redux';
import axios from "axios";
import Swal from "sweetalert2";
import './index.css';
import './HeaderdropDown.css'
import { logout } from "../../actions/auth";
// import Headerbar from "./Headerbar";

const Sidebar = ({ logout, isAuthenticated }) => {
    const navigate = useNavigate()
    const [show,setShow] =  useState(false)
    const [active,setActive] =  useState("")
    const [currDate,setcurrDate] = useState('')

    

// -----------------------------FILE DROPDOWN-----------------------
//#region 
    const [ARsummaryVisible, setARsummaryVisible] = useState(false);
    const [cuztomizedVisible, setCuztomizedVisible] = useState(false);
    const [billingStatementVisible, setBillingStatementVisible] = useState(false);
  
    const handleCuztomizedClick = () => {
      setCuztomizedVisible(!cuztomizedVisible);
      setARsummaryVisible(false);
      setBillingStatementVisible(false);
    };
  
    const handleARSummaryClick = () => {
      setARsummaryVisible(!ARsummaryVisible);
    //   setCuztomizedVisible(false);
      setBillingStatementVisible(false);
    };

      const handleBillingStatementClick =  async () => {
      setBillingStatementVisible(!billingStatementVisible);
    //   setCuztomizedVisible(false);
      setARsummaryVisible(false);
    };
  //#endregion
   
  
  
// -----------------------------REFERENCE DROPDOWN-----------------------
//#region 
    const [subsidiaryVisible, setSubsidiaryVisible] = useState(false);
    const handleSubsidiaryClick = () => {
      setSubsidiaryVisible(!subsidiaryVisible);
      setslcategoriesyVisible(false);
      setRefNumberSetupVisible(false);
      setBankVisible(false);
    };

    const [slcategoriesVisible, setslcategoriesyVisible] = useState(false);
    const handleSlcategoriesClick = () => {
        setslcategoriesyVisible(!slcategoriesVisible);
        setSubsidiaryVisible(false);
        setRefNumberSetupVisible(false);
        setBankVisible(false);
    };

    const [RefNumberSetupVisible, setRefNumberSetupVisible] = useState(false);
    const handleRefNumberSetupClick = () => {
        setRefNumberSetupVisible(!RefNumberSetupVisible);
        setSubsidiaryVisible(false);
        setslcategoriesyVisible(false);
        setBankVisible(false);
    };

    const [BankVisible, setBankVisible] = useState(false);
    const handleBankClick = () => {
        setBankVisible(!BankVisible);
        setSubsidiaryVisible(false);
        setslcategoriesyVisible(false);
        setRefNumberSetupVisible(false);
    };

//#endregion


// -----------------------------ADMINITRASTION DROPDOWN-----------------------

//#region 
const [SystemConfigVisible, setSystemConfigVisible] = useState(false);
const handleSystemConfigClick = () => {
    setSystemConfigVisible(!SystemConfigVisible);
    setUnpostRepostVisible(false);
    setDeleteClearVisible(false);
    setUploadinDatarVisible(false);
};

// -----------------------------ADMINITRASTION  System config DROPDOWN-----------------------


const [TransactionTypeVisible, setTransactionTypeVisible] = useState(false);
const handleTransactionTypeClick = () => {
    setTransactionTypeVisible(!TransactionTypeVisible);
};
const [withHeldTaxVisible, setwithHeldTaxVisible] = useState(false);
const handlewithHeldTaxClick = () => {
    setwithHeldTaxVisible(!withHeldTaxVisible);
};

const [UnpostRepostVisible, setUnpostRepostVisible] = useState(false);
const handleUnpostRepostClick = () => {
    setUnpostRepostVisible(!UnpostRepostVisible);
    setSystemConfigVisible(false);
    setDeleteClearVisible(false);
    setUploadinDatarVisible(false);
};

const [DeleteCleartVisible, setDeleteClearVisible] = useState(false);
const handleDeleteClearClick = () => {
    setDeleteClearVisible(!DeleteCleartVisible);
    setUnpostRepostVisible(false);
    setSystemConfigVisible(false);
    setUploadinDatarVisible(false);
};

const [UploadinDataVisible, setUploadinDatarVisible] = useState(false);
const handleUploadinDataClick = () => {
    setUploadinDatarVisible(!UploadinDataVisible);
    setDeleteClearVisible(false);
    setUnpostRepostVisible(false);
    setSystemConfigVisible(false);

};


const [UtilityVisible, setUtilityVisible] = useState(false);
const handleUtilityClick = () => {
    setUtilityVisible(!UtilityVisible);
 

};
//#endregion


    const handleClick = (event) => {
        setActive(event.target.id);
      };

      // MESSAGE PROMPT
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })


      const handleLogout = () => {
        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want logout?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                logout(); 
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                localStorage.removeItem('setLogin');
                localStorage.removeItem('csrfToken');
                navigate('/');
                window.location.reload();
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
    
            }
          })
      };

        

    // const logoutClick = async () => {

    //     swalWithBootstrapButtons.fire({
    //         title: 'Confirmation',
    //         text: "Do you want logout?",
    //         icon: 'question',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes',
    //         cancelButtonText: 'No',
    //         reverseButtons: true
    //       }).then((result) => {
    //         if (result.isConfirmed) {
           
    //             try {
    //                 const instance = axios.create({
    //                     xsrfHeaderName: 'X-CSRFToken',     
    //                     xsrfCookieName: 'csrftoken',    
    //                 });
    //                     const headers = {
    //                         'X-CSRFToken':  localStorage.csrfToken
    //                     };

    //                     instance.post('http://localhost:8000/api/logout', {}, {
    //                     withCredentials: true,  // Send cookies along with the request
    //                     headers: headers  // Include the CSRF token in the headers
    //                 })
                
    //                 .then(() => {
    //                     localStorage.removeItem('username');
    //                     localStorage.removeItem('token');
    //                     localStorage.removeItem('setLogin');
    //                     localStorage.removeItem('csrfToken');
    //                     navigate('/');
    //                     window.location.reload();
    //                 })

    //             } catch (error) {
    //                  console.error('Error during logout:', error);
    //             }
    //         } else if (
    //           result.dismiss === Swal.DismissReason.cancel
    //         ) {

    //         }
    //       })

    //   };

    //FOR DISPLAYING DATE
    const curDate = getCurrentMonthDates();
      

    return <main className={show ? 'space-toggle' : null}>
            <Content /> 
            <header className={`header ${show ? 'space-toggle' : null}`}>
                <div className="header-toggle" >
                    <i className="fas fa-bars" onClick={() => setShow(!show)}></i>
                    {/* <span className="ref-name" >Reference</span>    */}
                    <>
                    <div class="btn">
              <div class="dropdown">
                <button class="dropbtn">File <i class="fas fa-caret-down"></i></button>
                <div class="dropdown-content">

                    <div class="nested11-dropdown">
                      <Link href="#" id="cuztomizedid" onClick={handleCuztomizedClick} class="link-with-icon" >Customized Reports<i class="fas fa-caret-down"></i></Link>
                      
                                <div class="nested11-dropdown-content" id="cuztomizedidContent" style={{ display: cuztomizedVisible ? 'block' : 'none' }}>
                                 
                                  <div class="nested12-dropdown" >
                                    <Link href="#" onClick={handleBillingStatementClick} id="billingstatementid"  className="link-with-icon" style={{width: '95%'}}>Billing Statement<i class="fas fa-caret-down"></i></Link>
                                  
                                    <div class="nested12-dropdown-content" id="billingstatementidcontent" style={{ display: billingStatementVisible ? 'block' : 'none' }}>
                                      <Link href="#">Posted Transactions</Link>
                                      <Link href="#">Un-Posted Transactions</Link>
                                    </div>
                                  </div>
              
                                  <div class="nested13-dropdown" >
                                    <Link href="#" id="ARsummaryid"  onClick={handleARSummaryClick} class="link-with-icon" style={{width: '95%'}}>AR Summary<i class="fas fa-caret-down"></i></Link>
                                    <div class="nested13-dropdown-content" id="ARsummaryidContent" style={{ display: ARsummaryVisible ? 'block' : 'none' }}>
                                      <Link href="#">Posted Transactions</Link>
                                      <Link href="#">Un-Posted Transactions</Link>
                                 
                                    </div>
                                  </div>
            
                                  <Link href="#">Payment Details Reports</Link>
                                  <Link  href="#">Collection Reports</Link>
                                  <Link  href="#">Customer (Source Data)</Link>
                                  <Link href="#">Open Account Billing</Link>
                                  <Link  href="#">Check Acknowledgment Logbook</Link>
                                  <Link href="#">Payable - RR/DR/SI Reports</Link>
                                  <Link  href="#">Input Tax Reports</Link>
                                  <Link  href="#">Document Posting Status</Link>
                                  <Link  href="#">Cancel Document Status</Link>
                                  <Link href="#">Cuztomized Aging Analysis Report</Link>
                                  <Link href="#">Payables</Link>
                                  <Link  href="#">Receivables</Link>
                                 </div>
                   </div>
                    <Link href="#">Change Unit Location</Link>
                    <Link href="#">Log as Different User</Link>
                    <Link href="#">Exit Program</Link>
                </div>
            </div>
            <div class="dropdown">
              <button class="dropbtn">Reference <i class="fas fa-caret-down"></i></button>
              <div class="dropdown-content">
                  <Link  to="/chartofaccounts" target="_blank">Chart of Accounts</Link>
                  <div class="nested-dropdown">
                    <Link href="#" id="Subsidiaryid"  onClick={handleSubsidiaryClick} class="link-with-icon" >Subsidiary Ledger Accounts <i class="fas fa-caret-down"></i></Link>
                    
                              <div class="nested-dropdown-content" id="Subsidiaryidcontent" style={{ display: subsidiaryVisible ? 'block' : 'none' }}>
                                <Link to="/CustomerDetails" onClick={handleClick}  target="_blank">Customer Details</Link>
                                <Link to="/Supplier-Details" target="_blank">Supplier Details</Link> 
                                <Link href="{% url 'EmployeeDetails' %}">Employee Details</Link>
                                <Link href="{% url 'PropertyEquipDetails' %}">Property & Equipment Details</Link>
                                <Link href="{% url 'AffiliatesDetails' %}">Affiliate Details</Link>
                                <Link href="{% url 'ActivityDetails' %}">Activity Details</Link>
                                <Link href="#">Responsibility Center Details</Link>
                                <Link href="#">Other Account Details</Link>
                                <Link href="{% url 'MemberDetails' %}" >Member/Owner Details</Link>
                                <Link href="{% url 'PayeeDetails' %}">Payee Details</Link>
                                <Link href="{% url 'PayorDetails' %}" id="Payor">Payor Details</Link>
                                <Link to="/Bank-Details">Bank Details</Link>
                            </div>
                 </div>

                  <div class="nested1-dropdown">
                    <Link href="#" id="slCategoriesid" onClick={handleSlcategoriesClick}class="link-with-icon">SL Categories<i class="fas fa-caret-down"></i></Link>
                    
                           <div class="nested1-dropdown-content" id="slCategoriesidContent" style={{ display: slcategoriesVisible ? 'block' : 'none' }}>
                                <Link href="#">Customers</Link>
                                <Link href="#">Suppliers</Link>
                                <Link href="#">Employees</Link>
                                <Link href="#">Affiliate</Link>
                                <Link href="#">Cost Center Categories</Link>
                                <Link href="#">Revenue Center Categories</Link>
                                <Link href="#">Member</Link>
                            </div>
                     
                 </div>

                 <div class="nested2-dropdown">
                  <Link href="#" id="referenceNumberid" onClick={handleRefNumberSetupClick} class="link-with-icon">Reference Number Setup<i class="fas fa-caret-down"></i></Link>
                  
                            <div class="nested2-dropdown-content" id="referenceNumberidcontent" style={{ display: RefNumberSetupVisible ? 'block' : 'none' }}>
                              <Link href="#" id="Source" data-source-id="source">Source Document Reference Series</Link>
                              <Link href="#" id="account" data-source-id="account">SL Account Series</Link>
                              <Link href="#" id="bank" data-source-id="bank">Bank and Credit Card Reference</Link>
                              <Link href="#" id="other" data-source-id="other">Other Reference Series</Link>
                          </div>
                   
               </div>
                  <Link to="/UnitLocation" target="_blank">Unit Location</Link> 
                  <Link href="{% url 'DepartmentDetails' %}">Department</Link> 
                <div class="nested3-dropdown" >


                  <Link href="#" id="bankDetailsid"  onClick={handleBankClick } class="link-with-icon">Bank Details<i class="fas fa-caret-down"></i></Link>
                  
                  <div class="nested3-dropdown-content" id="bankDetailsidcontent" style={{ display: BankVisible ? 'block' : 'none' }}>
                    <Link href="{% url 'BankDetails' %}">Drawee bank</Link> 
                    <Link href="#">Type of Card</Link>
                    <Link href="#">Bank Company</Link>
                </div>
         
              </div>
                  <Link to = "/Document-Type-Setup-Details">Document Type Setup</Link> 
                  <Link href="{% url 'DocumentTypeList' %}">Document Account Title Setup</Link> 
                  <Link href="{% url 'BookOfAccountsHeader' %}">Books of Accounts Header Setup</Link> 
                  <Link href="{% url 'CustomerGroupDetails' %}">Customer Group Details</Link>
                  <Link href="#">Customer Area Details</Link>
                  <Link href="#">Customer KOB Details</Link>
                  <Link href="#">Supplier Group Details</Link>
              </div>
            </div>

            <div class="dropdown">
                <button class="dropbtn">Adminitration <i class="fas fa-caret-down"></i></button>
                <div class="dropdown-content">
                    <Link href="{% url 'UserDeatials' %}">User Account Control</Link> 
                    <div class="nested4-dropdown" >
                    <Link href="#" id="systemconfigid" onClick={handleSystemConfigClick} class="link-with-icon" >System Configuration<i class="fas fa-caret-down"></i></Link>
                    <div class="nested4-dropdown-content" id="systemconfigidcontent" style={{display: SystemConfigVisible ? 'block' : 'none'}}>
                        <Link href="#">Source Document Set Up </Link>
                        <Link href="#">Special Journal Column Set Up</Link>
                        <Link href="#">Receivables/Payables Analyses Set Up</Link>
                        <Link href="#">Transaction Responsibility Assignment </Link>
                        <Link href="#">Financial Statement Set Up</Link>

                
                        <div class="nested5-dropdown" >
                        <Link href="#" id="transtypesetupid" onClick={handleTransactionTypeClick} class="link-with-icon" style={{width: '95%'}}>Transaction Type Setup<i class="fas fa-caret-down"></i></Link>
                        <div class="nested5-dropdown-content" id="transtypesetupidcontent" style={{display : TransactionTypeVisible ? 'block' : 'none'}}>
                            <Link href="#">Cash Transactions (CRB/CDB/GJ)</Link>
                            <Link href="#">Other Transactions (GJ)</Link>
                    
                        </div>
                        </div>

                        <Link href="#">Multiple Adjustment Set Up </Link>
                        <div class="nested6-dropdown" >
                        <Link href="#" id="Withheldtaxid"  onClick={handlewithHeldTaxClick}  class="link-with-icon">Withheld Tax Set Up<i class="fas fa-caret-down"></i></Link>
                        
                        <div class="nested6-dropdown-content" id="Withheldtaxidcontent" style={{display : withHeldTaxVisible ? 'block' : 'none'}}>
                            <Link href="#">ATC Setup</Link>
                            <Link href="#">Account Title Tagging</Link>
                            <Link href="#">Transaction Type with WTax</Link>
                    
                        </div>
                    </div>
                    
                        <Link href="#">Revenue Tagging</Link>
                    </div>
                </div>
                    <div class="nested7-dropdown" >
                    <Link href="#" id="unpostid" onClick={handleUnpostRepostClick} class="link-with-icon">Un-Post/Repost Transaction<i class="fas fa-caret-down"></i></Link>
                    <div class="nested7-dropdown-content" id="unpostidcontent" style={{ display : UnpostRepostVisible ? 'block' : 'none'}}>
                        <Link href="#">By Date Transaction</Link>
                        <Link href="#">By Reference No</Link>
                    </div>
                </div>

                    <Link href="#">Clear Login Errors</Link>
                    <Link href="#">Closing Routine</Link>
                    <Link href="#">Compony Setup</Link>
                    <Link href="#">Report Activation</Link>
                    <div class="nested8-dropdown" >
                    <Link href="#" id="deleteClearid" onClick={handleDeleteClearClick} class="link-with-icon">Delete/Clear Records & Tables<i class="fas fa-caret-down"></i></Link>

                    <div class="nested8-dropdown-content" id="deleteClearidcontent" style={{display: DeleteCleartVisible ? 'block': 'none'}}>
                        <Link href="#">Delete Transaction</Link>
                        <Link href="#">Clear Table</Link>
                    </div>
                </div>



                    <div class="nested9-dropdown" >
                    <Link href="#" id="uploadingID" onClick={handleUploadinDataClick} class="link-with-icon">Uploading Data<i class="fas fa-caret-down"></i></Link>
                    <div class="nested9-dropdown-content" id="uploadingIDCOntent" style={{display: UploadinDataVisible ? 'block':'none'}}>
                        <Link href="#">Accounting Module</Link>
                        <Link href="#">SL Module</Link>
                        <Link href="#">Update SL Module</Link>
                    </div>
                </div>

                    <Link href="#">Change Default Printer</Link>

                </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn">Utility <i class="fas fa-caret-down"></i></button>
                <div class="dropdown-content">
                    <Link href="#">User Account Control</Link>
                    <Link href="#">System Configuration</Link>
                </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn">Help <i class="fas fa-caret-down"></i></button>
                <div class="dropdown-content">
                    <Link href="#">System Help</Link>
                    <Link href="#">Calculator</Link>
                    <Link href="#">Calendar/Diary</Link>
                    <div class="nested10-dropdown" >
                    <Link href="#" id="utilityid" onClick={handleUtilityClick} class="link-with-icon">Utility<i class="fas fa-caret-down"></i></Link>
                    
                    <div class="nested10-dropdown-content" id="utilityidContent" style={{display: UtilityVisible ? 'block' : 'none'}}>
                        <Link href="#">Update Student ID</Link>
                        <Link href="#">Other Account</Link>
                        <Link href="#">JV Adjustment - UTILITY</Link>
                        <Link href="#">CV Transtype - UTILITY </Link>
                        <Link href="#">POR Transtype - UTILITY</Link>
                        <Link href="#">Fix General Ledger - Reference No.</Link>
                        <Link href="#">Update NS from Transaction Listing Table</Link>
                        <Link href="#">Update All ID Code</Link>
                        <Link href="#">Update PPE Image Status</Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
                    </>

                </div>
            </header> 
             
            <aside className={`sidebar ${show ? 'show' : null}`}>
                    <div className="nav-main-header">
                        <img 
                            alt="lead-logo"
                            width="35px"
                            height="35px"
                            src= {`../../assets/lead-logo.png`}
                            style={{ cursor: "pointer", borderRadius:"50%"}}
                        />
                        <span className={`nav-main-header-name ${show ? 'show' : null}`}>Lead Solutions, Inc.</span>   
                    </div>
                <nav className="nav">
                    <div>
                        <span className={`nav-header-name ${show ? 'show' : null}`}>TASK PANE</span>
                        <div className="nav-list" >
                            <Link  className={active === "1" ? "nav-link active" : "nav-link"} to="/TaskPane/cashReceipt" key={1} id={"1"} onClick={handleClick} >
                                <i className="fas fa-file-invoice-dollar nav-link-icon" key={1} id={"1"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={1} id={"1"} onClick={handleClick}>Cash Receipt</span>    
                            </Link>  
                            <Link className={active === "2" ? "nav-link active" : "nav-link"} to="/TaskPane/cashDisbursement" key={2} id={"2"} onClick={handleClick}> 
                                <i class="fas fa-sack-dollar nav-link-icon" key={2} id={"2"} onClick={handleClick} ></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={2} id={"2"} onClick={handleClick}  >Cash Disbursement</span>    
                            </Link>
                            <Link className={active === "3" ? "nav-link active" : "nav-link"} to="/TaskPane/salesAcctReceivables" key={3} id={"3"} onClick={handleClick}>
                                <i className="fas fa-coins nav-link-icon" key={3} id={"3"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={3} id={"3"} onClick={handleClick}>Sales & Accts Receivables</span>    
                            </Link>
                            <Link className={active === "4" ? "nav-link active" : "nav-link"} to="/TaskPane/purchasesPayables" key={4} id={"4"} onClick={handleClick}>
                                <i className="fas fa-shopping-cart nav-link-icon" key={4} id={"4"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={4} id={"4"} onClick={handleClick}>Purchases & Payables</span>    
                            </Link>  
                            <Link className={active === "5" ? "nav-link active" : "nav-link"} to="/TaskPane/generalJournal" key={5} id={"5"} onClick={handleClick}>
                                <i className="fas fa-book nav-link-icon" key={5} id={"5"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={5} id={"5"} onClick={handleClick}>General Journal</span>    
                            </Link> 
                            <Link className={active === "6" ? "nav-link active" : "nav-link"} to="/TaskPane/transactionListing" key={6} id={"6"} onClick={handleClick}>
                                <i className="fas fa-list-alt nav-link-icon" key={6} id={"6"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={6} id={"6"} onClick={handleClick}>Transaction Listing</span>    
                                {/* <i className="fas fa-chevron-right "></i> */}
                            </Link> 
                                <ul className="sub-menu open">
                                    {/* <li><a className="sub-link-name open" href="#">Transaction Listing</a></li> */}
                                    <li><a href="/TaskPane/tl-cashReceipt">Cash Receipts</a></li>
                                    <li><a href="/TaskPane/tl-cashDisbursement">Cash Disbursement</a></li>
                                    <li><a href="/TaskPane/tl-accountReceivables">Accounts Receivables</a></li>
                                    <li><a href="/TaskPane/tl-accountPayables">Accounts Payables</a></li>
                                    <li><a href="/TaskPane/tl-generalJournal">General Journal</a></li>
                                    <li><a href="/TaskPane/tl-postTransaction">Post Transaction</a></li>
                                </ul>
                            <Link className={active === "7" ? "nav-link active" : "nav-link"} to="/TaskPane/reports" key={7} id={"7"} onClick={handleClick}>
                                <i class="fas fa-file-signature nav-link-icon" key={7} id={"7"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={7} id={"7"} onClick={handleClick}>Reports</span>    
                            </Link> 
                            {/* <Link className={active === "8" ? "nav-link active" : "nav-link"} to="/chartofaccounts" key={8} id={"8"} onClick={handleClick}>
                                <i className="fas fa-book nav-link-icon" key={8} id={"8"} onClick={handleClick}></i>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={8} id={"8"} onClick={handleClick}>Chart of Accounts</span>    
                            </Link>  */}
                            <Link className={active === "9" ? "nav-link active" : "nav-link"}  key={9} id={"9"} onClick={() => handleLogout()}>
                                <FontAwesomeIcon icon={faPowerOff} className="fas fa-book nav-link-icon" key={9} id={"9"} onClick={() => handleLogout()}></FontAwesomeIcon>
                                <span className={`nav-link-name ${show ? 'show' : null}`} key={9} id={"9"} onClick={() => handleLogout()}>Logout</span>    
                            </Link>   
                        </div>
                        
                        <br/><br/>
                        <span className={`nav-header-name ${show ? 'show' : null}`}>USER LOGIN</span> <br /><br />
                        <div className={`nav-details ${show ? null : 'show'}`}>
                            <div className="nav-col-user-details">
                                <i class="fas fa-user nav-user-icon"></i>
                                <span className="nav-user-details">{localStorage.username}</span>
                            </div>
                            <div className="nav-col-user-details">
                                <i class="fas fa-map-marker-alt nav-user-icon"></i>
                                <span className="nav-user-details"> {localStorage.uldesc}</span>
                            </div>
                            <div className="nav-col-user-details">
                                <i class="fas fa-calendar-alt nav-user-icon"></i>
                                <span className="nav-user-details">{localStorage.currentDate}</span>
                            </div>
                        </div>
                        
                        <br/>
                        {/* <div>
                            <Link to="/Logout" className="nav-logo">
                                <i className="fas fa-sign-out-alt nav-logo-icon"></i>
                                    <span className="nav-logo-name">Logout</span>    
                            </Link>     
                        </div> */}
                    </div>       
                </nav>    
            </aside>
             
        </main>
        
};

function Content() {
    return <div>
        <Routes>

            <Route path="/TaskPane/cashReceipt" element={<CashReceipt />}></Route>
            <Route path="/TaskPane/cashDisbursement" element={<CashDisbursement />}></Route>
            <Route path="/TaskPane/salesAcctReceivables" element={<SalesAcctReceivables />}></Route>
            <Route path="/TaskPane/purchasesPayables" element={<PurchasesPayables />}></Route>
            <Route path="/TaskPane/generalJournal" element={<GeneralJournal />}></Route>
            <Route path="/TaskPane/transactionListing" element={<TransactionListing />}></Route>
            <Route path="/TaskPane/reports" element={<Reports />}></Route>
            <Route path="/TaskPane/tl-cashReceipt" element={<TLcashReceipt />}></Route>
            <Route path="/TaskPane/tl-cashDisbursement" element={<TLcashDisbursement />}></Route>
            <Route path="/TaskPane/tl-accountReceivables" element={<TLaccountReceivables />}></Route>
            <Route path="/TaskPane/tl-accountPayables" element={<TLaccountPayables />}></Route>
            <Route path="/TaskPane/tl-generalJournal" element={<TLgeneralJournal />}></Route>
            <Route path="/TaskPane/tl-postTransaction" element={<TLpostTransaction />}></Route>
            <Route path="/chartofaccounts" element={<ChartofAccounts />}></Route>
            <Route path="/CustomerDetails" element={<CustomerDetails />}></Route>
            <Route path="/UnitLocation" element={<UnitLocation />}></Route>
            <Route path="/Bank-Details" element={<BankDetails />}></Route>
            <Route path="/Document-Type-Setup-Details" element={<DocumentTypeSetupDetails />}></Route>
            <Route path="/Supplier-Details" element={<SupplierDetails />}></Route>
        </Routes> 
    </div>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout }) (Sidebar);

// export default Sidebar;