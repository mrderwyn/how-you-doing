import React, { useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SearchByTagBar from '../SearchByTagBar/SearchByTagBar';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

import styles from './SearchBar.module.css';

const getSelectedFromQueryType = (t: string | null) => {
    switch (t) {
        case 'f':
            return 'Following';
        case 't':
            return 'By tag';
        default:
            return 'All';
    }
}

const popularTags = ['art', 'photo', 'city', 'people', 'history', 'nature', 'sculpture'];

type SearchBarPropsType = {
    withoutFollowing?: boolean
};

const SearchBar = ({ withoutFollowing = false }: SearchBarPropsType) => {
    const location = useLocation();
    const srh = new URLSearchParams(location.search);

    const locationRef = useRef(location);
    locationRef.current = location;

    const navigate = useNavigate();

    const [selected, setSelected] = useState(getSelectedFromQueryType(srh.get('t')));
    const selectedRef = useRef(selected);
    selectedRef.current = selected;

    const submitTag = useCallback((value: string) => {
        navigate(`${location.pathname}?t=t&s=${value}`);
    }, [location.pathname]);

    const changeSelection = useCallback((value: string | undefined) => {
        if (value && value !== selectedRef.current) {
            switch (value) {
                case 'All':
                    navigate(locationRef.current.pathname);
                    break
                case 'Following':
                    navigate(locationRef.current.pathname + '?t=f');
                    break;
                default:
                    break;
            }
            
            setSelected(value);
        }
    }, [location.key]);



    return (
        <div className={styles.container}>
            <div className={styles.buttonsContainer}>
                <Button data='All' action={changeSelection} activated={selected === 'All'}>All</Button>
                {!withoutFollowing && <Button data='Following' action={changeSelection} activated={selected === 'Following'}>Following</Button>}
                <Button data='By tag' action={changeSelection} activated={selected === 'By tag'}>By tag</Button>
                
            </div>
            {selected === 'By tag' && <SearchByTagBar tags={popularTags} submit={submitTag}/>}
        </div>
    );
};

export default SearchBar;