import React from 'react';

import UserCard from '../UserCard/UserCard';

import styles from './Comment.module.css';

const Comment = ({id, date, user, text}: any) => {
    return (
        <div className={styles.comment}>
            <div className={styles.avatar}>
                <UserCard avatar={user.avatar} id={user.id}/>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.header}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.date}>{date}</p>
                </div>
                <p className={styles.text}>
                    {text}
                </p>
            </div>
        </div>
    );
};

export default Comment;