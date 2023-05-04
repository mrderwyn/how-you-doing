import React, { useState, useCallback, useRef } from 'react';
import ImageUploader from 'react-images-upload';

import UserCard from '../UserCard/UserCard';
import InputField from '../InputField/InputField';
import TagsContainer from '../TagsContainer/TagsContainer';
import Button from '../Button/Button';

import styles from './PublishFeedForm.module.css';
import { useSelector } from 'react-redux';
import { selfSelector } from '../../redux/selectors';

const PublishFeedForm = () => {
    const [tags, setTags] = useState([] as any[]);

    const tagsRef = useRef(tags);
    tagsRef.current = tags;

    const removeTag = useCallback((tag: any) => {
        setTags(tagsRef.current.filter(t => t !== tag));
    }, []);

    const addTag = useCallback((tag: any) => {
        setTags([...tagsRef.current, tag]);
    }, []);

    const [images, setImages] = useState([] as any[]);
    const [iconShown, setIconShown] = useState(true);
    const onDrop = useCallback((files: any, urls: any) => {
        setImages(files);
        setIconShown(files.length === 0);
    }, []);

    
    const imageLoader = <ImageUploader
        fileContainerStyle={{margin: '0', backgroundColor: 'var(--background-default)', height: '100%'}}
        withIcon={iconShown}
        withLabel={false}
        buttonText='Choose image'
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        withPreview={true}
        singleImage={true}
    />;

    const tagsEditor = <div className={styles.tagSelector}>
        <div className={styles.inputField}>
            <InputField placeholder='input tag' submit={addTag} clearAfter buttonText='Add' />
        </div>
        <TagsContainer tags={tags} action={removeTag} />
    </div>;

    const [imageShown, setImageShown] = useState(false);
    const imageShownRef = useRef(imageShown);
    imageShownRef.current = imageShown;

    const [tagsShown, setTagsShown] = useState(false);
    const tagsShownRef = useRef(tagsShown);
    tagsShownRef.current = tagsShown;

    const imageClickHandler = useCallback(() => {
        setImageShown(!imageShownRef.current);
    }, []);

    const tagsClickHandler = useCallback(() => {
        setTagsShown(!tagsShownRef.current);
    }, []);

    const self = useSelector(selfSelector);

    return (
        <div className={styles.container}>
            <div className={styles.mainBox}>
                    <UserCard avatar={self.avatar} id={self.id} />
                    <input className={styles.input} type='text' placeholder='How you doing' />
                </div>
                <div className={styles.controlButtons}>
                    <Button activated={imageShownRef.current} action={imageClickHandler}>Image</Button>
                    <Button activated={tagsShownRef.current} action={tagsClickHandler}>Tags</Button>
                    <Button type='submit' main>Post</Button>
                </div>
                {(imageShownRef.current || tagsShownRef.current) && <div className={styles.optionsBox}>
                    {imageShownRef.current && imageLoader}
                    {tagsShownRef.current && tagsEditor}
                </div>}
        </div>
    );
};

export default PublishFeedForm;