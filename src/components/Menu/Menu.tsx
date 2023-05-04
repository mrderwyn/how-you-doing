import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selfSelector } from '../../redux/selectors';

import UserCard from '../UserCard/UserCard';

import styles from './Menu.module.css';

const Menu = () => {
    const self = useSelector(selfSelector);

    return (
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
            <a href="#">
                <p className={styles.item}>
                    Notifications
                </p>
            </a>
            <a href="#">
                <p className={styles.item}>
                    Settings
                </p>
            </a>
            <a href="#">
                <p className={styles.item}>
                    Log Out
                </p>
            </a>
        </nav>
    );
};

export default Menu;