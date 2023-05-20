import React from 'react'

import { useSelector } from 'react-redux'
import { postDetailsLoadingSelector, postDetailsSelector } from '../../redux/selectors'

import CommentSection from '../CommentSection/CommentSection'
import FeedItem from '../FeedItem/FeedItem'
import Loader from '../Loader/Loader'
import NotFound from '../NotFound/NotFound'

import styles from './PostDetails.module.css'

const PostDetails: React.FC = () => {
  const post = useSelector(postDetailsSelector)
  const loading = useSelector(postDetailsLoadingSelector)
  if (loading) {
    return <Loader />
  }

  if (post === null) {
    return <NotFound text="We can't find that post" />
  }

  return (
        <div className={styles.container}>
            <FeedItem {...post} disableLink />
            <CommentSection />
        </div>
  )
}

export default PostDetails
