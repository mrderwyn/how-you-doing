import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { commentsSelector } from '../../redux/selectors'

import Comment from '../Comment/Comment'

import styles from './CommentSection.module.css'
import Loader from '../Loader/Loader'
import InputField from '../InputField/InputField'
import { sendComment } from '../../redux/actions/postDetailsActions'
import { notEmptyStringCheck } from '../../utils/validators'

const CommentSection: React.FC = () => {
  const comments = useSelector(commentsSelector)
  const dispatch = useDispatch()

  const sendCommentHandler = useCallback((value: string) => {
    if (notEmptyStringCheck(value)) {
      dispatch(sendComment(value) as any)
    }
  }, [])

  if (comments === null || comments === undefined) {
    return <Loader />
  }

  return (
        <div className={styles.container}>
            <div className={styles.newCommentForm}>
                <InputField placeholder='leave comment' clearAfter buttonText='Send' main submit={sendCommentHandler} />
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
  )
}

export default CommentSection
