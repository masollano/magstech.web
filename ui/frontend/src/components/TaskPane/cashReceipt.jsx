import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './CSS/newIndex.css';

const CashReceipt = () => {
    return <section className="content">
        <div className="container-fluid">
            {/* <!-- Default box --> */}
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Cash Receipt</h3>
                        
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body" style={{display: 'block'}}>
                    Welcome to your cash receipt module <strong>@ViewBag.UserName</strong>!
                </div>
                {/* <!-- /.card-body --> */}
                <div class="card-footer" style={{display: 'block'}}>
                    
                </div>
                {/* <!-- /.card-footer--> */}
            </div>
            {/* <!-- /.card --> */}
        </div>

        <div className="container-fluid">
            <div class="card">
                <div class="card-header ">
                    {/* <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                            <li class="nav-item-tab">
                                <a class="nav-link-tab active" id="custom-tabs-one-history-tab" data-toggle="pill" href="#custom-tabs-one-history" role="tab" aria-controls="custom-tabs-one-history" aria-selected="true">List</a>
                            </li>
                            <li class="nav-item-tab">
                                <a class="nav-link-tab" id="custom-tabs-one-details-tab" data-toggle="pill" href="#custom-tabs-one-details" role="tab" aria-controls="custom-tabs-one-details" aria-selected="false">Details</a>
                            </li>
                        </ul> */}
                    
                </div>

                <div class="card-body">
                    <Tabs>
                        <TabList>
                            <Tab>List</Tab>
                            <Tab>Details</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Transaction History</h2><br/>
                            <span className='filter-range'>Date Range: 06/01/2023 to 06/30/2023</span>
                            <div className='action-buttons'>
                                <button className='btn-tools btn-new'><i class="fas fa-plus"></i> New</button> &nbsp;
                                <button className='btn-tools btn-filter'><i class="fas fa-filter"></i> Filter</button> &nbsp;
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
                                                <th className='theader'>OR No.</th>
                                                <th className='theader' width='20%'>Payor</th>
                                                <th className='theader' width='30%'>Address</th>
                                                <th className='theader'>Amount</th>
                                                <th className='theader'>Status</th>
                                                <th className='theader'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td valign="top" colspan="11" class="dataTables_empty">No data available in the table</td>
                                        </tbody>
                                        <tfoot>
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
                            </div>
                        </TabPanel>

                        <TabPanel>
                            
                            
                            <div className='container-fluid'>
                                <div className='card'>
                                    <div className='card-header'>
                                    <span>Details</span>
                                        <div className='action-buttons'>
                                            <button className='btn-tools btn-cancel'><i class="fas fa-ban"></i> Cancel</button> &nbsp;
                                            <button className='btn-tools btn-review'><i class="fas fa-book-open"></i> Review</button> &nbsp;
                                            <button className='btn-tools btn-approve'><i class="fas fa-check-double"></i> Approve</button> &nbsp;
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                       <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <label for='payor'>Payor</label>
                                                    <input className='text-input' type='text' id='payee'></input>
                                                </div>
                                                <div className='form-group'>
                                                    <label for='address'>Address</label>
                                                    <textarea className='textarea-input' type='text' id='address' rows='4'></textarea>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='row'>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label for='doc-type'>Doc. Type</label>
                                                            <select id='doc-type' className='select'>
                                                                <option value='' selected hidden>Select Doc. Type</option>
                                                                <option value='ar'>AR</option>
                                                                <option value='or'>OR</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <div className='form-group'>
                                                            <label for='doc-no'>Doc. No.</label>
                                                            <input className='text-input' type='text' id='or-no'></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className='form-group'>
                                                        <label for='date'>Date</label>
                                                        <input className='text-input ui-datepicker' type='text' id='date' data-provide='datepicker'></input>
                                                    </div>
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                    <div className='card-footer'>

                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

                <div class="card-footer">
                        
                </div>
            </div>
        </div>
    </section>

    


}
    


export default CashReceipt;

<script src="./js/daterangepicker.js"></script>


