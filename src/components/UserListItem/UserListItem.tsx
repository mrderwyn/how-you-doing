import React from 'react';

import UserCard from '../UserCard/UserCard';

import styles from './UserListItem.module.css';

const UserListItem = ({ user, options }: any) => {
    return (
        <div className={styles.item}>
            <UserCard {...user} />
            {options}
        </div>
    );
};

export default UserListItem;