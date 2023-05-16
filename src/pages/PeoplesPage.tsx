import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

import PeoplesContainer from '../components/PeoplesContainer/PeoplesContainer';
import UserProfile from '../components/UserProfile/UserProfile';

import { fetchProfile, stopListenProfile } from '../redux/actions/profileActions';
import { profileLoadingSelector, profileSelector } from '../redux/selectors';

const PeoplesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile(id) as any);
        return () => stopListenProfile();
    }, [id]);

    const profile = useSelector(profileSelector);
    const loading = useSelector(profileLoadingSelector);

    return (!loading && profile === null)
        ? <NotFound text="We can't find that profile" />
        : <>
            <UserProfile />
            <PeoplesContainer />
        </>
}

export default PeoplesPage;