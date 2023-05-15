import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { selfSelector } from '../../redux/selectors';

import UserCard from '../UserCard/UserCard';

import styles from './Menu.module.css';
//import { setSelf } from '../../redux/mainSlice';
import NotificationButton from '../NotificationButton/NotificationButton';
import { logOut } from '../../redux/slices/selfSlice/slice';

const Menu = () => {
    const self = useSelector(selfSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {
                dispatch(logOut({}));
                navigate('/');
            })
            .catch((error) => {
                console.log('something wrong', error);
            });
    }

    return self === null ? (
        <></>
    )
    : (
        <nav className={styles.menu}>
            <div className={styles.item}>
                <UserCard {...self} /> 
            </div>
            <NavLink to='/' draggable='false'>
                <p className={styles.item}>
                    Feed
                </p>
            </NavLink>
            <NavLink to={`/peoples/${self.id}`} draggable='false'>
                <p className={styles.item}>
                    Peoples
                </p>
            </NavLink>
            <NavLink to={`/notifications`} draggable='false'>
                <div className={styles.item}>
                    <NotificationButton />
                </div>
            </NavLink>
            <NavLink to='/edit' draggable='false'>
                <p className={styles.item}>
                    Edit
                </p>
            </NavLink>
            <a href="#" onClick={handleLogOut}>
                <p className={styles.item}>
                    Log Out
                </p>
            </a>
        </nav>
    );
};

export default Menu;