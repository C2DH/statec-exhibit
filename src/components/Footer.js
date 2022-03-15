import React from 'react'
import Statec from './Logo/Statec'
import C2dhUnilu from './Logo/C2dhUnilu'


const Footer = ({ color='#fff', secondaryColor, className='', ...rest }) => {
  return (
    <div className={`Footer ${className}`} {...rest}>
      <Statec
        height={50}
        color={color}
        secondaryColor={secondaryColor}
        className="Footer_statec"
      />
      <C2dhUnilu
        height={70}
        color={color}
        className="Footer_unilu"
      />
    </div>
  )
}

export default Footer
