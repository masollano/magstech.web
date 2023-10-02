import React, { useState } from 'react';

const FilterByDateRange = ({ onFilter,closeFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    // Pass the selected date range to the parent component
    onFilter(startDate, endDate);
    handleClose();
  };

  const handleClose = () => {
    closeFilter(false);
  };

  return (
    <div className='modal'>
        <div className='modalFilter'>
            <div className='modal-header'>
                <span className='modal-header-name'>Filter</span>
                <span onClick={handleClose} class="modal-close-btn">&times;</span>
            </div>
            <div className='modal-content' >
                <div className='form-group'>
                    <label for='start-date'>Date From:</label>
                    <input className='text-input'
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label for='end-date'>Date To:</label>
                    <input className='text-input'
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className='modal-footer'>
                <button className='btn btn-cancel' onClick={handleClose}>Cancel</button>
                <button className='btn btn-filter' onClick={handleFilter}>Filter</button>
            </div>
        </div>
    </div>
  );
};

export default FilterByDateRange;