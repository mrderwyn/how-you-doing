import React from 'react'
import { NavLink } from 'react-router-dom'
import { type NotificationType } from '../../types'
import TimeAgo from '../TimeAgo/TimeAgo'
import UserCard from '../UserCard/UserCard'

import styles from './NotificationItem.module.css'

const descByType = (type: string) => {
  switch (type) {
    case 'newpost':
      return 'published a new post'
    case 'newfollow':
      return 'started following you !'
    case 'unfollow':
      return 'stopped following you :('
    case 'newcomment':
      return 'left a comment on your post'
    default:
      return 'whoops. something wrong'
  }
}

interface NotificationItemPropsType {
  item: NotificationType
}

const NotificationItem: React.FC<NotificationItemPropsType> = ({ item }: NotificationItemPropsType) => {
  const desc = descByType(item.type)
  const descElement = item.target !== null
    ? <NavLink to={item.target} draggable='false' className={styles.link}>
            <p className={styles.description}>{desc}</p>
        </NavLink>
    : <p className={styles.description}>{desc}</p>

  return (
        <div className={styles.info}>
                <UserCard {...item.user} onlyName />
                {descElement}
                <TimeAgo date={item.date} />
        </div>
  )
}

export default NotificationItem
