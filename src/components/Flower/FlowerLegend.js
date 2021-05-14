import React from 'react'
import { isMobileWithTablet, isTabletC } from '../../constants';
import styles from './Flower.module.css';


const FlowerLegend = ({ title, selectedTime }) => {
  return (
    <div className={styles.FlowerLegend}
      style={{
        fontSize: isMobileWithTablet
          ? isTabletC
            ? '24px'
            : '14px'
          : '1.8vh'
      }}
    >
      <p className="ma0">
      {title} - {selectedTime}
      </p>
      <p className={styles.FlowerLegendDetails}>
        Length of the petal = data in the indicated years
      </p>
    </div>
  )
}

export default FlowerLegend
