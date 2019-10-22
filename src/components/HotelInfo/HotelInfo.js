import React, { useState, useRef } from 'react'
import TabNavigator from './TabNavigator.js'
import Icon from '../Icons/icons';
import './HotelInfo.css';

const HotelInfo = props => {
  // state hooks
  const [activeTab, setActiveTab] = useState('description');
  const [expanded, setExpanded] = useState(false);
  // ref for scrolling to map on screen with small viewport height
  const myRef = useRef(null);

  
  // generate the correct amount of stars to display based on the hotel passed down via props
  // could update this to fill them in based on half stars, but seems beyond the spec
  const renderStarRating = () => {
    // screenshot shows 5 stars for Venetian, rounding the 4.5 star rating up.  Could render half stars if need be.
    const numStars = Math.ceil(props.hotel.starRating);
    // map over an array the length of numStars and render a star Icon for each index
    return (
      Array(numStars).fill(null).map((star, index) => (
        <Icon key={index} icon='star' />
      ))
    )
  }
  
  // toggle description/details collapsible section
  const toggleExpanded = () => {
    setExpanded(!expanded);
  }
  
  // switch displayed tab
  const switchTab = tabName => {
    // if we switch tabs, collpase the section
    if (tabName !== activeTab) {
      setExpanded(false);
    }
    setActiveTab(tabName);
  }
  
  // scroll to a specific point in the page
  const scrollToRef = ref => {
    window.scrollTo({
      left: 0, 
      top: ref.current.offsetTop, 
      behavior: 'smooth'
    })
  }

  // scroll to the map
  const scrollToMap = async () => {
    await setActiveTab('location');
    scrollToRef(myRef);
  }
      
  if (props.hotel) {
    return (
      <>
        <section className="hotel-basic-info">
          <div className="hotel-basic-left">
            <div className="hotel-name-rating">
              <h1>{props.hotel.name.toUpperCase()}</h1>
              <div className="stars">{renderStarRating()}</div>
            </div>
            <div className="hotel-map-phone">
              <div onClick={scrollToMap} className="strip">
                <div className="icon-mark">
                  <Icon icon='mark' />
                </div>
                <h4>{props.hotel.location.areaName}</h4>
              </div>
              <div className="phone">
                <Icon icon='phone' />
                <h4>{props.hotel.phoneNumber}</h4>
              </div>
              <div className="guarantee">
                <Icon icon='like' />
                <h4>Best Price Guarantee</h4>
              </div>
            </div>
          </div>
          <div className="hotel-basic-right">
            <h2>{`$${props.hotel.price}`}</h2>
            <h3>HOTEL ROOMS FROM</h3>
          </div>
        </section>
        <TabNavigator activeTab={activeTab} switchTab={switchTab}/>
        <section className="hotel-text-info">
          {activeTab === 'description' &&
            <>
              <div className={expanded ? "description-text-expanded" : "description-text"}>
                {/* splitting the description on newline to get a list of paragraphs to render
                    hacky fix to get the first paragraphs width a bit smaller than the rest to match the screenshot */}
                {props.hotel.description.split('\n').filter(item => item.length > 1).map((paragraph, index) => (
                  <p className={index === 0 ? 'first' : null} key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="toggle-description">
                <h3 className="show-hide" onClick={toggleExpanded}>{expanded ? 'HIDE FULL DESCRIPTION' : 'SHOW FULL DESCRIPTION'}</h3>
                {expanded ? <Icon icon='up' /> : <Icon icon='down' />}
              </div>
            </>
          }
          {activeTab === 'details' &&
            <>
              <div className={expanded ? "details-text-expanded" : "details-text"}>
                {props.hotel.details.map(detail => (
                  <div key={detail.label} className="hotel-detail">
                    <h4 className="detail-title">{`${detail.label}:`}</h4>
                    <p className="detail-value">{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className="toggle-details">
                <h3 className="show-hide" onClick={toggleExpanded}>{expanded ? 'VIEW FEWER DETAILS' : 'VIEW MORE DETAILS'}</h3>
                {expanded ? <Icon icon='up' /> : <Icon icon='down' />}
              </div>
            </>
          }
          {activeTab === 'location' &&
            <>
              <div ref={myRef} className='location-text'>
                <div className="location-info">
                  <Icon icon='mark-big' />
                  <h3>{`${props.hotel.location.address}, ${props.hotel.location.city}, ${props.hotel.location.state} ${props.hotel.location.postalCode}`}</h3>  
                </div>              
              </div>
              <div className='map'>
                <img src={props.hotel.media[1].href} alt='google map' />
              </div>
            </>
          }
        </section>
    </>
  )
  } else {
    return 'Loading Hotel Data'
  }
}

export default HotelInfo;