import React from 'react';

import { useSelector } from 'react-redux';

import CommentSection from '../CommentSection/CommentSection';
import FeedItem from '../FeedItem/FeedItem';
import Loader from '../Loader/Loader';

import styles from './PostDetails.module.css';

const PostDetails = () => {
    const post = useSelector((state: any) => state.postDetails.post);
    if (post === null || post === undefined) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <FeedItem {...post} />
            <CommentSection />
        </div>
    );
};

export default PostDetails;