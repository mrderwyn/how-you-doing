import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Feed from '../components/Feed/Feed';
import PublishFeedForm from '../components/PublishFeedForm/PublishFeedForm';
import SearchBar from '../components/SearchBar/SearchBar';
import UserProfile from '../components/UserProfile/UserProfile';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchPosts } from '../redux/mainSlice';
import { selfSelector } from '../redux/selectors';

const ProfilePage = () => {
    const { id } = useParams();
    const self = useSelector(selfSelector);

    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    dispatch(fetchProfile(id) as any);
    dispatch(fetchPosts(location.pathname, query.get('t'), query.get('s')) as any);

    return (
        <>
            <UserProfile
                self={id === self.id}/>
            {id === self.id && (<PublishFeedForm />)}
            <SearchBar withoutFollowing />
            <Feed />
        </>    
    );
};

export default ProfilePage;