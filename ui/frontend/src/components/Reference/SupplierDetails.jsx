/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {useState, Fragment, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../TaskPane/CSS/newIndex.css'
import '../TaskPane/CSS/index.css'
import './css/CustomerDetails.css'
import logo from './css/logo.png'

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt,faSave,faCameraAlt,faSearch, faL } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';





 const SupplierDetails = () => {

    //#region 
    const [tabVisible, setTabVisible] = useState(true);
    const [imagePreview, setImagePreview] = useState('');
    const [ID_Code, setIdCode] = useState('');
    const [Tradename, setTradeName] = useState('');
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [MI, setMI] = useState('');
    const [Phone, setPhone] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Fax, setFax] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Province, setProvince] = useState('');
    const [ZipCode, setZipCode] = useState('');
   
    const [TAX, setTax] = useState('');
    const [Status, setStatus] = useState('');
    const [Group, setGroup] = useState('');
    const [Trade, setTrade] = useState('');;
    const [SL, setSL] = useState('');
    const [Remarks, setRemarks] = useState('');
    const [CustomerList, setCustomerList] = useState('');
    const [SearchDataVisible, setSearchDataVisible] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [searchInput, setSearchInput] = useState('');

  
    const customerRef = useRef(null);
    const inputRef = useRef(null);
    const resultsContainerRef = useRef(null);
    const containerRef = useRef(null);
    const tradenameidRef = useRef(null);
    const lnameidRef = useRef(null);
    const fnameidRef = useRef(null);
    const miidRef = useRef(null);
    const phoneidRef = useRef(null);
    const mobileidRef = useRef(null);
    const faxidRef = useRef(null);
    const addressidRef = useRef(null);
    const cityidRef = useRef(null);
    const provinceidRef = useRef(null);
    const zipcodeidRef = useRef(null);
    const vatidRef = useRef(null);
    const taxidRef = useRef(null);
    const statusidRef = useRef(null);
    const groupidRef = useRef(null);
    const areaidRef = useRef(null);
    const tradeRef = useRef(null);
    const collectoridRef = useRef(null);
    const kobidRef = useRef(null);
    const slidRef = useRef(null);
    const SaveRef = useRef(null);
    const EditRef = useRef(null);
    const NewRef = useRef(null);


    const remarksidRef = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isNewMode, setIisNewMode] = useState(false);
    const [SaveDisableButton, setSaveDisableButton] = useState(true);
    // const [vatOptions, setVatOptions] = useState([
    //     { value: 'V', label: 'VAT' },
    //     { value: 'N', label: 'Non VAT' },
    //     { value: 'E', label: 'VAT Exempt' },
    //     { value: 'Z', label: 'Zero Rated' }
    // ]);

    const [VAT, setVat] = useState('V');

    const HandleNewClick = async () => {
        setSaveDisableButton(false)
        setIdCode(parseInt(ID_Code)+1)
        setTradeName('');
        setLname('');
        setIisNewMode(true)
        console.log('')
        setFname('');
        setMI('');
        setPhone('');
        setMobile('');
        setFax('');
        setAddress('');
        setCity('');
        setProvince('');
        setZipCode(0);
        // setIsEditMode(true)
        setVat('');

        setTax('');
        setStatus('');
        setGroup('');
        setTrade('T');

        setSL('');
        setRemarks('');
        setImagePreview('');
        const inputElements = containerRef.current.querySelectorAll('input');
        const selectElements = containerRef.current.querySelectorAll('select');
        const textareaElements = containerRef.current.querySelectorAll('textarea');
        inputElements.forEach((input) => {
          input.removeAttribute('readonly');
          input.removeAttribute('disabled');
          input.style.backgroundColor = 'white';
    
        });
        selectElements.forEach((select) => {
            select.removeAttribute('readonly');
            select.removeAttribute('disabled');
            select.style.backgroundColor = 'white';
      
          });
          textareaElements.forEach((text) => {
            text.removeAttribute('readonly');
            text.removeAttribute('disabled');
            text.style.backgroundColor = 'white';
      
          });
    
        tradenameidRef.current.focus();
    
    };

   const HandleSaveClick = async () => {
    try {
        if (isEditMode) {

            swalWithBootstrapButtons.fire({
                title: 'Confirmation',
                text: "Do you want to Update this Supplier?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('ID_Code', ID_Code);
                    formData.append('Tradename', Tradename);
                    formData.append('Fname', Fname);
                    formData.append('Lname', Lname);
                    formData.append('MI', MI);
                    formData.append('Phone', Phone);
                    formData.append('Mobile', Mobile);
                    formData.append('Fax', Fax);
                    formData.append('Address', Address);
                    formData.append('City', City);
                    formData.append('Province', Province);
                    formData.append('ZipCode', ZipCode);
                    formData.append('Vat', VAT);
                    formData.append('Tax', TAX);
                    formData.append('Status', Status);
                    formData.append('Group', Group);
                    formData.append('sl', SL);
                    formData.append('Trade', Trade);
                    formData.append('Remarks', Remarks);
                    formData.append('image', imagePreview);
                    await axios.put('http://localhost:8000/api/supplier-details', formData ,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                          },
                      
                      })
                     setIsEditMode(false)
                    Swal.fire({
                      icon: 'success',
                      title: 'Save!',
                      text: 'Supplier Successfully Update.',
                      showConfirmButton: false,
                      timer: 3000  
                    });
                }})
        }

        else if(isNewMode){

            swalWithBootstrapButtons.fire({
                title: 'Confirmation',
                text: "Do you want to Save this Supplier entry?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then(async(result) => {
                if (result.isConfirmed) {


                const formData = new FormData();
                formData.append('ID_Code', ID_Code);
                formData.append('Tradename', Tradename);
                formData.append('Fname', Fname);
                formData.append('Lname', Lname);
                formData.append('MI', MI);
                formData.append('Phone', Phone);
                formData.append('Mobile', Mobile);
                formData.append('Fax', Fax);
                formData.append('Address', Address);
                formData.append('City', City);
                formData.append('Province', Province);
                formData.append('ZipCode', ZipCode);
                formData.append('Vat', VAT);
                formData.append('Tax', TAX);
                formData.append('Trade', Trade);
                formData.append('Status', Status);
                formData.append('Group', Group);
                formData.append('sl', SL);
                // formData.append('KOB', KOB);
                formData.append('Remarks', Remarks);
                formData.append('image', imagePreview);
                await axios.post('http://localhost:8000/api/supplier-details', formData ,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                  
                  })
                setIisNewMode(false)
                Swal.fire({
                icon: 'success',
                title: 'Save!',
                text: 'Supplier Successfully Added.',
                showConfirmButton: false,
                timer: 3000  
                });    
        }})}
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
                setSaveDisableButton(true)
   
            }catch (error) {
        console.error('Error saving data:', error);
      }
    };

    const HandleEditClick = () => {
        setSaveDisableButton(false)
        setIsEditMode(true)
        const inputElements = containerRef.current.querySelectorAll('input');
        const selectElements = containerRef.current.querySelectorAll('select');
        const textareaElements = containerRef.current.querySelectorAll('textarea');
        inputElements.forEach((input) => {
          input.removeAttribute('readonly');
          input.removeAttribute('disabled');
          input.style.backgroundColor = 'white';
    
        });
        selectElements.forEach((select) => {
            select.removeAttribute('readonly');
            select.removeAttribute('disabled');
            select.style.backgroundColor = 'white';
      
          });
          textareaElements.forEach((text) => {
            text.removeAttribute('readonly');
            text.removeAttribute('disabled');
            text.style.backgroundColor = 'white';
      
          });
    
        tradenameidRef.current.focus();
    
    
      };
    
    
      const HandleDeleteClick = () => {

        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want to Delete this Supplier?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    if (ID_Code ===''){
                        setSearchDataVisible(false);     
                    }
                    else {
                        axios.delete('http://localhost:8000/api/supplier-search', {
                        params: {
                          id_code: ID_Code,
                        },
                      })
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Delete!',
                            text: 'Supplier Successfully Deleted.',
                            showConfirmButton: false,
                            timer: 3000  
                          });
                              setTimeout(() => {
                                window.location.reload();
                              }, 3000);
                    })
                    }
                    
                } catch (error) {
                console.error(error);
                }
            }})
      };



    useEffect(() => {
        setSaveDisableButton(true)
        // Make the API request when the component mounts
    axios.get('http://localhost:8000/api/supplier-details')
          .then(response => {
            const data = response.data.latest_customer;
            setIdCode(data.id_code);
            setTradeName(data.trade_name);
            setLname(data.last_name);

            setFname(data.first_name);
            setMI(data.middle_name);
            setPhone(data.business_phone_no);
            setMobile(data.mobile_no);
            setFax(data.fax_no);
            setAddress(data.address);
            setCity(data.city_municipality);
            setProvince(data.province);
            setZipCode(data.zip_code);
            setTrade(data.trade)

            const selectElement = vatidRef.current;
            selectElement.value = data.vat_registration_type;
            const changeEvent = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(changeEvent);


            // setVat(data.vat_registration_type)

            setTax(data.tax_id_no);
            setStatus(data.active_status);
            setGroup(data.group_name);
            // setArea(data.area_name);
            // setAgent(data.agent_name);
            // setCollector(data.collector_name);
            setSL(data.sl_sub_category_description);
            // setKOB(data.kob_name)
            setRemarks(data.remarks);

            const imageBase64 = `data:image/gif;base64,${data.supplier_image}`;
            setImagePreview(imageBase64);
            // console.log('fsdfsdfm',data.customer_image)


            
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      ///-----image button------
//#region
const handleTradeNameChange = event => {
        setTradeName(event.target.value);
      };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB in bytes
  
      if (selectedImage.size > maxSizeInBytes) {
        // Display an error message or handle the oversized image
        Swal.fire({
            icon: 'error',
            title: 'Upload error!',
            text: 'Selected image exceeds the maximum size of 1 MB.',
            showConfirmButton: false,
            timer: 3000  
          });
      } else {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          setImagePreview(e.target.result);
        }
  
        reader.readAsDataURL(selectedImage);
      }
    } else {
      setImagePreview('');
    }
  };

//#endregion


const handleSearchInputChange = async (e) => {
    setSearchInput(e)
    try {
        if (e ===''){
            setSearchDataVisible(false);     
        }
        else {
            axios.get('http://localhost:8000/api/supplier-details', {
            params: {
              trade_name: e,
            },
          })
        .then(response => {
 
          setCustomerList(response.data);
          setSearchDataVisible(true);    
        })
        }
        
        
    } catch (error) {
    console.error(error);
    }
};

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })



const handleEscape = (event) => {
    if (event.key === 'Escape') {
     
        if (isEditMode){

  
                swalWithBootstrapButtons.fire({
                title: 'Confirmation',
                text: "Do you want to abort Editing Supplier entry?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                   
                    setIsEditMode(false)
                    window.location.reload();
                }})
            

            
        }
            else if(isNewMode){
                swalWithBootstrapButtons.fire({
                    title: 'Confirmation',
                    text: "Do you want to abort Adding Entry?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                       
                        setIsEditMode(false)
                        window.location.reload();
                    }})
            }

   
    }
  };


const handleSearch= async (e) => {
    setSearchInput(e)
    try {
        if (e ===''){
            setSearchDataVisible(false);     
        }
        else {
            axios.get('http://localhost:8000/api/supplier-search', {
            params: {
              trade_name: e,
            },
          })
        .then(response => {
          const data = response.data.customersSearch;

          setIdCode(data[0].id_code);
        
          setTradeName(data[0].trade_name);
          setLname(data[0].last_name);
          console.log(data[0].id_code)
  
          setFname(data[0].first_name);
          setMI(data[0].middle_name);
          setPhone(data[0].business_phone_no);
          setMobile(data[0].mobile_no);
          setFax(data[0].fax_no);
          setAddress(data[0].address);
          setCity(data[0].city_municipality);
          setProvince(data[0].province);
          setZipCode(data[0].zip_code);
          setTrade(data[0].trade)
         
          const selectElement = vatidRef.current;
          selectElement.value = data[0].vat_registration_type;
          const changeEvent = new Event('change', { bubbles: true });
          selectElement.dispatchEvent(changeEvent);


        //   setVat(data.vat_registration_type);
          setTax(data[0].tax_id_no);
          setStatus(data[0].active_status);
          setGroup(data[0].group_name);
        //   setArea(data[0].area_name);
        //   setAgent(data[0].agent_name);
        //   setCollector(data[0].collector_name);
          setSL(data[0].sl_sub_category_description);
        //   setKOB(data[0].kob_name)
          setRemarks(data[0].remarks);

          const imageBase64 = `data:image/gif;base64,${data[0].supplier_image}`;
          setImagePreview(imageBase64);


        })
        }
        
        
    } catch (error) {
    console.error(error);
    }
};

///// keydown every in in Every Input////
const handleKeyDown = (event, currentRef, nextRef) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (nextRef.current) {
            nextRef.current.focus();
          }
        }
};
    ///// KEY UP AND KEY DOWN////
  const handleKeys = (event) => {
    const key = event.key;
    const customerItems = Array.from(resultsContainerRef.current.querySelectorAll('li'));

    if (key === 'ArrowDown') {
      event.preventDefault();
      const currentSelectedItem = customerItems.find((item) => item.classList.contains('selected'));
      const currentIndex = customerItems.indexOf(currentSelectedItem);
      const nextIndex = currentIndex < customerItems.length - 1 ? currentIndex + 1 : 0;
      const nextItem = customerItems[nextIndex];


      if (nextItem) {
        currentSelectedItem.classList.remove('selected');
        nextItem.classList.add('selected');
        const payeeText = nextItem.textContent.split(' - ')[1];
        setSearchInput(payeeText);
        nextItem.focus();
      }
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      const currentSelectedItem = customerItems.find((item) => item.classList.contains('selected'));
      const currentIndex = customerItems.indexOf(currentSelectedItem);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : customerItems.length - 1;
      const prevItem = customerItems[prevIndex];

      if (prevItem) {
        currentSelectedItem.classList.remove('selected');
        prevItem.classList.add('selected');
        const payeeText = prevItem.textContent.split(' - ')[1];
        setSearchInput(payeeText);
        prevItem.focus();
      }
    } else if (key === 'Enter') {
      const selectedItem = customerItems.find((item) => item.classList.contains('selected'));
      if (selectedItem) {
        const cusid = selectedItem.getAttribute('data-id');
        const cusName = selectedItem.textContent.split(' - ')[1];

        setSearchInput(cusName);
        handleSearch(cusName);
        setSearchDataVisible(false)
        // resultsContainerRef.current.innerHTML = '';
        // Perform further actions as needed
      }
    }
  };

//#endregion


return <section className="content" onKeyDown={handleEscape}>
<Fragment>
    <div className="card-container"  onKeyDown={handleEscape} >
        <div class="card">

            <div class="card-body" ref={containerRef} onKeyDown={handleEscape} >
                <Tabs>
                    <TabList>   
                    {tabVisible && (
                        <Tab id='1'>Supplier Details</Tab>
                    )}
                        <Tab id='2'>Supplier List</Tab>
                
                    </TabList>

                    {tabVisible && (
                    <TabPanel className="tab-trans-history" id='1'>
                          
                        <div className='action-buttons' style={{display:'flex',width:'100%'}}>
                            <div className='form-group customer' style={{display:'flex',width:'100%'}}>
                            <input
                                    type='text'
                                    id='search'
                                    ref={inputRef}
                                    className='text-input'
                                    value={searchInput}
                                    onInput={(e) => handleSearchInputChange(e.target.value)}
                                    placeholder='Search....'
                                    onKeyDown={handleKeys}
                                    style={{ width: '50%', marginLeft: '10px' }}
                                    autoComplete='off'/>
                                        <div className='CustomerResults' id='CustomerResults' ref={resultsContainerRef} style={{ display: SearchDataVisible ? 'block' : 'none' }}>
                                        {CustomerList.length > 0 ? (
                                            <ul id='customer-list' className='ul-list' ref={customerRef}>
                                            {CustomerList.map((result, index) => (
                                                <li
                                                tabIndex={0}
                                                key={index}
                                                className={selectedItemIndex === index ? 'selected' : ''}
                                                onKeyDown={(event) => handleKeys(event)}
                                                onClick={() => {
                                                setSelectedItemIndex(index);
                                                setSearchInput(`${result.trade_name}`);
                                                setSearchDataVisible(false);
                                                handleSearch(`${result.trade_name}`);
                                                }}
                                            >
                                                {result.id_code} - {result.trade_name}
                                            </li>
                                            ))}
                                            </ul>
                                        ) : (
                                            <td valign='top' colspan='11' class='dataTables_empty'>
                                            No data available in the table
                                            </td>
                                        )}
                                        </div>
                            </div>


                                <button className='btn-tools btn-new' ref={NewRef}  onClick={HandleNewClick} ><i class="fas fa-plus"></i> New</button> &nbsp;
                                <button className='btn-tools btn-save' ref={SaveRef} disabled={SaveDisableButton} onClick={HandleSaveClick}> <i class="fas fa-save" ></i> {isEditMode ? 'Update':'Save'}</button> &nbsp;
                                <button className='btn-tools btn-edit' ref={EditRef} onClick={HandleEditClick}> <i class="fas fa-edit"></i> Edit</button> &nbsp;
                                <button className='btn-tools btn-delete'  onClick={HandleDeleteClick}> <i class="fas fa-trash"></i> Delete</button> &nbsp;
                                <button className='btn-tools btn-cancel' disabled={''} ><i class="fas fa-ban"></i> Cancel</button> &nbsp;
    
                        </div>
                     
                        <div className='container-fluid' >
                            <div className='card'>
                                {/* <div className='card-header'> */}
                            
                                {/* </div> */}
               

                                   {/* *************************ROW DATA ENTRY********************* */}
                                   <div className='card-body' onKeyDown={handleEscape}>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='right'>

                                                    <div className='form-group1 trade-name'>
                                                        <label>Trade Name</label>
                                                        <input ref={tradenameidRef} onKeyDown={(e) => handleKeyDown(e, tradenameidRef, lnameidRef)} type='text' className='text-input'  defaultValue={Tradename}   onChange={handleTradeNameChange} readOnly/>
                                                    </div>

                                                    <div className='contact'>
                                                        <h3 style={{textAlign:'start'}}>Primary Contact</h3>
                                                        <div className='form-group customer'>
                                                            <label>Last Name:</label>
                                                            <input type='text'   ref={lnameidRef}  onKeyDown={(e) => handleKeyDown(e, lnameidRef, fnameidRef)} className='text-input' defaultValue={Lname}  onChange={(event) => setLname(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>First Name:</label>
                                                            <input type='text' ref={fnameidRef} onKeyDown={(e) => handleKeyDown(e, fnameidRef, miidRef)} className='text-input' defaultValue={Fname} onChange={(event) => setFname(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>Middle Name:</label>
                                                            <input type='text' ref={miidRef} onKeyDown={(e) => handleKeyDown(e, miidRef, phoneidRef)} className='text-input' defaultValue={MI} onChange={(event) => setMI(event.target.value)} readOnly/>
                                                        </div>
                                                    </div>

                                                   
                                                    <div className='contact'>
                                                        <h3 style={{textAlign:'start'}}>Phone Contact</h3>
                                                        <div className='form-group customer'>
                                                            <label>Business Phone:</label>
                                                            <input type='text' ref={phoneidRef} onKeyDown={(e) => handleKeyDown(e, phoneidRef, mobileidRef)} className='text-input' defaultValue={Phone} onChange={(event) => setPhone(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>Mobile phone:</label>
                                                            <input type='text' ref={mobileidRef} onKeyDown={(e) => handleKeyDown(e, mobileidRef, faxidRef)} className='text-input' defaultValue={Mobile} onChange={(event) => setMobile(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>Fax Number:</label>
                                                            <input type='text' ref={faxidRef} onKeyDown={(e) => handleKeyDown(e, faxidRef, addressidRef)} className='text-input' defaultValue={Fax} onChange={(event) => setFax(event.target.value)} readOnly />
                                                        </div>

                                                    </div>



                                                    <div className='contact'>
                                                        <h3 style={{textAlign:'start'}}>Address Contact</h3>
                                                        <div className='form-group customer'>
                                                            <label>Address:</label>
                                                            <input type='text' ref={addressidRef} onKeyDown={(e) => handleKeyDown(e, addressidRef, cityidRef)} className='text-input' defaultValue={Address} onChange={(event) => setAddress(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>City/Municipality:</label>
                                                            <input type='text' ref={cityidRef} onKeyDown={(e) => handleKeyDown(e, cityidRef, provinceidRef)} className='text-input' defaultValue={City} onChange={(event) => setCity(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>Province:</label>
                                                            <input type='text' ref={provinceidRef} onKeyDown={(e) => handleKeyDown(e, provinceidRef, zipcodeidRef)} className='text-input' defaultValue={Province} onChange={(event) => setProvince(event.target.value)} readOnly/>
                                                        </div>
                                                        <div className='form-group customer'>
                                                            <label>ZIP/Postal Code:</label>
                                                            <input type='text' ref={zipcodeidRef} onKeyDown={(e) => handleKeyDown(e, zipcodeidRef, tradeRef)} className='text-input' defaultValue={ZipCode} onChange={(event) => setZipCode(event.target.value)} readOnly/>
                                                        </div>
                                                    </div>
                                                    
                                               
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                        
                                                <div className='right'>
                                                <h3 style={{textAlign:'start'}}>Other Information</h3>
                                                <div className='form-group customer' >
                                                        <label >Select Trade</label>
                                                        <select ref={tradeRef} onKeyDown={(e) => handleKeyDown(e, tradeRef, vatidRef)}type='text' defaultValue={Trade}  onChange={(event) => setTrade(event.target.value)} className='text-input' autoComplete='off' disabled>
                                                            <option value={'T'}>Trade</option>
                                                            <option value={'N'}>Non Trade</option>
                                                        </select>

                                                    </div>
                                                    <div className='form-group customer'>
                                                        <label >Select Vat</label>
                                                        <select ref={vatidRef} onKeyDown={(e) => handleKeyDown(e, vatidRef, taxidRef)}type='text' defaultValue={VAT}  onChange={(event) => setVat(event.target.value)} className='text-input' autoComplete='off' disabled>
                                                            <option value={'V'}>VAT</option>
                                                            <option value={'N'}>Non VAT</option>
                                                        </select>

                                                    </div>

                                                    <div className='form-group customer'>
                                                        <label>TAX ID No.</label>
                                                        <input type='text' ref={taxidRef} onKeyDown={(e) => handleKeyDown(e, taxidRef, statusidRef)}  className='text-input' defaultValue={TAX} onChange={(event) => setTax(event.target.value)} readOnly/>
                                                    </div>

                                                    <div className='form-group customer'>
                                                        <label>Status</label>
                                                    <select ref={statusidRef} onKeyDown={(e) => handleKeyDown(e, statusidRef, groupidRef)} type='text' className='text-input'  defaultValue={Status} onChange={(event) => setStatus (event.target.value)} autoComplete='off' disabled>
                                                    <option value={'Y'}>Active</option>
                                                    <option value={'N'}>InActive</option>
                                                  
                                   
                                                     </select>

                                                    </div>
                                                    <div className='form-group customer'>
                                                        <label>Group:</label>
                                                        <input type='text' ref={groupidRef} onKeyDown={(e) => handleKeyDown(e, groupidRef, slidRef)} className='text-input' defaultValue={Group} onChange={(event) => setGroup(event.target.value)} readOnly/>
                                                    </div>
                                                    {/* <div className='form-group customer'>
                                                        <label>Area:</label>
                                                        <input type='text' ref={areaidRef} onKeyDown={(e) => handleKeyDown(e, areaidRef, agentidRef)} className='text-input' defaultValue={Area} onChange={(event) => setArea(event.target.value)} readOnly/>
                                                    </div>
                                                    <div className='form-group customer'>
                                                        <label>Agent:</label>
                                                        <input type='text' ref={agentidRef} onKeyDown={(e) => handleKeyDown(e, agentidRef, collectoridRef)} className='text-input' defaultValue={Agent} onChange={(event) => setAgent(event.target.value)} readOnly/>
                                                    </div>
                                                    <div className='form-group customer'>
                                                        <label>Collector:</label>
                                                        <input type='text' ref={collectoridRef} onKeyDown={(e) => handleKeyDown(e, collectoridRef, kobidRef)} className='text-input' defaultValue={Collector} onChange={(event) => setCollector(event.target.value)} readOnly/>
                                                    </div>
                                                    <div className='form-group customer'>
                                                        <label>KOB</label>
                                                        <input type='text' ref={kobidRef} onKeyDown={(e) => handleKeyDown(e, kobidRef, slidRef)} className='text-input' defaultValue={KOB} onChange={(event) => setKOB(event.target.value)} readOnly/>
                                                    </div> */}
                                                    <div className='form-group customer'>
                                                        <label>SL Category</label>
                                                        <input type='text' ref={slidRef} onKeyDown={(e) => handleKeyDown(e, slidRef, remarksidRef)} className='text-input' defaultValue={SL} onChange={(event) => setSL(event.target.value)} readOnly/>
                                                    </div>
                                                    <div className='form-group customer'>
                                                        <label>Remarks</label>
                                                        <textarea type='text'ref={remarksidRef}  className='text-input'defaultValue={Remarks} onChange={(event) => setRemarks(event.target.value)} style={{resize:'none',height:'80px'}} readOnly></textarea>
                                                    </div>

                                                    <div className='form-group image'>
                                                        {/* <h3>Customer Image</h3> */}
                                                        <div className='avatar-upload' style={{marginTop:'25px'}}>
                                                            <div className='avatar-edit'>
                                                            <input
                                                                type='file'
                                                                id='imageUpload'
                                                                name='imageUpload'
                                                                accept='.png, .jpg, .jpeg'
                                                                onChange={handleImageChange}
                                                            />
                                                            <label htmlFor='imageUpload' className='upload-label'>
                                                                {/* <FontAwesomeIcon className='icon' icon={faCameraAlt} style={{
                                                                    color:'white'
                                                                }}></FontAwesomeIcon> */}
                                                                </label>
                                                            <label htmlFor='imageUpload'></label>
                                                            </div>
                                                            <div className='avatar-preview'>
                                                            <div
                                                                className='imagePreview'
                                                                style={{
                                                                backgroundImage: `url(${imagePreview})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                height:'100%',
                                                                width:'100%',
                                                                }}
                                                            ></div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                   {/* *************************END OF DATA ENTRY********************* */}


                            </div>
                        </div>
                               
                    </TabPanel>
                    )}

                    <TabPanel className="tab-details" id='2' >
                            <div class="card">
                                <div class="card-header">
                                    <div className='location-container'>
                                
                                        <table className='table table-data'>
                                        <thead>
                                            <tr>
                                                <th>Ref. No.</th>
                                                <th>Date</th>
                                                <th>Gross Amount</th>
                                                <th>Terms</th>
                                                <th>Payment Scheme</th>
                                                <th>Due Date</th>
                                            </tr>
                                        </thead> 
                                        <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                    
                                        </tbody>

                                    </table>
                                </div>
                                    
                                </div> 
                            </div>
                    </TabPanel>
                </Tabs>            
        </div>
                          
    </div>
 </div>
</Fragment>
 </section>
    
}

export default SupplierDetails