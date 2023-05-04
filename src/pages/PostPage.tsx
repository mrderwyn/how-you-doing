import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostDetails } from '../redux/mainSlice';

import PostDetails from '../components/PostDetails/PostDetails';

const PeoplesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    dispatch(fetchPostDetails(id) as any);

    return (
        <PostDetails />
    );
}

export default PeoplesPage;