import React from 'react'
import axios from 'axios';
import {useState, useRef, useEffect} from 'react';
import { getTransType, getActivityType } from '../JS/globalFunctions';
 
const ModalAddNew = ({closeModal, onselect, onSelectSL, tabVisible}) => {
    //GET ACTIVITY TYPE
    const [activityTypeValue,setactivityTypeValue] = useState('');
    const [transTypeValue,setTransTypeValue] = useState('');
    const [slTypeValue,setSLTypeValue] = useState('');
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    //REFRENCE
    const actTypeRef = useRef(null);
    const transTypeRef = useRef(null);
    const selectRef = useRef(null);
    const transTypeListRef = useRef(null);

    // //FOR DISPLAYING OF DATA
    // const [data, setData] = useState([]);

    //FOR SEARCH VISIBLE
    const [transTypeListVisible, setTransTypeListVisible] = useState(true);

    //FOR ARRAYS
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);


    

    // const handleFocus = () => {
    //     actTypeRef.current.focus();
    // }

    useEffect(() => {
        if (closeModal) {
            tabVisible(true)
          actTypeRef.current.focus();
        }
      }, [closeModal]);

     //GET THE VALUE OF ACTIVITY TYPE
     const handleChange = () => {
        
        };

    const loadTransType = () =>{
        const fetchData = async () => {
            try {
                const params = {cash_flow_cat:activityTypeValue, module_type:'CDB'};
                const result = await getTransType(params);
                setSearchResults(result);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    };

    //ARROW DOWN & UP TO NAVIGATE SELECTION
    useEffect(() => {
        if (selectedItemIndex) {
            selectedItemIndex.focus();
        }
      }, [selectedItemIndex]);


    const loadActivityType = () =>{
        const fetchData = async () => {
            try {
                const params = {module_type:'CDB'};
                const result = await getActivityType(params);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    };


     //GET TRANSACTION TYPE
     const handleTransType = () => {
        onselect(transTypeValue)
        tabVisible(false)
        onSelectSL(slTypeValue)
        closeModal(false)
    }

    const handleSearchInputChange = async (e) => {
        try {
            const params = {cash_flow_cat:activityTypeValue, module_type:'CDB',trans_type_description: e};
            const result = await getTransType(params);
            setSearchResults(result);
            setTransTypeListVisible(true)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleKeys = (event, inputIdentifier) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            if (inputIdentifier === 'transType') {
                const listItems = transTypeListRef.current.querySelectorAll('li');
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
        } else if (event.key === ' ') {
            if (inputIdentifier === 'actType') {
                loadActivityType();
            }
        } else if (event.key === 'Enter') {
            if (inputIdentifier === 'transType') {
                if (transTypeListVisible === true){
                    setTransTypeListVisible(false)
                    transTypeRef.current.focus();
                }else{
                    selectRef.current.focus();
                }
            } else if (inputIdentifier === 'actType') {
                transTypeRef.current.focus();
            }
        } else if (event.key === 'Escape') {
            if (transTypeListVisible === true) {
                setTransTypeListVisible(false)
            } else {
                closeModal(false)
            }
        }
    }
   
     

    return(
        <div className='modal'>
            <div className='modalAdd'>
                <div className='modal-header'>
                    <span className='modal-header-name'>Select Type of Transactions</span>
                    <span onClick={() => {closeModal(false)}} class="modal-close-btn">&times;</span>
                </div>
                <div className='modal-content' >
                    <div className='form-group'>
                        <label for='act-type'>Activity Type:</label>
                            <select id='prepared-by' ref={actTypeRef} className='select' onClick={() => loadActivityType()} onKeyDown={(event) => handleKeys(event,'actType')} onChange={(e) => setactivityTypeValue(e.target.value)}>
                                <option value='' selected hidden>Select Activity Type</option>
                                {data.map((item) => (
                                <option value={item.trans_type_cash_flow_category}> {item.trans_type_description} </option>
                                 ))}
                            </select>
                    </div>
                    <div className='form-group'>
                        <label for='trans-type'>Transaction Type:</label>
                            {/* <select id='prepared-by' ref={transTypeRef} className='select' onKeyDown={(event) => handleKeys(event,'transType')} onClick={handleChange} onChange={(e) => setTransType(e.target.value)}>
                            <option value='' selected hidden>Select Transaction Type</option>
                            {data.map((item) => (
                                <option value={item.cf_desc}>
                                    {item.cf_desc}
                                </option>
                            ))}
                        </select> */}
                        
                        <input className='text-input' ref={transTypeRef} type='text' id='transType' value={transTypeValue} onInput={(e) => handleSearchInputChange(e.target.value)} onKeyDown={(event) => handleKeys(event,'transType')} onChange={(e) => setTransTypeValue(e.target.value)} autoComplete="off"></input>
                            {transTypeListVisible && (
                            <ul id="list" className='ul-list transtype'   ref={transTypeListRef}>
                                {searchResults.map((result,index) => (
                                    <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''} onKeyDown={(event) => handleKeys(event,'transType')} onKeyDownCapture={() => setTransTypeValue(result.trans_type_description)}  onKeyUp={() => setSLTypeValue(result.sl_type)}>{result.trans_type_description}</li>
                                ))}
                            </ul>
                             )}
                    </div>
                    <div className='modal-btn'>
                        <button className='btn modal-cancel-btn' onClick={() => {closeModal(false)}}>Cancel</button>
                        <button className='btn modal-select-btn' ref={selectRef} onClick={handleTransType}>Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddNew;

