import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PeoplesContainer from '../components/PeoplesContainer/PeoplesContainer';
import UserProfile from '../components/UserProfile/UserProfile';
import { fetchProfile } from '../redux/mainSlice';
import { selfSelector } from '../redux/selectors';

const PeoplesPage = () => {
    console.log('peoples page');
    const { id } = useParams();
    console.log('id', id);
    const self = useSelector(selfSelector);
    console.log('self', self);

    const dispatch = useDispatch();
    dispatch(fetchProfile(id) as any);

    return (
        <>
            <UserProfile
                self={id === self.id}/>
            <PeoplesContainer />
        </>
    );
}

export default PeoplesPage;