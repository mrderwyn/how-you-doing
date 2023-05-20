import React, { type ReactNode } from 'react'
import { type LightUserInfoType } from '../../types'

import UserCard from '../UserCard/UserCard'

import styles from './UserListItem.module.css'

interface UserListItemPropsType {
  user: LightUserInfoType
  options: ReactNode
}

const UserListItem: React.FC<UserListItemPropsType> = ({ user, options }: UserListItemPropsType) => {
  return (
        <div className={styles.item}>
            <UserCard {...user} />
            {options}
        </div>
  )
}

export default UserListItem
