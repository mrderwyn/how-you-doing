import React, { useState, useCallback, useRef, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selfSelector, profileSelector, profileFollowSelector, profileFollowersSelector } from '../../redux/selectors'

import { getAllUsers } from '../../services/firebaseService'

import UserList from '../UserList/UserList'
import Button from '../Button/Button'

import styles from './PeoplesContainer.module.css'
import Loader from '../Loader/Loader'
import FollowButton from '../FollowButton/FollowButton'
import { type IdentityObject } from '../../redux/types'
import { type LightUserInfoType } from '../../types'

const PeoplesContainer: React.FC = () => {
  const self = useSelector(selfSelector)
  const user = useSelector(profileSelector)
  const follow = useSelector(profileFollowSelector)
  const followers = useSelector(profileFollowersSelector)

  const [selected, setSelected] = useState('Following')
  const selectedRef = useRef(selected)
  selectedRef.current = selected

  const [all, setAll] = useState([] as LightUserInfoType[])
  useEffect(() => {
    getAllUsers().then(users => {
      setAll(users)
    })
  }, [])

  const changeSelection = useCallback((value: string | undefined) => {
    if (value !== undefined && value !== selectedRef.current) {
      setSelected(value)
    }
  }, [])

  const creator = useCallback(({ id }: IdentityObject) => {
    return <FollowButton id={id} />
  }, [])

  if (self === null || user === null) {
    return <Loader />
  }

  return (
        <div className={styles.container}>
            <div className={styles.options}>
                <Button type='submit' activated={selected === 'Following'} data='Following' action={changeSelection}>Following</Button>
                <Button type='submit' activated={selected === 'Followers'} data='Followers' action={changeSelection}>Followers</Button>
                {user.id === self.id && (
                    <Button type='submit' activated={selected === 'All'} data='All' action={changeSelection}>All</Button>
                )}
            </div>
            <div className={styles.content}>
                {selected === 'Following' && (
                    <UserList users={follow} type='follows' creator={creator} />
                )}
                {selected === 'Followers' && (
                    <UserList users={followers} type='followers' creator={creator} />
                )}
                {selected === 'All' && (
                    <UserList users={all} creator={creator} />
                )}
            </div>
        </div>
  )
}

export default PeoplesContainer
