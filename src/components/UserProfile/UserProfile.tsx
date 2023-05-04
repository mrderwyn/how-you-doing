import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { profileSelector } from '../../redux/selectors';

import scroll from '../../helpers/scrollToTop';

import Button from '../Button/Button';

import cn from 'classnames';

import styles from './UserProfile.module.css';
import Loader from '../Loader/Loader';


const checkRelations = (relations: any, selfReturn: any, followedReturn: any, notFollowedReturn: any) => {
    if (relations === 'self') {
        return selfReturn;
    }

    return relations === 'followed' ? followedReturn : notFollowedReturn;
};

const UserProfile = ({self}: any) => {
    const profile = useSelector(profileSelector);
    if (profile === null){
        return <Loader />;
    }
    
    const { background, avatar, name, id, followedBy } = profile;
    const [followers, follows] = [profile.followers.length, profile.follow.length];
    const relations = self ? 'self' : (followedBy ? 'followed' : 'notfollowed');

    return (
        <div className={styles.container}>
            <div className={styles.header} style={{ backgroundImage: `url('${background}')` }}>
                <img src={avatar} alt='avatar' className={styles.avatar} />
            </div>
            <div className={styles.content}>
                <NavLink
                    onClick={scroll}
                    to={`/profile/${id}`}
                    draggable='false'
                    className={cn(styles.box, styles.info, styles.link)}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.id}>{id}</span>
                </NavLink>
                <div className={styles.separator} />
                <div className={styles.box}>
                    <NavLink
                        onClick={scroll}
                        to={`/peoples/${id}`}
                        draggable='false'
                        className={cn(styles.box, styles.link, styles.info)}>
                        <span>{follows} follows</span>
                        <span>{followers} followers</span>
                    </NavLink>
                </div>
                <div className={styles.separator} />
                <div className={styles.box}>
                    {
                        checkRelations(
                            relations,
                            <Button main>Edit</Button>,
                            <Button main>Unfollow</Button>,
                            <Button>Follow</Button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default UserProfile;