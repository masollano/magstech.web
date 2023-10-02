
import './css/ChartofAccounts.css'
import 'react-tabs/style/react-tabs.css';
import '../TaskPane/CSS/newIndex.css'
import '../TaskPane/CSS/index.css'
import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons'




const ModalElement = ({ isOpen, onClose, data }) => {
    //  const [locationDescription, setLocationDescription] = useState(data.location_description);

    const handleSave = async () => {
      try {
        await axios.post('/api/save-location', {
          ulCode: document.getElementById('ulcode'),
          unitDescription: document.getElementById('unitdesc'),
          loationDescription: document.getElementById('locationdesc'),
        //   locationDescription
        });
        // Close the modal or perform any other necessary actions
        onClose();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    if (!isOpen) return null;
  
    return (
      <div className='modal'>
      <div className='modalAdd'>
          <div className='modal-header'>
              <h3 className='modal-header-name'>Add New Primary Account</h3>
              
          </div>
          <div className='modal-content' >
              <div className='form-group'>
                  <label for='act-type'>Primary Code:</label>
                  <input id='ElementPrimaryCode' type='text' className='text-input' value=''/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Account Title:</label>
                  <input id='ElementAcctTitle' type='text' className='text-input'  value=""/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Account Description:</label>
                  <textarea id='ElementAcctDesc' type='text' className='text-input'  value="" style={{resize:'none'}}></textarea>
              </div>
              <div className='modal-btn'>
                  <button className='btn modal-save-btn' onClick={handleSave}>Save</button>
                  <button className='btn modal-cancel-btn' onClick={onClose} style={{float:'right'}}>Cancel</button>
                
              </div>
          </div>
      </div>
  </div>
    );
  };

  const ModalClass = ({ isOpen, onClose, data }) => {
    //  const [locationDescription, setLocationDescription] = useState(data.location_description);

    const handleSave = async () => {
      try {
        await axios.post('/api/save-location', {
          ulCode: document.getElementById('ulcode'),
          unitDescription: document.getElementById('unitdesc'),
          loationDescription: document.getElementById('locationdesc'),
        //   locationDescription
        });
        // Close the modal or perform any other necessary actions
        onClose();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    if (!isOpen) return null;
  
    return (
      <div className='modal'>
      <div className='modalAdd'>
          <div className='modal-header'>
              <h3 className='modal-header-name'>Add Secondary Account</h3>
              
          </div>
          <div className='modal-content' >
              <div className='form-group'>
                  <label for='act-type'>Primary Code:</label>
                  <input id='ClassPrimaryCode' type='text' className='text-input' value=""/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Secondary Code:</label>
                  <input id='ClassSecondaryCode' type='text' className='text-input'  value=""/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Account Title:</label>
                  <input id='ClassAcctTitle' type='text' className='text-input'  value=""/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Account Description:</label>
                  <textarea id='ClassAcctDesc' type='text' className='text-input'></textarea>
              </div>
              <div className='modal-btn'>
                  <button className='btn modal-save-btn' onClick={handleSave}>Save</button>
                  <button className='btn modal-cancel-btn' onClick={onClose} style={{float:'right'}}>Cancel</button>
                
              </div>
          </div>
      </div>
  </div>
        //    <Modal onClose={closeModal}/>  
    );
  };

  const ModalAggre = ({ isOpen, onClose, data }) => {
    //  const [locationDescription, setLocationDescription] = useState(data.location_description);

    const handleSave = async () => {
      try {
        await axios.post('/api/save-location', {
          ulCode: document.getElementById('ulcode'),
          unitDescription: document.getElementById('unitdesc'),
          loationDescription: document.getElementById('locationdesc'),
        //   locationDescription
        });
        // Close the modal or perform any other necessary actions
        onClose();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    if (!isOpen) return null;
  
    return (
      <div className='modal'>
      <div className='modalAdd'>
          <div className='modal-header'>
              <h3 className='modal-header-name'>Add New Account Title</h3>
              
          </div>
          <div className='modal-content2' >
    
                <div className='row2' style={{width : '25%'}}>
                               <div className='form-group'>
                        <label for='act-type'>Primary Code:</label>
                        <input id='ulcode' type='text' className='text-input' value="" autoComplete='off'/>
                    </div>
                    <div className='form-group'>
                        <label for='trans-type'>Secondary Code:</label>
                        <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                    </div>
                    <div className='form-group'>
                        <label for='trans-type'>Account Code:</label>
                        <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                    </div>
                </div>
       
                <div className='row2' style={{width: '75%'}}>
                    <div className='form-group'>
                        <label for='trans-type'>Account Title:</label>
                        <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                    </div>
                    <div className='form-group'>
                        <label for='trans-type'>Account Description:</label>
                        <textarea id='unitdesc' type='text' className='text-input' style={{resize:'none' ,height:'95px'}} autoComplete='off'></textarea>
                    </div>
              </div>

             
          </div>
          <div className='modal-btn'>
                  <button className='btn modal-save-btn' onClick={handleSave}>Save</button>
                  <button className='btn modal-cancel-btn' onClick={onClose} style={{float:'right'}}>Cancel</button>
              </div>
      </div>
  </div>
        //    <Modal onClose={closeModal}/>  
    );
  };


  const ModalDetails = ({ isOpen, onClose, data }) => {
    //  const [locationDescription, setLocationDescription] = useState(data.location_description);

    const handleSave = async () => {
      try {
        await axios.post('/api/save-location', {
          ulCode: document.getElementById('ulcode'),
          unitDescription: document.getElementById('unitdesc'),
          loationDescription: document.getElementById('locationdesc'),
        //   locationDescription
        });
        // Close the modal or perform any other necessary actions
        onClose();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    if (!isOpen) return null;
  
    return (
        <div className='modal'>
        <div className='modalAdd'>
            <div className='modal-header'>
                <h3 className='modal-header-name'>Add New Subsidiary Account Title</h3>
                
            </div>
            <div className='modal-content2' >
      
                  <div className='row2' style={{width : '25%'}}>
                                 <div className='form-group'>
                          <label for='act-type'>Primary Code:</label>
                          <input id='ulcode' type='text' className='text-input' value="" autoComplete='off'/>
                      </div>
                      <div className='form-group'>
                          <label for='trans-type'>Secondary Code:</label>
                          <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                      </div>
                      <div className='form-group'>
                          <label for='trans-type'>Account Code:</label>
                          <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                      </div>
                      <div className='form-group'>
                          <label for='trans-type'>Subsidiary Code:</label>
                          <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                      </div>
                  </div>
         
                  <div className='row2' style={{width: '75%'}}>
                      <div className='form-group'>
                          <label for='trans-type'>Account Title:</label>
                          <input id='unitdesc' type='text' className='text-input'  value="" autoComplete='off'/>
                      </div>
                      <div className='form-group'>
                          <label for='trans-type'>Account Description:</label>
                          <textarea id='unitdesc' type='text' className='text-input' style={{resize:'none' ,height:'95px'}} autoComplete='off'></textarea>
                      </div>
                      <div className='form-group'>
                        
                        <div className='form-content'>
                            <div className='row3' style={{width:'70%'}}>
                                    <label>Subsidiary Ledger</label>
                                    <div className='row3' style={{display:'flex',border:'1px solid #dee2e6'}} >
                                    <label>Yes:</label>
                                    <input type='checkbox' className='text-input' style={{height:'20px'}}/>
                                    <label>No:</label>
                                    <input type='checkbox' className='text-input' style={{height:'20px'}}/>
                                    </div>
                                  
                            </div>
                            <div className='row3' >
                                 <label for='trans-type' style={{textAlign:'center',width:'100%'}}>Account Description:</label>
                                <select id='unitdesc' type='text' className='text-input' autoComplete='off'>
                                    <option value={'C'}>Customer</option>
                                    <option value={'S'}>Supplier</option>
                                    <option value={'E'}>Employee</option>
                                    <option value={'PPE'}>Property & Equipment</option>
                                    <option value={'A'}>Affiliate</option>
                                    <option value={'B'}>Bank</option>
                                    <option value={'CT'}>Consultant</option>
                                   
                                </select>
                            </div>
                           
                        </div>
                           
                      </div>
                </div>
  
               
            </div>
            <div className='modal-btn-cat'>
                    <button className='btn modal-save-btn' onClick={handleSave}>Select Cat</button>
                    <button className='btn modal-cancel-btn' onClick={handleSave} style={{float:'right'}}>View Cat</button>
                    <div className='diactivate' style={{float:'left'}}>
                    <label>Deactivate</label>
                    <input className='text-input' type='checkbox' onClick={handleSave} style={{height:'15px'}}/>
                    </div>
                   

            </div>
            <div className='modal-btn'>
                    <button className='btn modal-save-btn' onClick={handleSave}>Save</button>
                    <button className='btn modal-cancel-btn' onClick={onClose} style={{float:'right'}}>Cancel</button>
            </div>
        </div>
    </div>
        //    <Modal onClose={closeModal}/>  
    );
  };

const ChartofAccounts = () => {


    const [unitLocations, setUnitLocations] = useState([]);
    useEffect(() => {
        // Make the API request when the component mounts
        axios.get('http://localhost:8000/api/location/')
          .then(response => {
            setUnitLocations(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);



// -------------------ELEMENT ---------------------------
      const [modalElementOpen, setModalElementOpen] = useState(false);
      const openElementModal = () => setModalElementOpen(true);
      const closeModalElement = () => setModalElementOpen(false);
      const [selectedDataElement, setSelectedDataElement] = useState(null);
      const handleRowClickElement = (rowData) => {
        setModalElementOpen(true)
        setSelectedDataElement(rowData);
      };

// -------------------AGGREGATE ---------------------------
      const [modalAggreOpen, setModalAggreOpen] = useState(false);
      const openAggreModal = () => setModalAggreOpen(true);
      const closeModalAggre = () => setModalAggreOpen(false);
      const [selectedDataAggre, setSelectedDataAggre] = useState(null);
      const handleRowClickAggre = (rowData) => {
        setModalAggreOpen(true)
        setSelectedDataAggre(rowData);
      };



// -------------------CLASSIFICATION ---------------------------
const [modalClassOpen, setModalClassOpen] = useState(false);
const openClassModal = () => setModalClassOpen(true);
const closeModalClass = () => setModalClassOpen(false);
const [selectedDataClass, setSelectedDataClass] = useState(null);
const handleRowClickClass = (rowData) => {
  setModalClassOpen(true)
  setSelectedDataClass(rowData);
};

// -------------------DETAILS ---------------------------
const [modalDetailOpen, setModalDetailOpen] = useState(false);
const openDetailModal = () => setModalDetailOpen(true);
const closeModalDetail = () => setModalDetailOpen(false);
const [selectedDataDetail, setSelectedDataDetail] = useState(null);
const handleRowClickDetail = (rowData) => {
  setModalDetailOpen(true)
  setSelectedDataDetail(rowData);
};



  return <section className="content">
    {/* <Fragment> */}
       <div className="card-container">
        <div class="card">
            <div class="card-header">
                <h3>Chart of Accounts</h3>
                <div className='row'>
        {/* ------------------------ 1st Cascade ------------------------ */}
                    <div className='Cascade-container'>
                            <div className='top-container'>
                                <div className='form-group'>
                                    <h3>Account Elements</h3>
                                </div>
                                <div className='form-group' style={{width:"80px"}}>
                                    <div className='icon'>
                                    <FontAwesomeIcon  className="custom-icon" icon={faPlus} onClick={openElementModal} />
                                
                                    </div>
                                    <div className='icon'>
                                    <FontAwesomeIcon className="custom-icon" icon={faPrint}/>
                                    </div>
                                </div>
                            </div>  
                    
                            <table className='table table-data'>
                            <thead>
                                <tr>
                                    <th>Account Code</th>
                                    <th>Account Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead> 
                            <tbody>
                            {unitLocations.map(unit => (
                                    <tr key={unit.ul_code} onClick={() => handleRowClickElement(unit)}>
                                        <td style={{ textAlign: 'center' }}>{unit.ul_code}</td>
                                        <td>{unit.unit_description}</td>
                                        <td className='action-button'>
                                        <FontAwesomeIcon icon={faEdit} className='icon' onClick={''}/>
                                        <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={''}/>
                                        </td>

                                    </tr>

                                ))}
                            
                            </tbody>

                        </table>
                    </div>
                        

        {/* ------------------------ 2nd Cascade ------------------------ */}
                    <div className='Cascade-container'>
                            <div className='top-container'>
                                <div className='form-group'>
                                    <h3>Account Classification</h3>
                                </div>
                                <div className='form-group' style={{width:"80px"}}>
                                    <div className='icon'>
                                    <FontAwesomeIcon  className="custom-icon" icon={faPlus} onClick={openClassModal} />
                                
                                    </div>
                                    <div className='icon'>
                                    <FontAwesomeIcon className="custom-icon" icon={faPrint}/>
                                    </div>
                                </div>
                            </div>  
                    
                            <table className='table table-data'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Account Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead> 
                            <tbody>
                            {unitLocations.map(unit => (
                                    <tr key={unit.ul_code} onClick={() => handleRowClickClass(unit)}>
                                        <td style={{ textAlign: 'center' }}>{unit.ul_code}</td>
                                        <td>{unit.unit_description}</td>
                                        <td className='action-button'>
                                        <FontAwesomeIcon icon={faEdit} className='icon' onClick={''}/>
                                        <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={''}/>
                                        </td>

                                    </tr>

                                ))}
                            
                            </tbody>

                             </table>
                    </div>
                </div> 


 {/* ------------------------ 3rd Cascade ------------------------ */}
                <div className='row'>
                    <div className='Cascade-container'>
                        <div className='top-container'>
                            <div className='form-group'>
                                <h3>Account Aggregate</h3>
                            </div>
                            <div className='form-group' style={{width:"80px"}}>
                                <div className='icon'>
                                <FontAwesomeIcon  className="custom-icon" icon={faPlus} onClick={openAggreModal} />
                            
                                </div>
                                <div className='icon'>
                                <FontAwesomeIcon className="custom-icon" icon={faPrint}/>
                                </div>
                            </div>
                        </div>  
                
                        <table className='table table-data'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Account Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead> 
                            <tbody>
                            {unitLocations.map(unit => (
                                    <tr key={unit.ul_code} onClick={() => handleRowClickAggre(unit)}>
                                        <td style={{ textAlign: 'center' }}>{unit.ul_code}</td>
                                        <td>{unit.unit_description}</td>
                                        <td className='action-button'>
                                        <FontAwesomeIcon icon={faEdit} className='icon' onClick={''}/>
                                        <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={''}/>
                                        </td>

                                    </tr>

                                ))}
                            
                            </tbody>

                             </table>
                    </div>
                   

 {/* ------------------------ 4rth Cascade ------------------------ */}
                    <div className='Cascade-container'>
                    <div className='top-container'>
                        <div className='form-group'>
                            <h3>Account Details</h3>
                        </div>
                        <div className='form-group' style={{width:"80px"}}>
                            <div className='icon'>
                            <FontAwesomeIcon  className="custom-icon" icon={faPlus} onClick={openDetailModal} />
                        
                            </div>
                            <div className='icon'>
                            <FontAwesomeIcon className="custom-icon" icon={faPrint}/>
                            </div>
                        </div>
                    </div>  
               
                    <table className='table table-data'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Account Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead> 
                            <tbody>
                            {unitLocations.map(unit => (
                                    <tr key={unit.ul_code} onClick={() => handleRowClickDetail(unit)}>
                                        <td style={{ textAlign: 'center' }}>{unit.ul_code}</td>
                                        <td>{unit.unit_description}</td>
                                        <td className='action-button'>
                                        <FontAwesomeIcon icon={faEdit} className='icon' onClick={''}/>
                                        <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={''}/>
                                        </td>

                                    </tr>

                                ))}
                            
                            </tbody>

                             </table>
                    </div>
                </div> 
            </div>
      
        <ModalElement isOpen={modalElementOpen} onClose={closeModalElement} data={selectedDataElement} />  
        <ModalClass isOpen={modalClassOpen} onClose={closeModalClass} data={selectedDataClass} />  
        <ModalAggre isOpen={modalAggreOpen} onClose={closeModalAggre} data={selectedDataAggre} />  
        <ModalDetails isOpen={modalDetailOpen} onClose={closeModalDetail} data={selectedDataDetail} />  
   </div>
   </div>
   {/* </Fragment> */}

  </section>
}
export default ChartofAccounts;