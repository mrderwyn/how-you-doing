import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { isSelfProfileSelector } from '../../redux/selectors';
import { LightUserInfoType } from '../../types';

import UserListItem from '../UserListItem/UserListItem';

import styles from './UserList.module.css';

type UserListPropsType = {
    users: LightUserInfoType[],
    type?: 'follows' | 'followers' | 'all',
    creator: (user: LightUserInfoType) => ReactNode,
};

const generateEmptyText = (type: 'follows' | 'followers' | 'all', self: boolean) => {
    switch (type) {
        case 'follows':
            return self ? 'Start follow someone :)' : 'There is no follows';
        case 'followers':
            return self ? 'There is no followers' : 'You can be first :)';
        default:
            return 'If you are seeing this text, there is some strange things happening. Try to refresh page :)';
    }
}

const UserList = ({users, creator, type = 'all'}: UserListPropsType) => {
    const isSelf = useSelector(isSelfProfileSelector);

    return users?.length > 0
        ? (
            <div className={styles.container}>
                {users.map((user: any) => 
                    <UserListItem key={user.id} user={user} options={creator(user)} />
                )}
            </div>
        )
        : (
            <p>{generateEmptyText(type, isSelf)}</p>
        );
};

export default UserList;