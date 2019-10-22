import React from 'react'
import Icon from '../Icons/icons';

import './Header.css';

const Header = props => {
  return (
    <section className="header">
      <div className="icon-left">
        <Icon icon='left' />
      </div>
      <h3>SEE ALL LAS VEGAS HOTELS</h3>
    </section>
  )
}

export default Header;