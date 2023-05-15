import React, { ReactNode } from 'react';
import { LightUserInfoType } from '../../types';

import UserListItem from '../UserListItem/UserListItem';

import styles from './UserList.module.css';

type UserListPropsType = {
    users: LightUserInfoType[],
    creator: (user: LightUserInfoType) => ReactNode,
};

const UserList = ({users, creator}: UserListPropsType) => {

    return users?.length > 0
        ? (
            <div className={styles.container}>
                {users.map((user: any) => 
                    <UserListItem key={user.id} user={user} options={creator(user)} />
                )}
            </div>
        )
        : (
            <p>You can be the first :)</p>
        );
};

export default UserList;