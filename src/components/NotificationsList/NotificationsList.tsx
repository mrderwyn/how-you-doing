import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsSelector } from '../../redux/selectors';
import { readAllNotifications } from '../../redux/slices/notificationsSlice/slice';
import Loader from '../Loader/Loader';
import NotificationItem from '../NotificationItem/NotificationItem';

import styles from './NotificationsList.module.css';

const NotificationsList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(notificationsSelector);
    if ((notifications?.unreaded ?? []).length > 0) {
        dispatch(readAllNotifications({}));
    }
    
    if (notifications === null) {
        return <Loader />;
    }

    const all = [...notifications.unreaded, ...notifications.readed];

    return (
        <div className={styles.container}>
            <p className={styles.text}>Last notifications</p>
            {all.map(n => <NotificationItem key={n.id} item={n} />)}
        </div>
    );
};

export default NotificationsList;