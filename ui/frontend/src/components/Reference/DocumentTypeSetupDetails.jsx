

import React from 'react';
import {useState, Fragment, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../TaskPane/CSS/newIndex.css'
import '../TaskPane/CSS/index.css'
import './css/DocumentTypeSetupDetails.css'
import logo from './css/logo.png'

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt,faSave,faCameraAlt,faSearch, faL, faCancel } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';





 const DocumentTypeSetupDetails = () => {
const [DoctypeSetup,setDoctypeSetup] = useState([])
const [IsEditMode, setIsEditMode] = useState(false);
const [IsNewMode, setIisNewMode] = useState(false);
const [modalOpen, setModalOpen] = useState(false);
const [SaveDisableButton, setSaveDisableButton] = useState(true);
const [id, setID] = useState(0);
const [DocName, setDocName] = useState('');
const [Module, setModule] = useState('');
const [UlRes, setUlRes] = useState('');
const [SiteRes, setSiteRes] = useState('');
const [DocNoEdit, setDocNoEdit] = useState('');
const [TaxType, setTaxType] = useState('');
const [CollectionType, setCollectionType] = useState('');
const [OutputTax, setOutputTax] = useState('');
const [AllowPPE, setAllowPPE] = useState('');
const [AllowPoNo, setAllowPoNo] = useState('');
const [Status, setStatus] = useState('');
const [SaveButton, setSaveButton] = useState('Save');

const SaveRef = useRef(null);
const EditRef = useRef(null);
const NewRef = useRef(null);

const idRef = useRef(null);
const DocNameRef = useRef(null);
const ModuleRef = useRef(null);
const ULresRef = useRef(null);
const SiteResRef = useRef(null);
const DocNoEditResRef = useRef(null);
const TaxTypeRef = useRef(null);
const CollectionTypeRef = useRef(null);
const OutputTaxRef = useRef(null);
const AllowPoNoRef = useRef(null);
const AllowPPERef = useRef(null);
const StatusRef = useRef(null);
const ButtonRef = useRef(null);



useEffect(() => {
    // Make the API request when the component mounts
        axios.get('http://localhost:8000/api/Document-Setup')
      .then(response => {
        setDoctypeSetup(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const HandleNewClick = async () => {
    setModalOpen(true)
    setIisNewMode(true)
    setDocName('');
    setModule('CDB MODULE');
    setUlRes('0');
    setSiteRes('0');
    setDocNoEdit('0');
    setTaxType('Y');
    setCollectionType('Y');
    setOutputTax('Y');
    setAllowPoNo('Y');
    setAllowPPE('Y');
    setStatus('Y');
    setSaveButton('Save')
    setTimeout(() => {
        if (DocNameRef.current) {
            DocNameRef.current.focus();
        }
    }, 0);
  }



  const HandleSaveClick = async () => {
try {
    if (IsEditMode) {
        await axios.put('http://localhost:8000/api/Document-Setup', {
            id : parseInt(id),
           DocName: DocName,
           Module: Module,
           UlRes: UlRes,
           SiteRes: SiteRes,
           DocNoEdit: DocNoEdit,
           TaxType: TaxType,
           CollectionType: CollectionType,
           OutputTax:OutputTax,
           AllowPoNo: AllowPoNo,
           AllowPPE: AllowPPE,
           Status: Status,
           });
          
         Swal.fire({
           icon: 'success',
           title: 'Update!',
           text: 'Bank Details Successfully Updated.',
           showConfirmButton: false,
           timer: 3000  
         });
                     setTimeout(() => {
                       window.location.reload();
                     }, 3000);

                   setModalOpen(false)
                   setIsEditMode(false)
      
         } else  {

        await axios.post('http://localhost:8000/api/Document-Setup', {
            DocName: DocName,
            Module: Module,
            UlRes: UlRes,
            SiteRes: SiteRes,
            DocNoEdit: DocNoEdit,
            TaxType: TaxType,
            CollectionType: CollectionType,
            OutputTax:OutputTax,
            AllowPoNo: AllowPoNo,
            AllowPPE: AllowPPE,
            Status: Status,
           });
      
         Swal.fire({
           icon: 'success',
           title: 'Save!',
           text: 'Bank Details Successfully Added.',
           showConfirmButton: false,
           timer: 3000
         });

                     setTimeout(() => {
                       window.location.reload();
                     }, 3000);
         setModalOpen(false)
       }
       } catch (error) {
         console.error('Error saving data:', error);
       }
  };



  const HandleDeleteClick = async () => {}



  const HandleEditClick = async (data) => {
 
    setSaveButton('Update')
    setModalOpen(true)
    setIsEditMode(true)
    setID(data.id)
    setDocName(data.doc_type_name);
    setUlRes(data.ul_restriction);
    setSiteRes(data.site_restriction);
    setDocNoEdit(data.doc_no_edit_restriction);


    

    setTimeout(() => {
        if (DocNameRef.current) {
            DocNameRef.current.focus();
            SelectData(ModuleRef,data.module)
            // SelectData(TaxTypeRef, data.tax_type === 'Y' ? 'Yes' : 'No');
            // SelectData(CollectionTypeRef, data.collection_type === 'Y' ? 'Yes' : 'No');
            // SelectData(OutputTax, data.output_tax_item_type === 'Y' ? 'Yes' : 'No');
            // SelectData(AllowPoNoRef, data.allow_no_po === 'Y' ? 'Yes' : 'No');
            // SelectData(AllowPPERef, data.allow_ppe === 'Y' ? 'Yes' : 'No');
            // SelectData(StatusRef, data.active_status === 'Y' ? 'Active' : 'InActive');
            SelectData(TaxTypeRef, data.tax_type);
            SelectData(CollectionTypeRef, data.collection_type);
            SelectData(OutputTaxRef, data.output_tax_item_type);
            SelectData(AllowPoNoRef, data.allow_no_po);
            SelectData(AllowPPERef, data.allow_ppe);
            SelectData(StatusRef, data.active_status);
        }
    }, 0);

  }



  const SelectData = (refName, dataREf) => {
    if (refName && refName.current) {
        const selectElement = refName.current;
        selectElement.value = dataREf;
        const changeEvent = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(changeEvent);
    }
};


  const HandleCancelClick = async () => {
    setModalOpen(false)
    setIsEditMode(false)
    setIisNewMode(false)
  }

  const handleKeyDown = (event, currentRef, nextRef) => {
    
    if (event.key === 'Enter') {
      event.preventDefault();
      if (nextRef.current) {
        nextRef.current.focus();
      }
    }
};






return <section className="content">
<div className="card-container" >

    <div class="card">
    <div className='action-buttons DocSetup' style={{display:'flex',width:'100%'}}>
    <h3>Document Type Setup</h3>
    <button className='btn-tools btn-new' ref={NewRef}  onClick={HandleNewClick} ><i class="fas fa-plus"></i> New</button> &nbsp;
                                {/* <button className='btn-tools btn-save' ref={SaveRef} disabled={SaveDisableButton} onClick={HandleSaveClick}> <i class="fas fa-save" ></i> {isEditMode ? 'Update':'Save'}</button> &nbsp; */}
                                <button className='btn-tools btn-cancel' disabled={''} ><i className="fas fa-print"></i> Print</button> &nbsp;
    
    </div>
        <div class="card-header">
            <div className='Document-container'>
                                
                <table className='table table-data'>
                    <thead>
                        <tr>
                            <th>ID Code</th>
                            <th>Doc Name</th>
                            <th>Module</th>
                            <th>UL Restriction</th>
                            <th>Site Restriction</th>
                            <th>Doc No. Edit Restriction</th>
                            <th>Tax Type</th>
                            <th>Collection Type</th>
                            <th>Output Tax Type</th>
                            <th>Allow PO No.</th> 
                            <th>Allow PPE</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead> 
                    <tbody>
                    {DoctypeSetup.map(doc => (
                            <tr key={doc.id} >
                                <td>{doc.id.toString().padStart(4, '0')}</td>
                                <td>{doc.doc_type_name}</td>
                                <td>{doc.module}</td>
                                <td>{doc.ul_restriction}</td>
                                <td>{doc.site_restriction}</td>
                                <td>{doc.doc_no_edit_restriction}</td>
                                <td>{doc.tax_type}</td>
                                <td>{doc.collection_type}</td>
                                <td>{doc.output_tax_item_type}</td>
                                <td>{doc.allow_no_po}</td>
                                <td>{doc.allow_ppe}</td>
                                <td>
                                    {doc.active_status === 'Y' ? (
                                        <span>Active</span>
                                    ) : (
                                        <span>Inactive</span>
                                    )}
                                    </td>
                                    <td className='action-button'>
                                  <FontAwesomeIcon icon={faEdit} className='icon' onClick={() => HandleEditClick(doc)}/>
                                  <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={() => HandleDeleteClick(doc)}/>
                                </td>
                                </tr>
                                  ))}

                    </tbody>

                </table>
            </div>
                                    
        </div> 
    </div>


    {modalOpen && (
        
                <div className='modal' >
                    <div className='modalBank'>
                                <div className='modal-header'>
                                    <h3 className='modal-header-name'>Add Document Type Setup</h3>
                                </div>
                                <div className='modal-content' >
                                    <div className='Bank-content'>
                                        <div className='rows'>
                                                {/* <div className='form-group bank'>
                                                    <label htmlFor='act-type'>ID Code:</label>
                                                    <input type='text' className='text-input' defaultValue={id}    autoComplete='off'
                                                    onChange={(e) => setID(e.target.value)}/>
                                                </div> */}
                                                <div className='form-group bank'>
                                                    <label htmlFor='trans-type'>Docement Name:</label>
                                                    <input ref={DocNameRef}  onKeyDown={(e) => handleKeyDown(e, DocNameRef, ModuleRef)} type='text' className='text-input' defaultValue={DocName}
                                                        onChange={(e) => setDocName(e.target.value)}   autoComplete='off' />
                                                 
                                                </div>
                                                <div className='form-group bank'>
                                                    <label htmlFor='trans-type'>Module:</label>
                                                    <select  ref={ModuleRef} onKeyDown={(e) => handleKeyDown(e, ModuleRef, ULresRef)}  type='text' className='text-input'  defaultValue={Module}
                                                    onChange={(e) => setModule(e.target.value)}   autoComplete='off'>
                                                        <option value={'CDB MODULE'}>CDB MODULE</option>
                                                        <option value={'CRB MODULE'}>CRB MODULE</option>
                                                        <option value={'APB MODULE'}>APB MODULE</option>
                                                        <option value={'ARB MODULE'}>ARB MODULE</option>
                                                        <option value={'GJB MODULE'}>GJB MODULE</option>
                                                    </select>
                                                </div>
                                                <div className='form-group bank'>
                                                    <label htmlFor='trans-type'>UL Restriction:</label>
                                                    <input  ref={ULresRef} onKeyDown={(e) => handleKeyDown(e, ULresRef, SiteResRef)} type='text' className='text-input'   autoComplete='off'
                                                    onChange={(e) => setUlRes(e.target.value)} defaultValue={UlRes}/>
                                                </div>

                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Site Restriction:</label>
                                                <input  ref={SiteResRef} onKeyDown={(e) => handleKeyDown(e, SiteResRef, DocNoEditResRef)} type='text' className='text-input'  defaultValue={SiteRes}
                                                onChange={(e) => setSiteRes(e.target.value)}   autoComplete='off'/>
                                            </div>

                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Document No. Edit Restriction:</label>
                                                <select  ref={DocNoEditResRef} onKeyDown={(e) => handleKeyDown(e, DocNoEditResRef, TaxTypeRef)} type='text' className='text-input'  defaultValue={DocNoEdit}
                                                onChange={(e) => setDocNoEdit(e.target.value)}   autoComplete='off'>
                                                    <option value={'Y'}>Yes</option>
                                                    <option value={'N'}>No</option>
                                                </select>
                                            </div>
                                                                
                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Tax Type:</label>
                                                <select  ref={TaxTypeRef}  onKeyDown={(e) => handleKeyDown(e, TaxTypeRef, CollectionTypeRef)} type='text' className='text-input'  defaultValue={TaxType}
                                                onChange={(e) => setTaxType(e.target.value)}   autoComplete='off'>
                                                    <option value={'Y'}>Yes</option>
                                                    <option value={'N'}>No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='rows' style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
                                            
                            

                                            
                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Collection Type:</label>
                                                <select  ref={CollectionTypeRef} onKeyDown={(e) => handleKeyDown(e, CollectionTypeRef, OutputTaxRef)} type='text' className='text-input'  defaultValue={CollectionType}
                                                onChange={(e) => setCollectionType(e.target.value)}   autoComplete='off'>
                                                    <option value={'Y'}>Yes</option>
                                                    <option value={'N'}>No</option>
                                                </select>
                                            </div>

                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Output Tax:</label>
                                                <select  ref={OutputTaxRef} onKeyDown={(e) => handleKeyDown(e, OutputTaxRef, AllowPoNoRef)} type='text' className='text-input'  defaultValue={OutputTax}
                                                onChange={(e) => setOutputTax(e.target.value)}   autoComplete='off'>
                                                    <option value={'Y'}>Yes</option>
                                                    <option value={'N'}>No</option>
                                                </select>
                                            </div>

                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Allow Po No.:</label>
                                                <select  ref={AllowPoNoRef} onKeyDown={(e) => handleKeyDown(e, AllowPoNoRef, AllowPPERef)} type='text' className='text-input'  defaultValue={AllowPoNo}
                                                onChange={(e) => setAllowPoNo(e.target.value)}   autoComplete='off'>
                                                    <option value={'Y'}>Yes</option>
                                                    <option value={'N'}>No</option>
                                                </select>
                                            </div>

                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Allow PPE:</label>
                                                <select  ref={AllowPPERef} onKeyDown={(e) => handleKeyDown(e, AllowPPERef, StatusRef)} type='text' className='text-input'  defaultValue={AllowPPE}
                                                onChange={(e) => setAllowPPE(e.target.value)}   autoComplete='off'>
                                                    <option value={'Y'}>Yes</option>
                                                    <option value={'N'}>No</option>
                                                </select>
                                            </div>

                                            <div className='form-group bank'>
                                                <label htmlFor='trans-type'>Status:</label>
                                                <select  ref={StatusRef} onKeyDown={(e) => handleKeyDown(e, StatusRef, ButtonRef)}  type='text' className='text-input'  defaultValue={Status}
                                                onChange={(e) => setStatus(e.target.value)}> 
                                                    <option value={'Y'}>Active</option>
                                                    <option value={'N'}>InActive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal-btn'>
                                        <button className='btn modal-save-btn' ref={ButtonRef} onClick={HandleSaveClick}><FontAwesomeIcon icon={faSave}></FontAwesomeIcon>{ SaveButton}</button>
                                        <button className='btn modal-cancel-btn' onClick ={HandleCancelClick} style={{float:'right'}}> <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon>Cancel</button>
                                        
                                    </div>
                                </div>
                    </div>
                </div>
            )}

</div>
                        


    </section>
     }

 export default DocumentTypeSetupDetails

