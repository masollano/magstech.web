import React, { useState, useRef, useEffect } from 'react';
import { searchData} from '../JS/globalFunctions';
import axios from 'axios';


const ApplicationOfPayment = ({ onSelect, closeAppPayment, doneAppPayment }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [accountTitleListVisible, setAccountTitleListVisible] = useState(true);
  const accountTitleListRef = useRef(null);
  const [accountTitleResults, setAccountTitleResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [accountTitleValue, setAccountTitleValue] = useState('');
  const [accountCodeValue, setAccountCodeValue] = useState('');
  const [slTypeValue, setSLTypeValue] = useState('');

  const [checkboxes, setCheckboxes] = useState([]);
  const [selectedCellValue, setSelectedCellValue] = useState('');

  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);
  const accountTitleRef = useRef(null);
  const loadRef = useRef(null);
  const selectRef = useRef(null);

  const [checkedAmount, setCheckedAmount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [groupedSelectedRows, setGroupedSelectedRows] = useState([]);


  // SET FOCUS ON ACCOUNT TITLE
  useEffect(() => {
    if (closeAppPayment) {
      accountTitleRef.current.focus();
    }
  }, [closeAppPayment]);



  //  SEARCHING FOR ACCOUNT TITLE
  const handleSearchInputChange = async (e) => {
    try {
      const endpoint = 'api/taskpane/searchAccountTitle'; 
      const params = {str: e };
      const result = await searchData(endpoint, params);
        if (result) {
          setAccountTitleResults(result);
          setAccountTitleListVisible(true);
        }
    } catch (error) {
      console.error(error);
    }
  };



  //PHP API FOR GENERATION OF DATA
  const handleGenerateData = () => {
    const LoadData = async () => {
        try {
          if (startDate !== '' && endDate !== '' && accountCodeValue !=='' && slTypeValue !== '') {
            const endpoint = 'api/taskpane/applicationPayment'; 
            const params = {
              acc_code: accountCodeValue, sl_type:slTypeValue, payeeID:window.payeeID, startDate:startDate, endDate:endDate 
              };
            const result = await searchData(endpoint, params);
            if (result) {
              setSearchResults(result);
            }
          }
        } catch (error) {
        console.error(error);
        }
    };
    LoadData()
  };



  // Handle checkbox change
  const handleCheckboxChange = (event, id, amt) => {
    const { name, checked, value } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    
    if (checked) {
      setSearchResults((prevData) =>
      prevData.map((row) => {
        if (row.autonum === id) {
          return { ...row, app_payment: amt };
        }
        return row;
      })
    );
      sumTotal(value);
    } else {
      setSearchResults((prevData) =>
      prevData.map((row) => {
        if (row.autonum === id) {
          return { ...row, app_payment: 0 };
        }
        return row;
      })
    );
      deductTotal(value);
    }
    
  };



  // SUM TOTAL AMOUNT
  const [totalAmount, setTotalAmount] = useState(0);
  const sumTotal = (amount) => {
    const num = parseFloat(amount);
    const sum = totalAmount + num;
    setTotalAmount(sum);
  }



  // DEDUCT TOTAL AMOUNT
  const deductTotal = (amount) => {
    const num = parseFloat(amount);
    const diff = totalAmount - num;
    setTotalAmount(diff);
  }

  //  // Function to retrieve the selected cell value
  //  const getSelectedCellValue = () => {
  //   const selectedCellId = Object.keys(checkboxes).find((key) => checkboxes[key]);
  //   if (selectedCellId) {
  //     const cellIdParts = selectedCellId.split('-');
  //     const selectedItemId = parseInt(cellIdParts[1]);
  //     const selectedItem = searchResults.find((item) => item.autonum === selectedItemId);
  //     if (selectedItem) {
  //       setSelectedCellValue(selectedItem.credit_amount);
  //     }
  //   }
  // };


  //SELECTION OF ROWS
  const handleRowSelect = (item) => {
    const isSelected = !!selectedRows.find((selectedItem) => selectedItem.autonum === item.autonum);

    if (isSelected) {
      // If the row is already selected, remove it from the selectedRows array
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((selectedItem) => selectedItem.autonum !== item.autonum));
    } else {
      // If the row is not selected, add it to the selectedRows array
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, item]);
    }
  }


  //GROUPED SELECTED DATA
  const groupAndSumData = (dataArray) => {
    const groupedData = {};
    dataArray.forEach((item) => {
      const { autonum, doc_ref, ul_code, accCode, acctTitle, slName, debit, credit, trans_date } = item;
      if (!groupedData[accCode]) {
        groupedData[accCode] = [];
      }
      const existingItem = groupedData[accCode].find((groupedItem) => groupedItem.slName === slName);
      if (existingItem) {
        let num1 = 0, num2 = 0, tnum = '';
        num1 = parseFloat(debit);
        num2 = parseFloat(existingItem.debit);
        tnum = num1 + num2;
        existingItem.debit = tnum.toString();
      } else {
        groupedData[accCode].push({ autonum, doc_ref, ul_code, accCode, acctTitle, slName, debit, credit, trans_date});
      }
    });
    return groupedData;
  };


// TRANSFER DATA FROM MODAL TO MAIN FORM
  const handleSelect = () => {
    // const groupedData = groupAndSumData(selectedRows);
    onSelect(selectedRows);
    handleClose();
  };



  // CLOSE MODAL
  const handleClose = () => {
    closeAppPayment(false);
    doneAppPayment(true)
  };


// SET FOCUS ON SELECTED ITEM
  useEffect(() => {
    if (selectedItemIndex) {
        selectedItemIndex.focus();
    }
  }, [selectedItemIndex]);



// ************************* KEY EVENTS ***************************
// ****************************************************************
  const handleKeys = (event, inputIdentifier) => {
    if (event.key === 'Enter') {
      if (inputIdentifier === 'accountTitle') {
        if (accountTitleListVisible === true) {
          setAccountTitleListVisible(false);
          dateFromRef.current.focus();
        } else {
          dateFromRef.current.focus();
        }
      } else if (inputIdentifier === 'dateFrom') {
          dateToRef.current.focus();
      } else if (inputIdentifier === 'dateTo') {
          loadRef.current.focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();

        if (inputIdentifier === 'accountTitle') {
          const listItems = accountTitleListRef.current.querySelectorAll('li');
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
    }
  }

  function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }








  return (
    <div className='modal'>
        <div className='modalAppPayment'>
            <div className='modal-header'>
                <span className='modal-header-name'>Application of Payment</span>
                <span onClick={handleClose} class="modal-close-btn">&times;</span>
            </div>
            <div className='modal-content' >
              <div className='row'>
                <div className='col-md-12'>
                    <div className='form-group'>
                        <label for='drawee-bank'>Account Title</label>
                        <input className='text-input' ref={accountTitleRef} type='text' id='accountTitle'  onKeyDown={(event) => handleKeys(event, 'accountTitle')} onInput={(e) => handleSearchInputChange(e.target.value)} value={accountTitleValue} onChange={(e) => setAccountTitleValue(e.target.value)}   autoComplete="off"></input>
                          {accountTitleListVisible && (
                              <ul id="list" className='ul-list appPayment-acctTitle' onKeyDown={(event) => handleKeys(event, 'accountTitle')}  ref={accountTitleListRef}>
                                  {accountTitleResults.map((result,index) => (
                                    <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''} onKeyUp={() => setSLTypeValue(result.sl_type)} onKeyDown={() => setAccountTitleValue(result.acct_description)} onKeyDownCapture={() => setAccountCodeValue(result.acct_title_code)}>{result.acct_description}</li>
                                  ))}
                              </ul>
                            )}
                      </div>
                  </div>
              </div>
              <div className='row'>
                
                <div className='col-md-6'>
                  <div className='form-group'>
                      <label for='start-date'>Date From:</label>
                      <input className='text-input' ref={dateFromRef} onKeyDown={(event) => handleKeys(event, 'dateFrom')}
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      />
                  </div>
                
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label for='end-date'>Date To:</label>
                      <input className='text-input' ref={dateToRef} onKeyDown={(event) => handleKeys(event, 'dateTo')}
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='datatable' style={{overflow:'auto', width:'100%', padding:'10px 10px 10px 10px'}}>
                  <table id='EntryTable' className='table table-data' role='grid'>
                    <thead>
                      <tr>
                      <th className='theader' hidden>UL</th>
                        <th className='theader' hidden>Account Code</th>
                        <th className='theader' hidden>Account Title</th>
                        <th className='theader' hidden>SL Account</th>
                        <th className='theader'>Doc. Ref.</th>
                        <th className='theader'>Date</th>
                        <th className='theader'>Amount</th>
                        <th className='theader' style={{width:'60px'}}>Application of Payment</th>
                        <th className='theader'>check</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.length > 0 ? (
                        searchResults.map((d,i) => (
                            <tr key={d.autonum}>
                                  <td hidden>{d.ul}</td>
                                  <td hidden>{d.accCode}</td>
                                  <td hidden>{d.acctTitle}</td>
                                  <td hidden>{d.slName}</td>
                                  <td>{d.doc_ref}</td>
                                  <td>{formatDate(d.trans_date)}</td>
                                  <td>{d.debit}</td>
                                  <td style={{alignItems:'center', width:'60px'}}>
                                    <input className='text-input' type='text' style={{textAlign:'right'}} name={`checkbox-${d.autonum}`} value={d.app_payment} onInput={(e) => sumTotal(e.target.value)}/>
                                  </td>
                                  <td style={{textAlign:'center'}}>
                                    <input className='checkbox' type='checkbox' value={d.debit} name={`checkbox-${d.autonum}`} checked={!!checkboxes[`checkbox-${d.autonum}`]} onChange={(event) => handleCheckboxChange(event, d.autonum, d.debit)} onClick={() => handleRowSelect(d)}/>
                                  </td>
                            </tr>
                          ))
                        ) : (
                          <td valign="top" colspan="5" class="dataTables_empty">No data available in the table</td>
                        )}
                    </tbody>
                    <tfoot>
                      <th className='tfooter' hidden></th>
                      <th className='tfooter' hidden></th>
                      <th className='tfooter' hidden></th>
                      <th className='tfooter' hidden></th>
                      <th className='tfooter'></th>
                      <th className='tfooter'></th>
                      <th className='tfooter'>Total</th>
                      <th className='tfooter' style={{textAlign:'right',width:'60px'}}>{totalAmount.toFixed(2)}</th>
                      <th className='tfooter' style={{textAlign:'right'}}></th>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
                <button className='btn btn-cancel'  onClick={handleClose}>Cancel</button>
                <button className='btn btn-filter' ref={loadRef} onClick={handleGenerateData}>Load</button>
                <button className='btn btn-filter' ref={selectRef} onClick={handleSelect}>Select</button>
            </div>
        </div>
    </div>
  );
};

export default ApplicationOfPayment;