import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { commentsSelector } from '../../redux/selectors';

import Comment from '../Comment/Comment';
import Button from '../Button/Button';

import styles from './CommentSection.module.css';
import Loader from '../Loader/Loader';
import InputField from '../InputField/InputField';
import { sendComment } from '../../redux/actions/postDetailsActions';
//import { sendComment, setPostDetails } from '../../redux/mainSlice';

const CommentSection = () => {
    const comments = useSelector(commentsSelector);
    const dispatch = useDispatch();
    //dispatch(setPostDetails({post: null, comments: []}) as any);

    const sendCommentHandler = useCallback((value: string) => {
        dispatch(sendComment(value) as any);
    }, []);

    if (comments === null || comments === undefined) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.newCommentForm}>
                <InputField placeholder='leave comment' clearAfter buttonText='Send' submit={sendCommentHandler} />
            </div>
            <div className={styles.commentsSection}>
                {comments.length === 0
                    ? <p className={styles.noCommentsText}>No comments yet</p>
                    : <>
                        {comments.map(comment =>
                            <Comment key={comment.id} {...comment} />)}
                    </>}
            </div>
        </div>
    );
};

export default CommentSection;