import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

import styles from './NotFound.module.css'
import searchIcon from './res/purple-search.png'

interface NotFoundPropsType {
  text: string
}

const NotFound: React.FC<NotFoundPropsType> = ({ text }: NotFoundPropsType) => {
  const navigate = useNavigate()
  const backToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img className={styles.icon} src={searchIcon} alt='Search' />
                <h1 className={styles.header}>Whoops</h1>
                <p className={styles.text}>{text}</p>
                <Button action={backToHome} main>Back to home</Button>
            </div>
        </div>
  )
}

export default NotFound
