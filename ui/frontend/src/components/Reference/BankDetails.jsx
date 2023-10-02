

import 'react-tabs/style/react-tabs.css';
import '../TaskPane/CSS/newIndex.css'
import '../TaskPane/CSS/index.css'
import './css/BankDetails.css'
import React, { useEffect ,useRef,useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";



const BankDetails = () => {
    const [listBankDetails, setBankDetails] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [SaveButton, setSaveButton] = useState('Save');
    const [bankId_Code, setBankIdCode] = useState('');
    const [BankName, setBankName] = useState('');
    const [BankBranch, setBankBranch] = useState('');

    const [bankAbbre, setbankAbbre] = useState('');
    const [sl_IDCode, setsl_IDCode] = useState(0);
    const [Sl_Account, setSl_Account] = useState('');
    const [Acct_title, setAcct_title] = useState('');
    const [acct_type, setacct_type] = useState('');
    const [acct_purpose, setAcct_purpose] = useState('');
    const [Status, setStatus] = useState('Y');
    const [IsEditMode, setIsEditMode] = useState(false);
    const [latestBankId, setlatestBankId] = useState('');



    const BankNameRef = useRef(null);
    const BankBrancRef = useRef(null);
    const  BankAbrreRef= useRef(null);
    const SLRef = useRef(null);
    const AcctTitleRef = useRef(null);
    const AcctTypeRef = useRef(null);
    const AcctPurposeRef = useRef(null);
    const StatusRef = useRef(null);
    const ButtonRef = useRef(null);
    const containerRef = useRef(null)


    useEffect(() => {
        // Make the API request when the component mounts
        axios.get('http://localhost:8000/api/bank-details')
          .then(response => {
            setBankDetails(response.data.all_banks);
            setlatestBankId(response.data.latest_bank.id_code)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);



      const handleSave = async () => {
        try {
          
          if (IsEditMode) {
         await axios.put('http://localhost:8000/api/bank-details', {
            bank_code: bankId_Code,
            Bank_Name: BankName,
            Bank_Branch: BankBranch,
            Bank_Abbre: bankAbbre,
            sl_code: sl_IDCode,
            sl_account: Sl_Account,
            Acct_title: Acct_title,
            acct_type: acct_type,
            acct_purpose: acct_purpose,
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


         await axios.post('http://localhost:8000/api/bank-details', {
            bank_code: bankId_Code,
            Bank_Name: BankName,
            Bank_Branch: BankBranch,
            Bank_Abbre: bankAbbre,
            sl_code: sl_IDCode,
            sl_account: Sl_Account,
            Acct_title: Acct_title,
            acct_type: acct_type,
            acct_purpose: acct_purpose,
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
  
      const handleEditRowClick = (rowData) => {

        setModalOpen(true)
        setSaveButton('Update')
        setIsEditMode(true)

            localStorage.Bankdelete = rowData.id_code;
            setBankIdCode((rowData.id_code).toString().padStart(4, '0'));
            setBankName(rowData.bank_name);
            setBankBranch(rowData.bank_branch);
            setbankAbbre(rowData.bank_abbreviation);
            setSl_Account(rowData.sl_account);
            setacct_type(rowData.acct_type);
            setAcct_purpose(rowData.acct_purpose);
            setStatus(rowData.active_status);
            setAcct_title(rowData.acct_title);
      ;
          
      };

      const handleNewClick = (rowData) => {
        setModalOpen(true)
        setSaveButton('Save')
        setBankIdCode((parseInt(latestBankId) + 1).toString().padStart(4, '0'));
        setBankName('');
        setBankBranch('');
        setbankAbbre('');
        setSl_Account('');
        setacct_type('');
        setAcct_purpose('');
        setStatus('Y');
        setAcct_title('');
       
   
      };
      const handleCancelClick = (rowData) => {
        setModalOpen(false)
      };

      const handleDelete = async (rowData) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },  
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Confirmation',
          text: "Do you want to Delete this Bank details?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {

            const dataToDelete = {
              bank_code: localStorage.Bankdelete,

            };
            try {
               await axios.delete('http://localhost:8000/api/bank-details', {data:dataToDelete});
               Swal.fire({
                icon: 'success',
                title: 'Delete!',
                text: 'Bank Details Successfully Deleted.',
                showConfirmButton: false,
                timer: 3000  // Display for 3 seconds
              });
            
              // Reload the page after 3 seconds
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              // Close the modal or perform any other necessary actions
            } catch (error) {
              console.error('Error saving data:', error);
            }


          }})
      };

      const handleKeyDown = (event, currentRef, nextRef) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (nextRef.current) {
            nextRef.current.focus();
          }
        }
};
    
    return(<section className="content">
   <div className="card-container" ref={containerRef} >
        <div class="card">
            <div class="card-header">
                <div className='Bank-container'>
                    <div className='top-container'>
                        <div className='form-group'>
                            <h3>Bank Details</h3>
                        </div>
                        <div className='form-group' style={{width:"80px"}}>
                            <div className='icon'>
                            <FontAwesomeIcon  className="custom-icon" icon={faPlus} onClick={handleNewClick}  />
                        
                            </div>
                            <div className='icon'>
                            <FontAwesomeIcon className="custom-icon" icon={faPrint}/>
                            </div>
                        </div>
                    </div>  
               
                    <table className='table table-data'>
                    <thead>
                        <tr>
                            <th>ID Code</th>
                            <th>Bank Name</th>
                            <th>Bank Branch</th>
                            <th>Bank Abbreviation</th>
                            <th>Subsidiary Account</th>
                            <th>Account Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead> 
                    <tbody>
                    {listBankDetails.map(bank => (
                            <tr key={bank.id_code} >
                                <td style={{ textAlign: 'center' }}>{bank.id_code.toString().padStart(4, '0')}</td>
                                <td>{bank.bank_name}</td>
                                <td>{bank.bank_branch}</td>
                                <td>{bank.bank_abbreviation}</td>
                                <td>{bank.sl_account}</td>
                                <td>{bank.acct_title}</td>
                                <td>
                                    {bank.active_status === 'Y' ? (
                                        <span>Active</span>
                                    ) : (
                                        <span>Inactive</span>
                                    )}
                                    </td>
                                
                                <td className='action-button'>
                                  <FontAwesomeIcon icon={faEdit} className='icon' onClick={() => handleEditRowClick(bank)}/>
                                  <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={() => handleDelete(bank)}/>
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
                                    <h3 className='modal-header-name'>Add Bank Details</h3>
                                    
                                </div>
                                <div className='modal-content' >
                                    <div className='Bank-content'>
                                        <div className='rows'>
                                                <div className='form-group bank'>
                                                    <label for='act-type'>ID Code:</label>
                                                    <input id='ulcode' type='text' className='text-input' defaultValue={bankId_Code}    autoComplete='off'
                                                    onChange={(e) => setBankIdCode(e.target.value)}/>
                                                </div>
                                                <div className='form-group bank'>
                                                    <label for='trans-type'>Bank Name:</label>
                                                    <input ref={BankNameRef}  onKeyDown={(e) => handleKeyDown(e, BankNameRef, BankBrancRef)} type='text' className='text-input' defaultValue={BankName}
                                                        onChange={(e) => setBankName(e.target.value,'unitdesc')}   autoComplete='off' />
                                                </div>
                                                <div className='form-group bank'>
                                                    <label for='trans-type'>Bank Branch:</label>
                                                    <input  ref={BankBrancRef} onKeyDown={(e) => handleKeyDown(e, BankBrancRef, BankAbrreRef)}  type='text' className='text-input'  defaultValue={BankBranch}
                                                    onChange={(e) => setBankBranch(e.target.value)}   autoComplete='off'/>
                                                </div>
                                                <div className='form-group bank'>
                                                    <label for='trans-type'>Bank Abbreviation:</label>
                                                    <textarea  ref={BankAbrreRef} onKeyDown={(e) => handleKeyDown(e, BankAbrreRef, SLRef)} type='text' className='text-input' 
                                                    style={{height:'100px'}}   autoComplete='off'
                                                    onChange={(e) => setbankAbbre(e.target.value)}>{bankAbbre}</textarea>
                                                </div>
                                        </div>
                                        <div className='rows'>
                                            <div className='form-group bank'>
                                                <label for='trans-type'>Subsidiary Account:</label>
                                                <input  ref={SLRef} onKeyDown={(e) => handleKeyDown(e, SLRef, AcctTitleRef)} type='text' className='text-input'  defaultValue={Sl_Account}
                                                onChange={(e) => setSl_Account(e.target.value)}   autoComplete='off'/>
                                            </div>

                                            <div className='form-group bank'>
                                                <label for='trans-type'>Account Title:</label>
                                                <input  ref={AcctTitleRef} onKeyDown={(e) => handleKeyDown(e, AcctTitleRef, AcctTypeRef)} type='text' className='text-input'  defaultValue={Acct_title}
                                                onChange={(e) => setAcct_title(e.target.value)}   autoComplete='off'/>
                                            </div>
                                            
                                            <div className='form-group bank'>
                                                <label for='trans-type'>Account Type:</label>
                                                <input  ref={AcctTypeRef}  onKeyDown={(e) => handleKeyDown(e, AcctTypeRef, AcctPurposeRef)} type='text' className='text-input'  defaultValue={acct_type}
                                                onChange={(e) => setacct_type(e.target.value)}   autoComplete='off'/>
                                            </div>

                                            
                                            <div className='form-group bank'>
                                                <label for='trans-type'>Account Purpose:</label>
                                                <input  ref={AcctPurposeRef} onKeyDown={(e) => handleKeyDown(e, AcctPurposeRef, StatusRef)} type='text' className='text-input'  defaultValue={acct_purpose}
                                                onChange={(e) => setAcct_purpose(e.target.value)}   autoComplete='off'/>
                                            </div>
                                            <div className='form-group bank'>
                                                <label for='trans-type'>Status:</label>
                                                <select  ref={StatusRef} onKeyDown={(e) => handleKeyDown(e, StatusRef, ButtonRef)}  type='text' className='text-input'  defaultValue={Status}
                                                onChange={(e) => setStatus(e.target.value)}> 
                                                    <option value={'Y'}>Active</option>
                                                    <option value={'N'}>InActive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal-btn'>
                                        <button className='btn modal-save-btn' ref={ButtonRef} onClick={handleSave}>{SaveButton}</button>
                                        <button className='btn modal-cancel-btn' onClick ={handleCancelClick} style={{float:'right'}}>Cancel</button>
                                        
                                    </div>
                                </div>
                    </div>
                </div>
            )}
   </div>
       

</section>


    )
}

export default BankDetails;