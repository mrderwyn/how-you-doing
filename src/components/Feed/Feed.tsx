import React from 'react';
import { NavLink } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import FeedItem from '../FeedItem/FeedItem';

import styles from './Feed.module.css';

import { useSelector } from 'react-redux';
import { postsSelector } from '../../redux/selectors';
import Loader from '../Loader/Loader';

const breakpoints = {
    default: 2,
    800: 1,
};

const Feed = () => {
    const items = useSelector(postsSelector);
    if (items === null) {
        return <Loader />;
    }

    return items?.length > 0
        ? (
            <Masonry className={styles.masonryFeed} breakpointCols={breakpoints} columnClassName={styles.masonryColumn}>
                {items.map((item: any) =>
                        <NavLink key={item.id}  to={`/post/${item.id}`} draggable='false' className={styles.link}>
                            <FeedItem {...item} />
                        </NavLink>
                    )}
            </Masonry>
        )
        : (
            <p>There is no posts yet :)</p>
        );
};

export default Feed;