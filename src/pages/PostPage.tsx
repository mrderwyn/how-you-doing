import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchPostDetails, stopListeningComments } from '../redux/actions/postDetailsActions';

import PostDetails from '../components/PostDetails/PostDetails';

const PeoplesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostDetails(id) as any);
        return () => stopListeningComments();
    }, [id]);

    return (
        <PostDetails />
    );
}

export default PeoplesPage;