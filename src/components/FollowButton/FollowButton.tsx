import React, { useCallback } from 'react'
import { type IdentityObject } from '../../redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { followsSelector, selfSelector } from '../../redux/selectors'

import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { followUser, unfollowUser } from '../../redux/actions/followActions'

const FollowButton: React.FC<IdentityObject> = ({ id }: IdentityObject) => {
  const follows = useSelector(followsSelector)
  const self = useSelector(selfSelector)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const followHandler = useCallback(() => {
    dispatch(followUser(id) as any)
  }, [])

  const unfollowHandler = useCallback(() => {
    dispatch(unfollowUser(id) as any)
  }, [])

  const editHandler = useCallback(() => {
    navigate('/edit')
  }, [])

  if (self == null) {
    return <></>
  }

  if (id === self.id) {
    return <Button action={editHandler} main>Edit</Button>
  }

  if (follows.some(user => user.id === id)) {
    return <Button action={unfollowHandler} main>Unfollow</Button>
  } else {
    return <Button action={followHandler}>Follow</Button>
  }
}

export default FollowButton
