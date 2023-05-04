import React from 'react';

import Feed from '../components/Feed/Feed';
import PublishFeedForm from '../components/PublishFeedForm/PublishFeedForm';
import SearchBar from '../components/SearchBar/SearchBar';

import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/mainSlice';

const FeedPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    dispatch(fetchPosts(location.pathname, query.get('t'), query.get('s')) as any);

    return (
        <>
            <PublishFeedForm />
            <SearchBar />
            <Feed />
        </>
    );
};

export default FeedPage;