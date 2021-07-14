import React from 'react';
import { Router, Route } from 'react-router-dom';

import App from './App';
import About from './components/about';
import Home from './components/Home';
import AllPresentStudent from './components/AllPresentStudent';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import QRCode from './components/QRCode';
import Fees from './components/fees';
import UnpaidFee from './components/unpaidfee';
import EditFees from'./components/editfee';
import FCPSSupervisor from './components/fcpsSupervisor';
import CurrentPGs from './components/reports/currentPgs';
import CurrentSupervisor from './components/reports/currentSupervisor';
import SupervisorWiseTotal from './components/reports/supervisor_wise_total';
import NoPresentStudent from './components/no_present';
import YearWiseReport from './components/reports/year_wise_report';

import customBrowserHistory from 'history/createBrowserHistory';
let customHistory = customBrowserHistory();

const CustomRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path="/" component={App}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/presentstudent" component={AllPresentStudent}></Route>
            <Route path="/addmbbs" component={AddStudent}></Route>
            <Route path="/editstudent/:id" component={EditStudent}></Route>
            <Route path="/qrcode" component={QRCode}></Route>
            <Route path="/fees" component={Fees}></Route>
            <Route path="/unpaidfee" component={UnpaidFee}></Route>
            <Route path="/editfee/:sid/:feeid" component={EditFees}></Route>
            <Route path="/fcps_supervisor" component={FCPSSupervisor}></Route>
            <Route path="/current_pgs" component={CurrentPGs}></Route>
            <Route path="/current_supervisors" component={CurrentSupervisor}></Route>
            <Route path="/supervisor_wise_total" component={SupervisorWiseTotal}></Route>
            <Route path="/nopresent" component={NoPresentStudent}></Route>
            <Route path="/yearwise_report" component={YearWiseReport}></Route>
        </div>
    </Router>
)

export default CustomRoutes;
