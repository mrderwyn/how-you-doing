import React from 'react'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { profileFollowersSelector, profileFollowSelector, profileLoadingSelector, profileSelector } from '../../redux/selectors'

import scroll from '../../utils/scrollToTop'

import cn from 'classnames'

import styles from './UserProfile.module.css'
import Loader from '../Loader/Loader'
import FollowButton from '../FollowButton/FollowButton'
import NotFound from '../NotFound/NotFound'

const UserProfile: React.FC = () => {
  const profile = useSelector(profileSelector)
  const loading = useSelector(profileLoadingSelector)
  const followArr = useSelector(profileFollowSelector)
  const followersArr = useSelector(profileFollowersSelector)

  if (loading) {
    return <Loader />
  }

  if (profile === null) {
    return <NotFound text="We can't find that user" />
  }

  const { background, avatar, name, id } = profile
  const [followers, follows] = [followersArr.length, followArr.length]

  return (
        <div className={styles.container}>
            <div className={styles.header} style={{ backgroundImage: `url('${background}')` }}>
                <img src={avatar} alt='avatar' className={styles.avatar} />
            </div>
            <div className={styles.content}>
                <NavLink
                    onClick={scroll}
                    to={`/profile/${id}`}
                    draggable='false'
                    className={cn(styles.box, styles.info, styles.link)}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.id}>{id}</span>
                </NavLink>
                <div className={styles.separator} />
                <div className={styles.box}>
                    <NavLink
                        onClick={scroll}
                        to={`/peoples/${id}`}
                        draggable='false'
                        className={cn(styles.box, styles.link, styles.info)}>
                        <span>{follows} follows</span>
                        <span>{followers} followers</span>
                    </NavLink>
                </div>
                <div className={styles.separator} />
                <div className={styles.box}>
                    <FollowButton id={id} />
                </div>
            </div>
        </div>
  )
}

export default UserProfile
