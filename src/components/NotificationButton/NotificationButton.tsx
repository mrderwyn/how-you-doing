import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, stopListenNotifications } from '../../redux/actions/notificationsActions';
import { unreadNotificationsSelector } from '../../redux/selectors';

import styles from './NotificationButton.module.css';

const NotificationButton = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotifications() as any);
        return () => stopListenNotifications();
    }, []);

    const unreaded = useSelector(unreadNotificationsSelector);
    return <div className={styles.container}>
        <span>Notifications</span>
        {unreaded.length > 0 && <span className={styles.unread}>{unreaded.length}</span>}
    </div>

    return unreaded.length > 0
        ? (<>Notifications !!!</>)
        : (<>Notifications</>);
};

export default NotificationButton;