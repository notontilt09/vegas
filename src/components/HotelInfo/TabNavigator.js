import React, { } from 'react';
import './HotelInfo.css';

const TabNavigator = props => {
  return (
    <div className="tab-navigator">
      <h3 
        onClick={() => props.switchTab('description')} 
        className={props.activeTab === 'description' ? 'description tab active' : 'description tab'}
      >
        <span>DESCRIPTION</span>
      </h3>
      <h3 
        onClick={() => props.switchTab('details')} 
        className={props.activeTab === 'details' ? 'details tab active' : 'details tab'}
      >
        <span>DETAILS</span>
      </h3>
      <h3 
        onClick={() => props.switchTab('location')} 
        className={props.activeTab === 'location' ? 'location tab active' : 'location tab'}
      >
        <span>LOCATION</span>
      </h3>
    </div>
  )
}

export default TabNavigator;