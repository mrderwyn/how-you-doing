import React, { useCallback } from 'react';
import { PostType } from '../../types';

import UserCard from '../UserCard/UserCard';
import TagsContainer from '../TagsContainer/TagsContainer';

import styles from './FeedItem.module.css';
import TimeAgo from '../TimeAgo/TimeAgo';
import { NavLink, useNavigate } from 'react-router-dom';
import scrollToTop from '../../helpers/scrollToTop';

type FeedItemPropsType = PostType & {
    disableLink?: boolean
}

const postContent = (picture: string, text: string) => <div className={styles.content}>
    {picture && 
        <div className={styles.contentPicture}>
            <img src={picture} alt='picture' />
        </div>}
    <p className={styles.contentText}>
        {text}
    </p>
</div>

const FeedItem = ({id, user, date, picture, text, tags, disableLink}: FeedItemPropsType) => {
    const navigate = useNavigate();
    const navigateToTag = useCallback((tag: string) => {
        navigate(`/?t=t&s=${tag}`);
        scrollToTop();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.header}>
                    <UserCard {...user} />
                    <div className={styles.date}>
                        <TimeAgo date={date} />
                    </div>
                </div>
                <div className={styles.main}>
                    {
                        disableLink
                            ? postContent(picture, text)
                            : <NavLink to={`/post/${id}`} draggable='false' className={styles.link}>
                                {postContent(picture, text)}
                            </NavLink>
                    }
                    <TagsContainer tags={tags} action={navigateToTag} />
                </div>
                
            </div>
        </div>
    );
};

export default FeedItem;