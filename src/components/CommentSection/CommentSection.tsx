import React from 'react';

import { useSelector } from 'react-redux';
import { commentsSelector } from '../../redux/selectors';

import Comment from '../Comment/Comment';
import Button from '../Button/Button';

import styles from './CommentSection.module.css';
import Loader from '../Loader/Loader';

const CommentSection = () => {
    const comments = useSelector(commentsSelector);
    if (comments === null || comments === undefined) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.newCommentForm}>
                <input type='text' placeholder='leave comment' className={styles.input} />
                <Button type='submit'>Send</Button>
            </div>
            <div className={styles.commentsSection}>
                {comments.length === 0
                    ? <p className={styles.noCommentsText}>No comments yet</p>
                    : <>
                        {comments.map((comment: any) =>
                            <Comment key={comment.id} {...comment} />)}
                    </>}
            </div>
        </div>
    );
};

export default CommentSection;