
import './css/UnitLocation.css'
import 'react-tabs/style/react-tabs.css';
import '../TaskPane/CSS/newIndex.css'
import '../TaskPane/CSS/index.css'
import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
const Modal = ({ isOpen, onClose,Action,Data }) => {
  const [ulCode, setUlCode] = useState('');
  const [unitDescription, setUnitDescription] = useState('');
  const [locationDescription, setLocationDescription] = useState('');


    const handleSave = async () => {
      try {
        
        //  await axios.post('http://localhost:8000/api/location', {
        //     ulCode: ulCode,
        //     unitDescription: unitDescription,
        //     locationDescription: locationDescription,
        // });
        if (Action === 'new') {
       await axios.post('http://localhost:8000/api/location', {
            ulCode: ulCode,
            unitDescription: unitDescription,
            locationDescription: locationDescription,
          });
         
        Swal.fire({
          icon: 'success',
          title: 'Save!',
          text: 'Unit Location Successfully Added.',
          showConfirmButton: false,
          timer: 3000  
        });
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
        onClose();
        } else if (Action === 'edit') {
          const ulCodeElement = document.getElementById('ulcode').value;
          const unitDescElement = document.getElementById('unitdesc').value;
          const locationDescElement = document.getElementById('locationdesc').value;
       await axios.put('http://localhost:8000/api/location', {
            ulCode: ulCodeElement,
            unitDescription: unitDescElement,
        locationDescription: locationDescElement,
          });
     
        Swal.fire({
          icon: 'success',
          title: 'Update!',
          text: 'Unit Location Successfully Update.',
          showConfirmButton: false,
          timer: 3000  // Display for 3 seconds
        });
                    // Reload the page after 3 seconds
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
        // Close the modal or perform any other necessary actions
        onClose();
      }
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };


    if (!isOpen) return null;

    return (
      <div className='modal'>
      <div className='modalAdd'>
          <div className='modal-header'>
              <h3 className='modal-header-name'>Unit Transaction</h3>
              
          </div>
          <div className='modal-content' >
              <div className='form-group'>
                  <label for='act-type'>UL Code:</label>
                  <input id='ulcode' type='text' className='text-input' defaultValue={ulCode} 
                   onChange={(e) => setUlCode(e.target.value)}/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Unit Description:</label>
                  <input id='unitdesc' type='text' className='text-input' defaultValue={unitDescription}
                    onChange={(e) => setUnitDescription(e.target.value,'unitdesc')}/>
              </div>
              <div className='form-group'>
                  <label for='trans-type'>Location Description:</label>
                  <input id='locationdesc' type='text' className='text-input'  defaultValue={locationDescription}
                   onChange={(e) => setLocationDescription(e.target.value)}/>
              </div>
              <div className='modal-btn'>
                  <button className='btn modal-save-btn' onClick={handleSave}>{Action === 'edit' ? 'Update' : 'Save'}</button>
                  <button className='btn modal-cancel-btn' onClick={onClose} style={{float:'right'}}>Cancel</button>
                
              </div>
          </div>
      </div>
  </div>
        //    <Modal onClose={closeModal}/>  
    );
  };
  



const UnitLocation = () => {
  const [modalMode, setModalMode] = useState('new')
    const [unitLocations, setUnitLocations] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [selectedData, setSelectedData] = useState(null);
    useEffect(() => {
        // Make the API request when the component mounts
        axios.get('http://localhost:8000/api/location')
          .then(response => {
            setUnitLocations(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);


      // const [selectedData, setSelectedData] = useState(null);

      const handleEditRowClick = (rowData) => {
        setSelectedData(rowData);
        setModalOpen(true)
        setModalMode('edit');
      };

      useEffect(() => {
        if (selectedData) {
          const ulCodeElement = document.getElementById('ulcode');
          const unitDescElement = document.getElementById('unitdesc');
          const locationDescElement = document.getElementById('locationdesc');
          localStorage.ULdelete = selectedData.ul_code;
          localStorage.unitdelete = selectedData.unit_description;
          if (ulCodeElement) ulCodeElement.value = selectedData.ul_code;
          if (unitDescElement) unitDescElement.value = selectedData.unit_description;
          if (locationDescElement) locationDescElement.value = selectedData.location_description;
        }
      }, [selectedData]);


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
          text: "Do you want to Delete this Location?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {

            const dataToDelete = {
              ulCode: localStorage.ULdelete,
              unitDescription: localStorage.unitdelete
            };
            try {
               await axios.delete('http://localhost:8000/api/location', {data:dataToDelete});
               Swal.fire({
                icon: 'success',
                title: 'Delete!',
                text: 'Unit Location Successfully Deleted.',
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
        setSelectedData(rowData);

      
      };
    
    return(<section className="content">
   <div className="card-container">
        <div class="card">
            <div class="card-header">
                <div className='location-container'>
                    <div className='top-container'>
                        <div className='form-group'>
                            <h3>Unit Location List</h3>
                        </div>
                        <div className='form-group' style={{width:"80px"}}>
                            <div className='icon'>
                            <FontAwesomeIcon  className="custom-icon" icon={faPlus} onClick={() => { openModal(); setModalMode('new'); }}  />
                        
                            </div>
                            <div className='icon'>
                            <FontAwesomeIcon className="custom-icon" icon={faPrint}/>
                            </div>
                        </div>
                    </div>  
               
                    <table className='table table-data'>
                    <thead>
                        <tr>
                            <th>UL Code</th>
                            <th>Unit Location</th>
                            <th>Location Description</th>
                            <th>Action</th>
                        </tr>
                    </thead> 
                    <tbody>
                    {unitLocations.map(unit => (
                            <tr key={unit.ul_code} >
                                <td style={{ textAlign: 'center' }}>{unit.ul_code}</td>
                                <td>{unit.unit_description}</td>
                                <td>{unit.location_description}</td>
                                <td className='action-button'>
                                  <FontAwesomeIcon icon={faEdit} className='icon' onClick={() => handleEditRowClick(unit)}/>
                                  <FontAwesomeIcon icon={faTrashAlt} className='icon delete' onClick={() => handleDelete(unit)}/>
                                </td>

                            </tr>

                         ))}
                       
                    </tbody>

                </table>
              </div>
                   
              </div> 
            </div>
      
        <Modal isOpen={modalOpen} onClose={closeModal}  Action={modalMode} Data={selectedData}/>  
   </div>
       

</section>
    )
}

export default UnitLocation;