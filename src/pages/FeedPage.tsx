import React, { useEffect } from 'react';

import Feed from '../components/Feed/Feed';
import PublishFeedForm from '../components/PublishFeedForm/PublishFeedForm';
import SearchBar from '../components/SearchBar/SearchBar';

import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchPosts, stopListenPosts } from '../redux/actions/postsActions';

const FeedPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(location.pathname, query.get('t'), query.get('s')) as any);
        return () => stopListenPosts();
    }, [location]);

    return (
        <>
            <PublishFeedForm />
            <SearchBar />
            <Feed />
        </>
    );
};

export default FeedPage;