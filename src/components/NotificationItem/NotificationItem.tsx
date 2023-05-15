import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationType } from '../../types';
import TimeAgo from '../TimeAgo/TimeAgo';
import UserCard from '../UserCard/UserCard';

import styles from './NotificationItem.module.css';

const descByType = (type: string) => {
    switch (type) {
        case 'newpost':
            return 'create a new post. take a look';
        case 'newfollow':
            return 'is now following you !';
        case 'unfollow':
            return 'stop following you :(';
        case 'newcomment':
            return 'comment your post. take a look';
        default:
            return 'whoops. something wrong';
    }
}

type NotificationItemPropsType = {
    item: NotificationType
};

const NotificationItem = ({ item }: NotificationItemPropsType) => {
    const desc = descByType(item.type);
    const descElement = item.target !== null
        ? <NavLink to={item.target} draggable='false' className={styles.link}>
            <p className={styles.description}>{desc}</p>
        </NavLink>
        : <p className={styles.description}>{desc}</p>;

    return (
        <NavLink to={item.target ?? '/'} draggable='false' className={styles.link}>
            <div className={styles.info}>
                <UserCard {...item.user} onlyName />
                {descElement}
                <TimeAgo date={item.date} />
            </div>
        </NavLink>
    );
}

export default NotificationItem;