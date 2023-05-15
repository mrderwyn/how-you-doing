import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PeoplesContainer from '../components/PeoplesContainer/PeoplesContainer';
import UserProfile from '../components/UserProfile/UserProfile';

import { fetchProfile, stopListenProfile } from '../redux/actions/profileActions';
//import { fetchProfile, stopListenProfile } from '../redux/mainSlice';
import { selfSelector } from '../redux/selectors';

const PeoplesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile(id) as any);
        return () => stopListenProfile();
    }, [id]);
    //dispatch(fetchProfile(id) as any);

    return (
        <>
            <UserProfile />
            <PeoplesContainer />
        </>
    );
}

export default PeoplesPage;