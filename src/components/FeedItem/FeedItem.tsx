import React from 'react';

import UserCard from '../UserCard/UserCard';
import TagsContainer from '../TagsContainer/TagsContainer';

import styles from './FeedItem.module.css';

const FeedItem = ({id, user, date, picture, text, tags}: any) => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.header}>
                    <UserCard {...user} />
                    <div className={styles.date}>
                        <p>{date}</p>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.content}>
                        {picture && 
                            <div className={styles.contentPicture}>
                                <img src={picture} alt='picture' />
                            </div>}
                        <p className={styles.contentText}>
                            {text}
                        </p>
                        <TagsContainer tags={tags} />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default FeedItem;