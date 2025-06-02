import  { Component } from 'react';
import DashboardHeader from './dashboard-header';
import DashboardNav from './dashboard-nav';
import DashboardResult from './dashboard-result';


class Result extends Component {
    render() {
        return (
            <div id="body" className="grid-container">
            <DashboardHeader></DashboardHeader>
            <DashboardNav></DashboardNav>
            <DashboardResult></DashboardResult>     
            </div>
        );
    }
}

export default Result;