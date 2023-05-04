import React, { useState, useCallback, useRef } from 'react';

import { useSelector } from 'react-redux';
import { selfSelector, profileSelector } from '../../redux/selectors';

import { getUsers, getLightUserInfo } from '../../services/mockService';

import UserList from '../UserList/UserList';
import Button from '../Button/Button';

import styles from './PeoplesContainer.module.css';
import Loader from '../Loader/Loader';

const PeoplesContainer = () => {
    const self = useSelector(selfSelector);
    const user = useSelector(profileSelector);

    const [selected, setSelected] = useState('Following');
    const selectedRef = useRef(selected);
    selectedRef.current = selected;

    const changeSelection = useCallback((value: any) => {
        if (value !== selectedRef.current) {
            setSelected(value);
        }
    }, []);

    const creator = useCallback((id: any) => {
        return self.follow.includes(id)
            ?   <Button main>Unfollow</Button>
            :   <Button>Follow</Button>;
    }, [self]);

    if (user === null){
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <Button type='submit' activated={selected === 'Following'} data='Following' action={changeSelection}>Following</Button>
                <Button type='submit' activated={selected === 'Followers'} data='Followers' action={changeSelection}>Followers</Button>
                {user.id === self.id && (
                    <Button type='submit' activated={selected === 'All'} data='All' action={changeSelection}>All</Button>
                )}
            </div>
            <div className={styles.content}>
                {selected === 'Following' && (
                    <UserList users={user.follow.map((i: any) => getLightUserInfo(i))} creator={creator} />
                )}
                {selected === 'Followers' && (
                    <UserList users={user.followers.map((i: any) => getLightUserInfo(i))} creator={creator} />
                )}
                {selected === 'All' && (
                    <UserList users={getUsers()} creator={creator} />
                )}
            </div>
        </div>
    );
};

export default PeoplesContainer;