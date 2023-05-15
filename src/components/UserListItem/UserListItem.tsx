import React, { ReactNode } from 'react';
import { LightUserInfoType } from '../../types';

import UserCard from '../UserCard/UserCard';

import styles from './UserListItem.module.css';

type UserListItemPropsType = {
    user: LightUserInfoType,
    options: ReactNode,
}

const UserListItem = ({ user, options }: UserListItemPropsType) => {
    return (
        <div className={styles.item}>
            <UserCard {...user} />
            {options}
        </div>
    );
};

export default UserListItem;