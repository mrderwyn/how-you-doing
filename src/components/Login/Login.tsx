import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase/firebase';
import MainIcon from './res/main-icon.png';
import styles from './Login.module.css';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const emailRef = useRef(email);
    emailRef.current = email;

    const [password, setPassword] = useState('');
    const passwordRef = useRef(password);
    passwordRef.current = password;

    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');


    const onLogin = () => {
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

        setLoading(true);
        signInWithEmailAndPassword(auth, emailRef.current, passwordRef.current)
            .then((userCredential) => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                if (error.code === 'auth/invalid-email') {
                    setEmailErr('invalid email');
                    return;
                }

                if (error.code === 'auth/wrong-password') {
                    setPasswordErr('wrong password');
                    return;
                }

                if (error.code === 'auth/user-not-found') {
                    setEmailErr('user not found');
                    return;
                }
            });
    };

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                    <img src={MainIcon} alt='' className={styles.icon} />
                    <header className={styles.header}>
                        How You Doing
                    </header>
                    <div className={styles.main}>
                        <p>Please Sign In</p>
                        <form>
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
                            { loading
                                ? <Loader />
                                : <Button type='submit' action={onLogin}>Sign in</Button>}
                        </form>
                        <p>
                            No account yet?{' '}
                            <NavLink to='/signup'>Sign up</NavLink>
                        </p>
                    </div>
            </div>
        </main>
    );
};

export default Login;