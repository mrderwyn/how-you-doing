import React, { useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SearchByTagBar from '../SearchByTagBar/SearchByTagBar';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

import styles from './SearchBar.module.css';

const getSelectedFromQueryType = (t: any) => {
    switch (t) {
        case 'f':
            return 'Following';
        case 't':
            return 'By tag';
        case 's':
            return 'Search';
        default:
            return 'All';
    }
}

const popularTags = ['art', 'photo', 'city', 'people', 'history', 'nature', 'sculpture'];

const SearchBar = ({ withoutFollowing }: any) => {
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

    const submitSearch = useCallback((value: string) => {
        navigate(`${location.pathname}?t=s&s=${value}`);
    }, [location.pathname]);

    const changeSelection = useCallback((value: any) => {
        if (value !== selectedRef.current) {
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
                <Button data='By word' action={changeSelection} activated={selected === 'By word'}>By word</Button>
                
            </div>
            {selected === 'By tag' && <SearchByTagBar tags={popularTags} submit={submitTag}/>}
            {selected === 'By word' &&
                <InputField placeholder='search posts' buttonText='Search' submit={submitSearch} />}
        </div>
    );
};

export default SearchBar;