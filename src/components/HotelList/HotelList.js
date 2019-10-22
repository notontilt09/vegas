import React from 'react';
import './HotelList.css';

const HotelList = props => {
  
  const formatPrice = price => {
    let strPrice = price.toString();
    if (strPrice.includes('.')) {
      return `$${strPrice}`
    } else {
      return `$${strPrice}.00`
    }
  }

  return (
    <div className="hotel-list">
      {props.hotelList.map(hotel => (
        <div key={hotel.name} className="hotel-list-item">
          <h3 className="hotel-list-name">{hotel.name}</h3>
          <h3 className="hotel-list-price">{formatPrice(hotel.price)}</h3>
        </div>
      ))}
    </div>
  )
}

export default HotelList;