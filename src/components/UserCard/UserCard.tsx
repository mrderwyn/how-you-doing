import React from 'react';

import { NavLink } from 'react-router-dom';
import scroll from '../../helpers/scrollToTop';
import { LightUserInfoType } from '../../types';

import styles from './UserCard.module.css';

type UserCardPropsType = {
    id: string,
    avatar: string,
    name?: string,
    onlyName?: boolean,
};

const UserCard = ({ id, name, avatar, onlyName }: UserCardPropsType) => {
    const containInfo = name && id;
    
    return (
        <NavLink
            onClick={scroll}
            to={`/profile/${id}`}
            draggable='false'
            className={styles.link}>
            <div className={styles.card}>
                <img className={styles.avatar} src={avatar} alt='avatar' />
                {containInfo && (<div className={styles.info}>
                    <p className={styles.name}>{name}</p>
                   {!onlyName && <p className={styles.id}>{id}</p>}
                </div>)}
            </div>
        </NavLink>
    );
};

export default UserCard;