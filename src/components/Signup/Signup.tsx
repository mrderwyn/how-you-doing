import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { createUser, hasUser } from '../../services/firebaseService';

import Button from '../Button/Button';

import { auth } from '../../firebase/firebase';

import styles from './Signup.module.css';

const Signup = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const idRef = useRef(id);
    idRef.current = id;

    const [email, setEmail] = useState('');
    const emailRef = useRef(email);
    emailRef.current = email;

    const [password, setPassword] = useState('');
    const passwordRef = useRef(password);
    passwordRef.current = password;

    const [idErr, setIdErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const onSubmit = async () => {
        if (idRef.current === '') {
            setIdErr('empty id');
            return;
        }
        else if (!/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(idRef.current)) {
            setIdErr('invalid id');
        }
        else {
            setIdErr('');
        }

        if (emailRef.current === '') {
            setEmailErr('incorrect email');
            return;
        }
        else {
            setEmailErr('');
        }

        if (passwordRef.current === '') {
            setPasswordErr('empty password');
            return;
        }
        else {
            setPasswordErr('');
        }

        if (await hasUser(idRef.current)) {
            setIdErr('id already taken');
            return;
        }

        await createUserWithEmailAndPassword(auth, emailRef.current, passwordRef.current)
            .then((userCredential) => {
                createUser(idRef.current, emailRef.current);
                navigate('/login');
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    setEmailErr('invalid email');
                    return;
                }

                if (error.code === 'auth/email-already-in-use') {
                    setEmailErr('email already in use');
                    return;
                }

                if (error.code === 'auth/weak-password') {
                    setPasswordErr('weak password');
                    return;
                }

                console.log(error.code, error.message);
            });
    };

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                        <p>Please Sign Up</p>
                        <form>
                            <div className={styles.formItem}>
                                <label hidden htmlFor='id'>User id</label>
                                <input
                                    className={styles.input} 
                                    type='text'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='Password' />
                                {passwordErr !== '' && <p className={styles.error}>{passwordErr}</p>}
                            </div>
                            <Button type='submit' action={onSubmit}>Sign up</Button>
                        </form>
                        <p>
                            Already have an account?{' '}
                            <NavLink to='/login'>Sign in</NavLink>
                        </p>
            </div>
        </main>
    );
};

export default Signup;