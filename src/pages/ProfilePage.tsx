import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Feed from '../components/Feed/Feed';
import PublishFeedForm from '../components/PublishFeedForm/PublishFeedForm';
import SearchBar from '../components/SearchBar/SearchBar';
import UserProfile from '../components/UserProfile/UserProfile';

import { useDispatch, useSelector } from 'react-redux';
//import { fetchProfile, fetchPosts, stopListenProfile } from '../redux/mainSlice';
import { selfSelector } from '../redux/selectors';
import { fetchProfile, stopListenProfile } from '../redux/actions/profileActions';
import { fetchPosts, stopListenPosts  } from '../redux/actions/postsActions';

const ProfilePage = () => {
    const { id } = useParams();
    const self = useSelector(selfSelector);

    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    useEffect(() => {
        dispatch(fetchProfile(id) as any);
        return () => {
            stopListenProfile();
        }
    }, [id]);

    useEffect(() => {
        dispatch(fetchPosts(location.pathname, query.get('t'), query.get('s')) as any);
        return () => {
            stopListenPosts();
        }
    }, [location]);

    //dispatch(fetchProfile(id) as any);
    

    return (
        <>
            <UserProfile />
            {id === self?.id && (<PublishFeedForm />)}
            <SearchBar withoutFollowing />
            <Feed />
        </>    
    );
};

export default ProfilePage;