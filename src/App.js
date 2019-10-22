import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import Header from './components/Header/Header';
import HotelImage from './components/HotelImage/HotelImage';
import HotelList from './components/HotelList/HotelList';
import HotelInfo from './components/HotelInfo/HotelInfo';

// css
import './App.css';


const App = () => {
  const [hotelList, setHotelList] = useState([]);
  const [hotelInfo, setHotelInfo] = useState(null);

  // hotel data from the API contains duplicates, they need to be removed and the list should be sorted alphbetically
  const filterDuplicatesAndSort = hotelList => {
    // list of hotel names already added to the noDuplicates list
    const seenHotels = [];
    // list of hotel objects without duplicates
    const noDuplicates = [];
    // iterate through hotelList with duplicates, add then add each hotel object to noDuplicates if we haven't already seen that hotel's name
    for (let i = 0; i < hotelList.length; i++) {
      if (!seenHotels.includes(hotelList[i].name)) {
        seenHotels.push(hotelList[i].name);
        noDuplicates.push(hotelList[i]);
      }
    }
    // sort noDuplicates alphabetically
    return noDuplicates.sort((a, b) => (b.name.toUpperCase() < a.name.toUpperCase()) ? 1 : -1);
  }

  // on mount, fetch necessary data from the API server
  // this could be made dynamic to fetch data for the selected hotel when the user clicks on a hotel in the list
  // for this exercise, we only care about rendering venetian data.
  useEffect(() => {
    axios.get('http://localhost:8888/api/hotels/venetian')
      .then(res => {
        setHotelInfo(res.data);
      })
      .catch(err => console.log(err));
    
    axios.get('http://localhost:8888/api/hotels/')
      .then(res => {
        // update Hotel
        setHotelList(filterDuplicatesAndSort(res.data.list))
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <section className="left-section">
        <Header />
        {hotelInfo &&
          <HotelImage hotel={hotelInfo} />
        }
        <HotelList hotelList={hotelList} />
      </section>
      <section className="right-section">
        <HotelInfo hotel={hotelInfo} />
      </section>
    </div>
  )
}

export default App;
