import React, { } from 'react';
import './HotelInfo.css';

const TabNavigator = props => {
  return (
    <div className="tab-navigator">
      <button 
        onClick={() => props.switchTab('description')} 
        className={props.activeTab === 'description' ? 'description tab active' : 'description tab'}
      >
        <h3>DESCRIPTION</h3>
      </button>
      <button
        onClick={() => props.switchTab('details')} 
        className={props.activeTab === 'details' ? 'details tab active' : 'details tab'}
      >
        <h3>DETAILS</h3>
      </button>
      <button 
        onClick={() => props.switchTab('location')} 
        className={props.activeTab === 'location' ? 'location tab active' : 'location tab'}
      >
        <h3>LOCATION</h3>
      </button>
    </div>
  )
}

export default TabNavigator;