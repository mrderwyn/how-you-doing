import React, { useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { createUser, hasUser } from '../../services/firebaseService'

import Button from '../Button/Button'

import { auth } from '../../firebase/firebase'

import MainIcon from './res/main-icon.png'
import styles from './Signup.module.css'
import Loader from '../Loader/Loader'
import { handleErrorCode } from '../../utils/handleErrorCode'
import { defaultUsernameValidator, notEmptyStringCheck } from '../../utils/validators'

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [id, setId] = useState('')
  const idRef = useRef(id)
  idRef.current = id

  const [email, setEmail] = useState('')
  const emailRef = useRef(email)
  emailRef.current = email

  const [password, setPassword] = useState('')
  const passwordRef = useRef(password)
  passwordRef.current = password

  const [idErr, setIdErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  const onSubmit = async () => {
    let canSubmit = true

    if (!defaultUsernameValidator(idRef.current)) {
      setIdErr('invalid id')
      canSubmit = false
    } else if (await hasUser(idRef.current)) {
      setIdErr('id already taken')
      canSubmit = false
    } else {
      setIdErr('')
    }

    if (!notEmptyStringCheck(emailRef.current)) {
      setEmailErr('incorrect email')
      canSubmit = false
    } else {
      setEmailErr('')
    }

    if (!notEmptyStringCheck(passwordRef.current)) {
      setPasswordErr('incorrect password')
      canSubmit = false
    } else {
      setPasswordErr('')
    }

    if (!canSubmit) {
      return
    }

    setLoading(true)
    await createUserWithEmailAndPassword(auth, emailRef.current, passwordRef.current)
      .then(async (userCredential) => {
        return await createUser(idRef.current, emailRef.current)
      })
      .then((result) => {
        setLoading(false)
        if (result) {
          navigate('/')
        }
      })
      .catch((error) => {
        setLoading(false)
        handleErrorCode(error.code, setEmailErr, setPasswordErr)
      })
  }

  return (
        <main className={styles.container}>
            <div className={styles.content}>
                <img src={MainIcon} alt='' className={styles.icon} />
                <header className={styles.header}>
                    How You Doing
                </header>
                <div className={styles.main}>
                        <p>Please Sign Up</p>
                        <form>
                            <div className={styles.formItem}>
                                <label hidden htmlFor='id'>User id</label>
                                <input
                                    className={styles.input}
                                    type='text'
                                    value={id}
                                    onChange={(e) => { setId(e.target.value) }}
                                    required
                                    placeholder='User id' />
                                {idErr !== '' && <p className={styles.error}>{idErr}</p>}
                            </div>
                            <div className={styles.formItem}>
                                <label hidden htmlFor='email-address'>Email address</label>
                                <input
                                    className={styles.input}
                                    type='email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    required
                                    placeholder='Email address' />
                                {emailErr !== '' && <p className={styles.error}>{emailErr}</p>}
                            </div>
                            <div className={styles.formItem}>
                                <label hidden htmlFor='password'>Password</label>
                                <input
                                    className={styles.input}
                                    type='password'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required
                                    placeholder='Password' />
                                {passwordErr !== '' && <p className={styles.error}>{passwordErr}</p>}
                            </div>
                            { loading
                              ? <Loader />
                              : <Button type='submit' action={onSubmit}>Sign up</Button>}
                        </form>
                        <p>
                            Already have an account?{' '}
                            <NavLink to='/login'>Sign in</NavLink>
                        </p>
                </div>
            </div>
        </main>
  )
}

export default Signup
