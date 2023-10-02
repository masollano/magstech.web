import React from 'react';
import {useState, Fragment, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './CSS/newIndex.css';
import ModalAddNew from './Modals/modalDisbursement';
import FilterByDateRange from './Modals/modalFilter';
import ApplicationOfPayment from './Modals/modalAppPayment';
import { fetchDataFromPHPAPI, convertToStrDates, getCurrentMonthDates, getDocType, getDocNo, searchData, getAcctTitleBasedOnDraweeBank, getAccCode, getSLAccount} from './JS/globalFunctions';
import axios from 'axios';
import Swal from 'sweetalert2'


const CashDisbursement = () => {
    //BASE URL
    const BASE_URL = 'http://localhost:8000'; 
    const TRANSHISTORY_ENDPOINT = 'app/CVListView/';

    //FOR MODAL
    const [openModal,setOpenModal] = useState(false);
    const [openFilter,setOpenFilter] = useState(false);
    const [openAppPayment,setopenAppPayment] = useState(false);
    const [doneAP,setDoneAP] = useState(false);

    const Swal = require('sweetalert2')

    //FOR DISPLAYING OF DATA
    const [data, setData] = useState([]);
    const [docTypedata, setDocTypedata] = useState([]);
    const [docNodata, setDocNodata] = useState([]);

    //FOR DISABLED TEXT INPUT
    const [isInputDisabled, setIsInputDisabled] = useState(true);
    const [checkDisabled, setCheckDisabled] = useState(true);
    const [docnoDisabled, setDocnoDisabled] = useState(true);
    const [newModeDisabled, setNewModeDisabled] = useState(false);
    const [viewModeDisabled, setViewModeDisabled] = useState(true);

    //FOR SEARCH
    const [searchResults, setSearchResults] = useState([]);
    const [draweeResults, setDraweeResults] = useState([]);
    const [accountTitleResults, setAccountTitleResults] = useState([]);
    const [slNameResults, setSlNameResults] = useState([]);
    const [transTypeValue, setTransTypeValue] = useState('');

    //FOR CHECK AMMOUNT ENTRY
    const [tableData, setTableData] = useState([]);
    const [checkAmtValue, setcheckAmtValue] = useState(0);
    const [totalDebitValue, setTotalDebitValue] = useState(0);
    const [totalCreditValue, settotalCreditValue] = useState(0);

    //FOR PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex,lastIndex);
    // const numpage = Math.ceil(data.length, recordsPerPage);
    const numpage = Math.round(data.length/ recordsPerPage);
    const number = [...Array(numpage +1).keys()].slice(1);

    //DECLARE GLOBAL VARIABLE FOR DATE
    let dateStart = '';
    let dateEnd = '';

    //DISPLAY DATE RANGE
    const [filterDateStart,setFilterDateStart] = useState('');
    const [filterDateEnd,setFilterDateEnd] = useState('');

    //FOR DISPLAYING DATE
    const currentDate = new Date();
    const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    dateStart = firstDate;
    dateEnd = lastDate;

    //GLOBAL FUNCTIONS DECLARATIONS
    const [acctTitleResult,setAcctTitleResult] = useState([]);
    const [acctCodeResult,setAcctCodeResult] = useState([]);
    const [slNameResult,setSlNameResult] = useState([]);

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [payeeValue, setPayeeValue] = useState('');
    const [draweeValue, setDraweeValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [accountCodeValueList, setAccountCodeValueList] = useState('');
    const [accountTitleValueList, setAccountTitleValueList] = useState('');
    const [slNameValueList, setSlNameValueList] = useState('');
    const [slTypeValue, setslTypeValue] = useState('');
    const [accountCodeValueListing, setAccountCodeValueListing] = useState('');
    const [accountTitleValueListing, setAccountTitleValueListing] = useState('');
    const [slTypeValueListing, setSLTypeValueListing] = useState('');
    const [slCodeValueListing, setSlCodeValueListing] = useState('');
    const [slNameValueListing, setSlNameValueListing] = useState('');
    const [slSubIDValueListing, setSlSubIDValueListing] = useState('');
    const [debitValue, setDebitValue] = useState(0);
    const [creditValue, setCreditValue] = useState(0);
    const [docSplitValue,setdocSplitValue] = useState('');
    const [docTypeValue,setDocTypeValue] = useState('');
    const [docNoEditValue,setdocNoEditValue] = useState('');
    const [docNoValue,setDocNoValue] = useState('');
    const [dateTransValue,setDateTransValue] = useState('');
    const [dueDateValue,setDueDateValue] = useState('');
    const [dateCheckValue,setDateCheckValue] = useState('');
    const [checkNoValue,setCheckNoValue] = useState('');
    const [checkTypeValue,setCheckTypeValue] = useState('C');
    const [remarksValue,setRemarksValue] = useState('');
    const [activeValue,setActiveValue] = useState('YS');
    const [prepByValue,setPrepByValue] = useState('');
    const [revByValue,setRevByValue] = useState('');
    const [appByValue,setAppByValue] = useState('');

    const [primCodeValue, setPrimCodeValue] = useState('');
    const [secCodeValue, setSecCodeValue] = useState('');
    const [accCodeValue, setAccCodeValue] = useState('');
    const [subCodeValue, setSubCodeValue] = useState('');

    const [payeeID, setPayeeID] = useState('');
    const [draweeID, setDraweeID] = useState('');

    const [payeeListVisible, setPayeeListVisible] = useState(true);
    const [draweeListVisible, setDraweeListVisible] = useState(true);
    const [acctTitleListVisible, setAcctTitleListVisible] = useState(true);
    const [slNameListVisible, setSLNameListVisible] = useState(true);
    const [rowEntryVisible, setrowEntryVisible] = useState(true);
    const [tabVisible, setTabVisible] = useState(true);

    const [EntryMode, setEntryMode] = useState(false);
    const [newMode, setNewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [newRow, setNewRow] = useState({ ul: '', accCode: '', acctTitle: '',slName:'',debit:0,credit:0 });

    //FOR REFERENCE
    const payeeListRef = useRef(null);
    const draweeListRef = useRef(null);
    const acctTitleListRef = useRef(null);
    const slNameListRef = useRef(null);
    const payeeRef = useRef(null);
    const draweeRef = useRef(null);
    const addressRef = useRef(null);
    const checkDateRef = useRef(null);
    const checkNoRef = useRef(null);
    const checkAmtRef = useRef(null);
    const docTypeRef = useRef(null);
    const docNoRef = useRef(null);
    const vDateRef = useRef(null);
    const remarksRef = useRef(null);
    const accountTitleRef = useRef(null);
    const accountCodeRef = useRef(null);
    const slNameRef = useRef(null);
    const debitRef = useRef(null);
    const creditRef = useRef(null);


         
    // ************************ ACTIVATE MODE ************************
    // ***************************************************************
    const handleMode = (mode) => {
        const curDate = getCurrentMonthDates();
        if (mode === 'view') {
            setNewMode(false);
            setEditMode(false);
            setTabVisible(true);
            setIsInputDisabled(true);
            setNewModeDisabled(false);
            setViewModeDisabled(true);
            setDocnoDisabled(true)
            setCheckDisabled(true);
            setDocTypeValue('');
            setDocNoValue('');
            setDateTransValue(curDate);
            setPayeeValue('');
            setPayeeID(0);
            setAddressValue('')
            setDateCheckValue(curDate);
            setCheckNoValue('');
            setcheckAmtValue(0);
            setDraweeValue('');
            setDraweeID(0);
            setRemarksValue('');
            setPrepByValue('');
            setRevByValue('');
            setAppByValue('');
            setRowData([]);
        } else  if (mode === 'new') {
            setNewMode(true);
            setEditMode(false);
            setTabVisible(false);
            setIsInputDisabled(false);
            setNewModeDisabled(true);
            setViewModeDisabled(false);
            setDocnoDisabled(true)
            setCheckDisabled(false);
            setDocTypeValue('');
            setDocNoValue('');
            setDateTransValue(curDate);
            setPayeeValue('');
            setPayeeID(0);
            setAddressValue('')
            setDateCheckValue(curDate);
            setCheckNoValue('');
            setcheckAmtValue(0);
            setDraweeValue('');
            setDraweeID(0);
            setRemarksValue('');
            setPrepByValue('');
            setRevByValue('');
            setAppByValue('');
            setRowData([]);
        } 
    }



     // ************************ REACT JS FUNCTIONS ************************
    // *********************************************************************

    const handleDisabledText = (e) => {
        // setdocSplitValue(e);
        const cons = e.includes('%');
        if (cons === true){
            const docsplit = e.split('%')
            setDocTypeValue(docsplit[0].toString())
            setdocNoEditValue(docsplit[1])
        }
        const str = e.includes('CV');
        // if (str === true ) {
        //     setCheckDisabled(false);
        // } else {
        //     setCheckDisabled(true);
        // }
      };


    const sumTotal = (type) => {
       const num1 = parseFloat(checkAmtValue);
        if (type === 'debit') {
            const num2 = parseFloat(totalDebitValue);
            const num = num1 + num2;
            setTotalDebitValue(num)
        } else if (type === 'credit') {
            const num2 = parseFloat(totalCreditValue);
            const num = num1 + num2;
            settotalCreditValue(num)
        }
    }

    const calculateSum = () => {
            const totalDebit = rowData.reduce((acc, item) => acc + parseFloat(item.debit), 0);
            const totalCredit = rowData.reduce((acc, item) => acc + parseFloat(item.credit), 0);
            setTotalDebitValue(totalDebit);
            settotalCreditValue(totalCredit);
      };



    const handleSearchInputChange = async (e, inputIdentifier) => {
            try {
                if (inputIdentifier === 'accountTitle') {
                    const endpoint = 'api/taskpane/searchAccountTitle';
                    const params = {str: e};
                    const result = await searchData(endpoint, params); 
                    
                    if (result) {
                        setAccountTitleResults(result);
                        setAcctTitleListVisible(true);
                    }
                } else {
                    const endpoint = 'api/taskpane/search'; 
                    const params = {str: e, SLType:slTypeValue, field:inputIdentifier};
                    const result = await searchData(endpoint, params);

                    if (result) {
                        if (inputIdentifier === 'payee') {
                            setSearchResults(result);
                            setPayeeListVisible(true);

                        } else if (inputIdentifier === 'drawee') {
                            setDraweeResults(result);
                            setDraweeListVisible(true);

                        } else if (inputIdentifier === 'slName') {
                            setSlNameResults(result);
                            setSLNameListVisible(true);
                        }
                    }
                }
            } catch (error) {
            console.error(error);
            }
        };

    

    //FETCH FILTERED DATA FROM PHP API
    const fetchDataByDateRange = (startDate, endDate) => {
        // const { date1, date2 } = convertToStrDates(startDate,endDate);
        setFilterDateStart(startDate);
        setFilterDateEnd(endDate);

        const fetchData = async () => {
            try {
              
              const response = await axios.get(`${BASE_URL}/${TRANSHISTORY_ENDPOINT}?startDate=${startDate}&endDate=${endDate}`); // API endpoint
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
      }



    //FETCH DATA FROM PHP API
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { date1, date2 } = convertToStrDates(dateStart,dateEnd);
            setFilterDateStart(date1);
            setFilterDateEnd(date2);
            setrowEntryVisible(false)

            // const response = await axios.get(`http://localhost:8080/react/api/api_load_data.php?startDate=${dateStart}&endDate=${dateEnd}`); // API endpoint
            const response = await axios.get(`${BASE_URL}/${TRANSHISTORY_ENDPOINT}?startDate=${dateStart}&endDate=${dateEnd}`);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        
      }, []);



    //DATA ENTRY
    const handleDataEntry = () => {
        const newRow = { ul: '1', accCode: accountCodeValueListing, acctTitle: accountTitleValueListing, slName: slNameValueListing, debit:debitValue, credit:creditValue };
        setRowData([...rowData, newRow]);
        // setRowData((prevData) => [...prevData, newRow]);
        setNewRow({ ul: '', accCode: '', acctTitle: '',slName:'',debit:0,credit:0 });

        setAccountCodeValueListing('');
        setAccountTitleValueListing('');
        setSlNameValueListing('');
        setDebitValue(0);
        setCreditValue(0);
    }


    //ADD ROW ENTRY
    const addRow = (deb, cre) => {
        const newRow = { ul: '1', accCode: accountCodeValueList, acctTitle: accountTitleValueList, slName: slNameValueList, debit:deb, credit:cre };
        setRowData([...rowData, newRow]);
      };
      


    //HANDLE DATA INPUTS FROM DATA ENTRY
    const handleDataInputs = (event) => {
        const { id, value } = event.target;
        setNewRow((prevRow) => ({ ...prevRow, [id]: value }));
        setcheckAmtValue(value);
      };

      
     

      

     //****************************GLOBAL FUNCTIONS***********************************
     //*******************************************************************************
     const fetchData = async (trans) => {
        if (trans === 'accttitle') {
            const result = await getAcctTitleBasedOnDraweeBank(draweeID);
            if (result) { setAcctTitleResult(result); }
        } else if (trans === 'acctcode') {
            const result = await getAccCode(accountTitleValueList);
            if (result) { setAcctCodeResult(result); }
        } else if (trans === 'slname') {
            const result = await getSLAccount(primCodeValue,secCodeValue,accCodeValue,subCodeValue);
            if (result) { setSlNameResult(result); }
        } else if (trans === 'doctype'){
            const response = await getDocType('CDB');
            if (response) { setDocTypedata(response); }
        } else if (trans === 'docno'){
            if (docTypeValue) {
                const response = await getDocNo(docTypeValue,'CDB');
                if (response) { setDocNodata(response); }
            }
        } 
      };

      


    //DISABLED DEFAULT KEY EVENTS
    class MyComponent extends React.Component {
        componentDidMount() {
            document.addEventListener('keydown', this.handleKeyDown);
          }
        
          componentWillUnmount() {
            document.removeEventListener('keydown', this.handleKeyDown);
          }
        
          handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key.startsWith('Arrow')) {
              event.preventDefault();
            }
          }
    }


    // ********************************* FOR  KEY EVENTS***************************************
    // ****************************************************************************************
    
    const handleKeys = (event, inputIdentifier) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            
            if (inputIdentifier === 'payee') {
                const listItems = payeeListRef.current.querySelectorAll('li');
                const currentIndex = Array.from(listItems).findIndex((item) => item === selectedItemIndex);
                let nextIndex;

                if (event.key === 'ArrowUp') {
                    nextIndex = currentIndex - 1;
                  } else if (event.key === 'ArrowDown') {
                    nextIndex = currentIndex + 1;
                  }
            
                  if (nextIndex >= 0 && nextIndex < listItems.length) {
                      setSelectedItemIndex(listItems[nextIndex]);
                  }
            } else  if (inputIdentifier === 'drawee') {
                const listItems = draweeListRef.current.querySelectorAll('li');
                const currentIndex = Array.from(listItems).findIndex((item) => item === selectedItemIndex);
                let nextIndex;

                if (event.key === 'ArrowUp') {
                    nextIndex = currentIndex - 1;
                  } else if (event.key === 'ArrowDown') {
                    nextIndex = currentIndex + 1;
                  }
            
                  if (nextIndex >= 0 && nextIndex < listItems.length) {
                      setSelectedItemIndex(listItems[nextIndex]);
                  }
            } else  if (inputIdentifier === 'accountTitle') {
                const listItems = acctTitleListRef.current.querySelectorAll('li');
                const currentIndex = Array.from(listItems).findIndex((item) => item === selectedItemIndex);
                let nextIndex;

                if (event.key === 'ArrowUp') {
                    nextIndex = currentIndex - 1;
                  } else if (event.key === 'ArrowDown') {
                    nextIndex = currentIndex + 1;
                  }
            
                  if (nextIndex >= 0 && nextIndex < listItems.length) {
                      setSelectedItemIndex(listItems[nextIndex]);
                  }
            } else  if (inputIdentifier === 'slName') {
                const listItems = slNameListRef.current.querySelectorAll('li');
                const currentIndex = Array.from(listItems).findIndex((item) => item === selectedItemIndex);
                let nextIndex;

                if (event.key === 'ArrowUp') {
                    nextIndex = currentIndex - 1;
                  } else if (event.key === 'ArrowDown') {
                    nextIndex = currentIndex + 1;
                  }
            
                  if (nextIndex >= 0 && nextIndex < listItems.length) {
                      setSelectedItemIndex(listItems[nextIndex]);
                  }
            }
            
          } else if (event.key === 'Enter') {
                event.preventDefault();
                if (inputIdentifier === 'payee') {
                    window.payeeID = payeeID;
                    setPayeeListVisible(false);
                    setopenAppPayment(true);
                    // if (isInputDisabled === false) {
                    //      checkDateRef.current.focus();
                    // } else {
                    //     checkAmtRef.current.focus();
                    // }
                } else if (inputIdentifier === 'drawee') {
                    setDraweeListVisible(false);
                    if (draweeID !== '' && draweeID !== 0){
                        if (checkAmtValue !== '' && checkAmtValue !== 0) {
                            fetchData('accttitle');
                                                       
                            sumTotal('credit');
                          }
                    }
                    remarksRef.current.focus();
                } else if (inputIdentifier === 'checkDate') {
                    checkNoRef.current.focus();
                } else if (inputIdentifier === 'checkNo') {
                    checkAmtRef.current.focus();
                } else if (inputIdentifier === 'checkAmt') {
                    if (isInputDisabled === true) { 
                        if (checkAmtValue !== '' && checkAmtValue !== 0) {
                            
                            const checkAmount = parseFloat(checkAmtValue)
                            setTableData([...tableData,checkAmount.toFixed(2)]);
                            sumTotal('credit');
                            // setcheckAmtValue(0);
                          }
                    }
                    draweeRef.current.focus();
                } else if (inputIdentifier === 'docType') {
                        if (docNoEditValue === 'N'){
                            setDocnoDisabled(true)
                            vDateRef.current.focus();
                        } else {
                            docNoRef.current.focus();
                            setDocnoDisabled(false)
                            
                        }
                        fetchData('docno')
                } else if (inputIdentifier === 'docNo') {
                    vDateRef.current.focus();
                } else if (inputIdentifier === 'vDate') {
                    payeeRef.current.focus();
                } else if (inputIdentifier === 'remarks') {
                    setrowEntryVisible(true)
                    setEntryMode(true)
                } else if (inputIdentifier === 'accountTitle') {
                    if (acctTitleListVisible === true) {
                        accountTitleRef.current.focus();
                        setAcctTitleListVisible(false)
                    } else {
                        slNameRef.current.focus();
                        handleDataInputs(event)
                    }
                } else if (inputIdentifier === 'slName') {
                    if (slNameListVisible === true) {
                        slNameRef.current.focus();
                        setSLNameListVisible(false)
                    } else {
                        debitRef.current.focus();
                        handleDataInputs(event)
                    }
                } else if (inputIdentifier === 'debit') {
                    creditRef.current.focus();
                } else if (inputIdentifier === 'credit') {
                    if (accountCodeValueListing !== '' && accountTitleValueListing !== '' && slNameValueListing !== '') {
                        handleDataEntry();
                        calculateSum();

                        swalWithBootstrapButtons.fire({
                            title: 'Confirmation',
                            text: "Do you want to add another entry?",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            reverseButtons: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setrowEntryVisible(true)
                              accountTitleRef.current.focus();
                            } else if (
                              /* Read more about handling dismissals below */
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                                setrowEntryVisible(false)
                            }
                          })
                    }
                }
          } else if (event.key === ' ') {
            fetchData('doctype')
          } else if (event.key === 'Escape') {
            if (newMode === true || editMode === true){
                if (EntryMode === true) {
                    if (acctTitleListVisible === true){
                        setAcctTitleListVisible(false)
                    } else if (slNameListVisible === true){
                        setSLNameListVisible(false)
                    } else {
                        swalWithBootstrapButtons.fire({
                            title: 'Confirmation',
                            text: "Do you want to abort this entry?",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            reverseButtons: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                                setEntryMode(false)
                                setrowEntryVisible(false)
                            } else if (
                              /* Read more about handling dismissals below */
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
    
                            }
                          })
                        
                    }
                } else if (draweeListVisible === true) {
                    setDraweeListVisible(false)
                } else if (payeeListVisible === true) {
                    setPayeeListVisible(false)
                } else {
                    swalWithBootstrapButtons.fire({
                        title: 'Confirmation',
                        text: "Do you want to abort this transaction?",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        reverseButtons: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                            handleMode('view');
                            setTabVisible(true);
                        } 
                      })
                    
                }
            }
            
          }
      };


      // MESSAGE PROMPT
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })




      // ***************************** SAVING DATA *************************************
      // *******************************************************************************
      const saveList = async (event) => {
        event.preventDefault();
        const ul = window.ulCode;
        const data = {ul, docTypeValue, docNoValue, dateTransValue, dueDateValue, payeeID, payeeValue, checkAmtValue, draweeValue, dateCheckValue, checkNoValue, checkTypeValue, remarksValue, activeValue, transTypeValue, prepByValue, revByValue, appByValue};

        await axios.post('http://localhost:8080/react/api/api_save_disbursement_list.php/', data)
        .then((response) => {
            console.log(response.data);
            swalWithBootstrapButtons.fire(
                'Saved!',
                'Record successfully saved.',
                'success'
              )
            // Handle success (e.g., show a success message to the user)
        })
        .catch((error) => {
            console.error(error);
            swalWithBootstrapButtons.fire(
                'Error!',
                'Encountered error while saving.',
                'error'
              )
            // Handle error (e.g., show an error message to the user)
        });
      }


    // ******************* USE EFFECTS ******************************
    // **************************************************************

     // SET FOCUS AFTER SELECTING OF TRANS TYPE
     useEffect(() => {
        if (transTypeValue) {
          docTypeRef.current.focus();
        }
      }, [transTypeValue]);


      // SET FOCUS AFTER APPLICATION OF PAYMENT
      useEffect(() => {
        if (doneAP === true) {
            if (isInputDisabled === false) {
                     checkDateRef.current.focus();
                } else {
                    checkAmtRef.current.focus();
                }
        }
      }, [doneAP]);


    //ASSIGN ACCOUNT TITLE
    useEffect(() => {
        const assignAcctTitle = () => {
            let str = '';
            {acctTitleResult.map((item) => (
                str = item.acct_title
              ))}
            setAccountTitleValueList(str);
        }
        assignAcctTitle();
        fetchData('acctcode');
      }, [acctTitleResult]);


      //ASSIGN ACCOUNT CODE
      useEffect(() => {
        const assignAcctCode = () => {
            let code = '', code1 = '', code2 = '', code3 ='', code4 ='';
            {acctCodeResult.map((item) => (
                code = item.code,
                code1 = item.primary_code,
                code2 = item.secondary_code,
                code3 = item.acct_code,
                code4 = item.subsidiary_code
              ))}
            setAccountCodeValueList(code);
            setPrimCodeValue(code1);
            setSecCodeValue(code2);
            setAccCodeValue(code3);
            setSubCodeValue(code4);
        }
        assignAcctCode();
      }, [acctCodeResult]);


      //ASSIGN SL NAME
      useEffect(() => {
        const assignSLName = () => {
            let str = '';
            {slNameResult.map((item) => (
                str = item.subsidiary_acct_title
              ))}
            setSlNameValueList(str);
        }
        assignSLName();
      }, [slNameResult]);


    //AUTO COMPUTE TOTAL
    useEffect(() => {
        if (rowData) {
          calculateSum();
        }
      }, [rowData]);


    //ARROW DOWN & UP TO NAVIGATE SELECTION
    useEffect(() => {
        if (selectedItemIndex) {
            selectedItemIndex.focus();
        }
      }, [selectedItemIndex]);

      useEffect(() => {
        fetchData('acctcode');
      }, [accountTitleValueList]);

      useEffect(() => {
        fetchData('slname');
      }, [accountCodeValueList]);

      useEffect(() => {
        addRow(0,checkAmtValue);
      }, [slNameValueList]);

      useEffect(() => {
        const assignDocNo = () => {
            let num = 0;
            {docNodata.map((item) => (num = parseInt(item.next_no)))}
            num +=1
            num = num.toString().padStart(4, '0');
            setDocNoValue(num);
        }
        assignDocNo();
      }, [docNodata]);

      useEffect(() => {
        const cons = docSplitValue.includes('%');
        if (cons === true){
            const docsplit = docSplitValue.split('%')
            setDocTypeValue(docsplit[0].toString())
            setdocNoEditValue(docsplit[1])
        }
      }, [docSplitValue]);









 // *********************************************************************************************************************
 // ******************************************** HTML AND JAVASCRIPT CODE ***********************************************
 // *********************************************************************************************************************

    return<section className="content">
    <Fragment>
    <div className="card-container">
        <div class="card card-main">
            {/* <div class="card-header"> */}
                {/* <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                        <li class="nav-item-tab">
                            <a class="nav-link-tab active" id="custom-tabs-one-history-tab" data-toggle="pill" href="#custom-tabs-one-history" role="tab" aria-controls="custom-tabs-one-history" aria-selected="true">List</a>
                        </li>
                        <li class="nav-item-tab">
                            <a class="nav-link-tab" id="custom-tabs-one-details-tab" data-toggle="pill" href="#custom-tabs-one-details" role="tab" aria-controls="custom-tabs-one-details" aria-selected="false">Details</a>
                        </li>
                    </ul> */}
            {/* </div> */}

            <div class="card-body">
                <Tabs>
                    <TabList>   
                    {tabVisible && (
                        <Tab id='1'>Transaction History</Tab>
                    )}
                        <Tab id='2'>Details</Tab>
                    </TabList>

                    {tabVisible && (
                    <TabPanel className="tab-trans-history" id='1'>
                        {/* <h2>Transaction History</h2> */}
                        {/* <div className='col-sm-4'>
                            <div className='form-group'>
                                <label for='serarch'>Search</label>
                                <input className='text-input' placeholder='Seach here' type='text' id='search'
                                onChange={(e) => setSearch(e.target.value)} ref={searchRef}></input>
                            </div>
                        </div> */}
                        <br/>
                        <span className='filter-range'>Date Range: {filterDateStart} to {filterDateEnd} </span>
                        <div className='action-buttons'>
                        <button className='btn-tools btn-new' onClickCapture={() => {setOpenModal(true);}} disabled={newModeDisabled} onClick={() => handleMode('new')}><i class="fas fa-plus"></i> New</button> &nbsp;
                            <button className='btn-tools btn-filter' onClick={() => {setOpenFilter(true);}}><i class="fas fa-filter"></i> Filter</button> &nbsp;
                            <button className='btn-tools btn-export'><i class="fas fa-download"></i> Export</button> &nbsp;
                            <button className='btn-tools btn-print'><i class="fas fa-print"></i> Print</button> &nbsp;
                            <button className='btn-tools btn-close'><i class="fas fa-close"></i> Close</button> &nbsp;
                        </div>

                                               
                        <div className='container-fluid'>
                            <div className='datatable' style={{overflow:'auto'}}>
                                <table id='CashReceiptTable' className='table table-data' role='grid'>
                                    <thead>
                                        <tr>
                                            <th className='theader'>#</th>
                                            <th className='theader'>Date</th>
                                            <th className='theader'>Ref. No.</th>
                                            <th className='theader'>Check No.</th>
                                            <th className='theader'>Check Date</th>
                                            <th className='theader'>Payee/Supplier</th>
                                            <th className='theader'>Transactions Type</th>
                                            <th className='theader'>Amount</th>
                                            <th className='theader'>Doc. Count</th>
                                            <th className='theader'>Status</th>
                                            <th className='theader'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {data.length > 0 ? (
                                        records.map((d,i) => (
                                            <tr key={i}>
                                                <td align='center'>{i + 1}</td>
                                                <td>{d.trans_date}</td>
                                                <td>{d.doc_type}#{d.cv_no}</td>
                                                <td>{d.check_no}</td>
                                                <td>{d.check_date}</td>
                                                <td>{d.payee}</td>
                                                <td>{d.TransType}</td>
                                                <td align='right'>{d.check_amt}</td>
                                                <td align='right'>{d.ul_code}</td>
                                                <td align='center'>{d.status}</td>
                                                <td align='center'><i class="far fa-edit"></i> | <i class="fas fa-trash-alt"></i></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td valign="top" colspan="11" class="dataTables_empty">No data available in the table</td>
                                    )}
                                    </tbody>
                                    <tfoot>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'>Total</th>
                                        <th className='tfooter'></th>
                                        <th className='tfooter'></th>
                                    </tfoot>
                                </table>
                            </div>
                            <nav className='nav-pagination'>
                                <ul className='pagination'>
                                    <li className='page-item'>
                                        <a href="#" className='page-link' onClick={prePage}>Prev</a>
                                    </li>
                                    {
                                        number.map((n,i) => (
                                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                                <a href='#' className='page-link' onClick={()=> changeCurPage(n)}>{n}</a>
                                            </li>
                                        ))
                                    }
                                    <li className='page-item'>
                                        <a href="#" className='page-link' onClick={nextPage}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </TabPanel>
                    )}

                    <TabPanel className="tab-details" id='2' >
                        {/* <div className='container-fluid' > */}
                            <div className='card'>
                                <div className='card-header'>
                                    <div className='action-buttons'>
                                        <button className='btn-tools btn-new' onClickCapture={() => {setOpenModal(true);}} disabled={newModeDisabled} onClick={() => handleMode('new')}><i class="fas fa-plus"></i> New</button> &nbsp;
                                        <button className='btn-tools btn-save' onClickCapture={(event) => {saveList(event);}} onClick={() => handleMode('view')} disabled={viewModeDisabled}><i class="fas fa-save"></i> Save</button> &nbsp;
                                        <button className='btn-tools btn-cancel' disabled={newModeDisabled}><i class="fas fa-ban"></i> Cancel</button> &nbsp;
                                        <button className='btn-tools btn-review' disabled={newModeDisabled}><i class="fas fa-book-open"></i> Review</button> &nbsp;
                                        <button className='btn-tools btn-approve' disabled={newModeDisabled}><i class="fas fa-check-double"></i> Approve</button> &nbsp;
                                    </div>
                                </div>
                                <div className='card-body' >
                                   <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                    <div className='col-sm-4'>
                                                        <div className='form-group'>
                                                            <label for='doc-type'>Doc Type</label>
                                                            <select id='doc-type' className='select'  ref={docTypeRef}  onKeyDown={(event) => handleKeys(event, 'docType')} onClick={() => fetchData('doctype')}  onKeyDownCapture={(e) => handleDisabledText(e.target.value)} disabled={isInputDisabled}>
                                                                {/* <option value='' selected hidden>Select Doc. Type</option> */}
                                                                {docTypedata.map((item) => (
                                                                    <option value={item.doc_type_name + '%' + item.doc_no_edit_restriction} >
                                                                        {item.doc_type_name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-4'>
                                                        <div className='form-group'>
                                                            <label for='doc-no'>Doc No</label>
                                                            <input className='text-input' type='text' id='doc-no' ref={docNoRef} style={{textAlign:'right'}} onKeyDown={(event) => handleKeys(event, 'docNo')} value={docNoValue} onChange={(e) => {setDocNoValue(e.target.value);}} disabled={docnoDisabled} autoComplete="off"></input>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-4'>
                                                        <div className='form-group'>
                                                            <label for='voucher-date'>Voucher Date</label>
                                                            <input className='text-input' type='date' id='voucher-date' ref={vDateRef} onKeyDown={(event) => handleKeys(event, 'vDate')} onChange={(e) => {setDateTransValue(e.target.value);}} onChangeCapture={(e) => {setDueDateValue(e.target.value);}} disabled={isInputDisabled}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className='form-group'>
                                                <label for='payee'>Payee</label>
                                                <input className='text-input' ref={payeeRef} type='text' id='payee' onKeyDown={(event) => handleKeys(event, 'payee')} onInput={(e) => handleSearchInputChange(e.target.value, 'payee')} value={payeeValue} onChange={(e) => setPayeeValue(e.target.value)} disabled={isInputDisabled} autoComplete="off"></input>
                                                {payeeListVisible && (
                                                    <ul id="list" className='ul-list payee' onKeyDown={(event) => handleKeys(event, 'payee')}  ref={payeeListRef}>
                                                        {searchResults.map((result,index) => (
                                                        <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''} onKeyUpCapture={() => setAddressValue(result.address)} onKeyDownCapture={() => setPayeeValue(result.name)} onKeyUp={() => setPayeeID(result.idcode)} onKeyDown={(event) => handleKeys(event, 'payee')}>{result.name}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className='form-group'>
                                                <label for='address'>Address</label>
                                                <textarea className='textarea-input' type='text' id='address' value={addressValue} rows='4' ref={addressRef} onKeyDown={(event) => handleKeys(event, 'address')} disabled={isInputDisabled} autoComplete="off"></textarea>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-sm-4'>
                                                    <div className='form-group'>
                                                        <label for='check-date'>Check Date</label>
                                                        <input className='text-input' ref={checkDateRef} onKeyDown={(event) => handleKeys(event, 'checkDate')} type='date' id='check-date' onChange={(e) => {setDateCheckValue(e.target.value);}} disabled={checkDisabled}></input>
                                                    </div>  
                                                </div>
                                                <div className='col-sm-4'>
                                                    <div className='form-group'>
                                                        <label for='check-no'>Check No</label>
                                                        <input className='text-input' ref={checkNoRef} onKeyDown={(event) => handleKeys(event, 'checkNo')} type='text' id='check-no' onChange={(e) => {setCheckNoValue(e.target.value);}} disabled={checkDisabled} autoComplete="off"></input>
                                                    </div>
                                                </div>
                                                <div className='col-sm-4'>
                                                    <div className='form-group'>
                                                        <label for='check-amount'>Check Amount</label>
                                                        <input id='credit' className='text-input' ref={checkAmtRef} onKeyDown={(event) => handleKeys(event, 'checkAmt')} onChange={(event) => setcheckAmtValue(event.target.value)} onInput={handleDataInputs} type='text'  placeholder='0.00' style={{textAlign:'right'}} disabled={isInputDisabled} autoComplete="off"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group'>
                                                <label for='drawee-bank'>Drawee Bank</label>
                                                <input className='text-input' type='text' id='drawee-bank' ref={draweeRef} onKeyDown={(event) => handleKeys(event, 'drawee')} onInput={(e) => handleSearchInputChange(e.target.value, 'drawee')} value={draweeValue} onChange={(e) => setDraweeValue(e.target.value)}  disabled={checkDisabled} autoComplete="off"></input>
                                                {draweeListVisible && (
                                                    <ul id="list" className='ul-list drawee' onKeyDown={(event) => handleKeys(event, 'drawee')}  ref={draweeListRef}>
                                                        {draweeResults.map((result,index) => (
                                                            <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''} onKeyDown={() => setDraweeValue(result.name)} onKeyDownCapture={() => setDraweeID(result.idcode)}>{result.name}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className='form-group'>
                                                <label for='remarks'>Remarks</label>
                                                <textarea className='textarea-input' type='text' id='remarks' rows='4' ref={remarksRef} onKeyDown={(event) => handleKeys(event, 'remarks')} onChange={(e) => {setRemarksValue(e.target.value);}} disabled={isInputDisabled} autoComplete="off"></textarea>
                                            </div>
                                        </div>
                                   </div>


                                   {/* *************************ROW DATA ENTRY*********************** 123 */}
                                   {rowEntryVisible && (
                                    <div className='datatable' style={{overflow:'auto'}}>
                                        <table id='EntryTable' className='table table-data' role='grid'>
                                            <thead>
                                                <tr>
                                                    <th className='theader'>UL</th>
                                                    <th className='theader'>Account Code</th>
                                                    <th className='theader'>Account Title</th>
                                                    <th className='theader'>Subsidiary Account</th>
                                                    <th className='theader'>Debit</th>
                                                    <th className='theader'>Credit</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{backgroundColor: '#efefef'}}>
                                                <td><input className='text-input' id='ul'value='1' disabled/></td>
                                                <td><input className='text-input' ref={accountCodeRef} id='accCode' value={accountCodeValueListing} onInputCapture={handleDataInputs} disabled/></td>
                                                <td>
                                                    <input className='text-entry' type='text' id='acctTitle' ref={accountTitleRef} onKeyDown={(event) => handleKeys(event, 'accountTitle')}  onInput={(e) => handleSearchInputChange(e.target.value, 'accountTitle')} value={accountTitleValueListing} onChange={(e) => setAccountTitleValueListing(e.target.value)}  autoComplete="off"/>
                                                    {acctTitleListVisible && (
                                                        <ul id="list" className='ul-list' onKeyDown={(event) => handleKeys(event, 'accountTitle')}  ref={acctTitleListRef}>
                                                                {accountTitleResults.map((result,index) => (
                                                                    <li id='acctTitle' tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''} onKeyUp={() => setSLTypeValueListing(result.sl_type)} onKeyUpCapture={() => setSlSubIDValueListing(result.sl_sub_category_id)} onKeyDown={() => setAccountTitleValueListing(result.acct_description)} onKeyDownCapture={() => setAccountCodeValueListing(result.acct_title_code)}>{result.acct_description}</li>
                                                                ))}
                                                            </ul>
                                                        )} 
                                                </td>
                                                
                                                <td>
                                                    <input className='text-entry' type='text' id='slName' ref={slNameRef} onKeyDown={(event) => handleKeys(event, 'slName') } onInput={(e) => handleSearchInputChange(e.target.value, 'slName')} value={slNameValueListing} onChange={(e) => setSlNameValueListing(e.target.value)}   autoComplete="off"/>
                                                    {slNameListVisible && (
                                                        <ul id="list" className='ul-list' onKeyDown={(event) => handleKeys(event, 'slName')}  ref={slNameListRef}>
                                                                {slNameResults.map((result,index) => (
                                                                    <li id='slName' tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''} onKeyDown={() => setSlNameValueListing(result.name)} >{result.name}</li>
                                                                ))}
                                                            </ul>
                                                        )}            
                                                </td>
                                                <td>
                                                    <input className='text-entry' type='text' id='debit' ref={debitRef} onKeyDown={(event) => handleKeys(event, 'debit')} onInput={(e) => setDebitValue(e.target.value)}  style={{textAlign:'right'}} placeholder='0.00' autoComplete="off"/>
                                                </td>
                                                <td>
                                                    <input className='text-entry' type='text' id='credit' ref={creditRef} onKeyDown={(event) => handleKeys(event, 'credit')} onInput={(e) => setCreditValue(e.target.value)}  style={{textAlign:'right'}} placeholder='0.00' autoComplete="off"/>
                                                </td>
                                            </tbody>
                                        </table>
                                    </div>
                                    )} 
                                   {/* *************************END OF DATA ENTRY********************* */}



                                   <div className='datatable' style={{overflow:'auto'}}>
                                    <table id='CashReceiptTable' className='table table-data' role='grid'>
                                        <thead>
                                            <tr>
                                                <th className='theader'>UL</th>
                                                <th className='theader'>Account Code</th>
                                                <th className='theader'>Account Title</th>
                                                <th className='theader'>Subsidiary Account</th>
                                                <th className='theader'>Debit</th>
                                                <th className='theader'>Credit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowData.length > 0 ? (
                                                rowData.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.ul}</td>
                                                        <td>{data.accCode}</td>
                                                        <td>{data.acctTitle}</td>
                                                        <td>{data.slName}</td>
                                                        <td style={{textAlign:'right'}}>{data.debit}</td>
                                                        <td style={{textAlign:'right'}}>{data.credit}</td>
                                                    </tr>
                                                ))
                                            ) : ( 
                                                <td valign="top" colspan="11" class="dataTables_empty">No data available in the table</td>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <th className='tfooter'>Total</th>
                                            <th className='tfooter'></th>
                                            <th className='tfooter'></th>
                                            <th className='tfooter'></th>
                                            <th className='tfooter' style={{textAlign:'right'}}>{totalDebitValue.toFixed(2)}</th>
                                            <th className='tfooter' style={{textAlign:'right'}}>{totalCreditValue.toFixed(2)}</th>
                                        </tfoot>
                                    </table>
                                   </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label for='prepared-by'>Prepared by:</label>
                                                <select id='prepared-by' className='select' onChange={(e) => {setPrepByValue(e.target.value);}} disabled={isInputDisabled}>
                                                    <option value='' selected hidden>Select Prepared by</option>
                                                    <option value='Paolo Cajandig'>Paolo Cajandig</option>
                                                    <option value='Maick Castillo'>Maick Castillo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label for='reviewed-by'>Reviewed by:</label>
                                                <select id='reviewed-by' className='select' onChange={(e) => {setRevByValue(e.target.value);}} disabled={isInputDisabled}>
                                                    <option value='' selected hidden>Select Reviewed by</option>
                                                    <option value='Paolo Cajandig'>Paolo Cajandig</option>
                                                    <option value='Maick Castillo'>Maick Castillo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label for='approved-by'>Approved by:</label>
                                                <select id='approved-by' className='select' onChange={(e) => {setAppByValue(e.target.value);}} disabled={isInputDisabled}>
                                                    <option value='' selected hidden>Select Approved by</option>
                                                    <option value='Paolo Cajandig'>Paolo Cajandig</option>
                                                    <option value='Maick Castillo'>Maick Castillo</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                    </TabPanel>
                </Tabs>            
                
            </div>

            <div class="card-footer">
                    
            </div>
        </div>
    </div>
    {openModal && <ModalAddNew closeModal={setOpenModal} onselect={setTransTypeValue} onSelectSL={setslTypeValue} tabVisible={setTabVisible} />} 
    {openFilter && <FilterByDateRange onFilter={fetchDataByDateRange} closeFilter={setOpenFilter} />}
    {openAppPayment && <ApplicationOfPayment onSelect={setRowData} closeAppPayment={setopenAppPayment} doneAppPayment={setDoneAP} />}
    </Fragment>
    </section>


// FUNCTIONS FOR PAGINATION
function prePage(){
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
    }
}

function changeCurPage(id){
    setCurrentPage(id)
}

function nextPage(){
    if(currentPage !== numpage){
        setCurrentPage(lastIndex + 1)
    }
}


}


export default CashDisbursement;
