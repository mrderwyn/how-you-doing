import React from 'react'

import styles from './Loader.module.css'

const Loader: React.FC = () => {
  return (
        <div className={styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
  )
}

export default Loader
