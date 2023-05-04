import React from 'react';

import UserListItem from '../UserListItem/UserListItem';

import styles from './UserList.module.css';

const UserList = ({users, creator}: any) => {

    return users?.length > 0
        ? (
            <div className={styles.container}>
                {users.map((user: any) => 
                    <UserListItem key={user.id} user={user} options={creator(user.id)} />
                )}
            </div>
        )
        : (
            <p>You can be the first :)</p>
        );
};

export default UserList;