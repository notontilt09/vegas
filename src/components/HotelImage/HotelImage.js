import React from 'react'
import './HotelImage.css';

const HotelImage = props => {
  return (
    <img className="hotel-img" src={props.hotel.media[0].href} alt={props.hotel.name} />
  )
}

export default HotelImage;