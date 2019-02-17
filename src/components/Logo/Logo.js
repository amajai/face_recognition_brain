import  React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
  return(
   <div className="ma4 mt0">
    <Tilt className="Tilt btn-grad br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
      <div className="Tilt-inner pa3">
        <img style={{paddingTop: '7px'}} src={brain} alt="logo"/>
      </div>
    </Tilt>
   </div>
  )
}

export default Logo