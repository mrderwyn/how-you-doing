import React from 'react'
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroll-component'

import FeedItem from '../FeedItem/FeedItem'

import styles from './Feed.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { hasNextPostsSelector, nextPostsSelector, postsSelector } from '../../redux/selectors'
import Loader from '../Loader/Loader'
import { addPostsToEnd } from '../../redux/slices/postsSlice/slice'

const breakpoints = {
  default: 2,
  800: 1
}

const Feed: React.FC = () => {
  const items = useSelector(postsSelector)
  const hasMore = useSelector(hasNextPostsSelector)
  const dispatch = useDispatch()

  const next = useSelector(nextPostsSelector)
  const fetchNext = async () => {
    if (next == null) {
      return
    }

    const result = await next()
    if (result == null) {
      return
    }

    dispatch(addPostsToEnd({ posts: result[0], hasMore: result[1] }))
  }

  return (items != null)
    ? items.length > 0
      ? (
                <InfiniteScroll
                    dataLength={items?.length ?? 0}
                    next={fetchNext}
                    hasMore={hasMore}
                    loader={<></>}
                    endMessage={<p className={styles.infoText}>no more posts ...</p>}
                >
                    <Masonry className={styles.masonryFeed} breakpointCols={breakpoints} columnClassName={styles.masonryColumn}>
                        {items.map(item =>
                                    <FeedItem key={item.id} {...item} />
                        )}
                    </Masonry>

                </InfiniteScroll>

        )
      : (
                <p className={styles.infoText}>There is no posts yet :)</p>
        )
    : <Loader />
}

export default Feed
