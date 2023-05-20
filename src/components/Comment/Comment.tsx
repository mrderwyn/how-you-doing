import React from 'react'
import { type CommentType } from '../../types'
import TimeAgo from '../TimeAgo/TimeAgo'

import UserCard from '../UserCard/UserCard'

import styles from './Comment.module.css'

const Comment: React.FC<CommentType> = ({ id, date, user, text }: CommentType) => {
  return (
        <div className={styles.comment}>
            <div className={styles.avatar}>
                <UserCard avatar={user.avatar} id={user.id}/>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.header}>
                    <p className={styles.name}>{user.name}</p>
                    <div className={styles.date}>
                        <TimeAgo date={date} />
                    </div>
                </div>
                <p className={styles.text}>
                    {text}
                </p>
            </div>
        </div>
  )
}

export default Comment
