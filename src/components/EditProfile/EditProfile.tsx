import React, { useCallback, useRef, useState } from 'react';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';

//import { updateUserInfo } from '../../redux/mainSlice';
import { selfSelector } from '../../redux/selectors';

import Button from '../Button/Button';

import InputField from '../InputField/InputField';

import { storage } from '../../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import Loader from '../Loader/Loader';
import { updateUserInfo } from '../../redux/actions/selfActions';
import EditImageField from '../EditImageField/EditImageField';

import styles from './EditProfile.module.css';

const EditProfile = () => {
    const self = useSelector(selfSelector);

    const dispatch = useDispatch();
    
    const updateName = (name: string) => {
        dispatch(updateUserInfo({ name }) as any);
    }

    const updateDescription = (description: string) => {
        dispatch(updateUserInfo({ description }) as any);
    }

    const updateAvatar = useCallback((url: string) => {
        dispatch(updateUserInfo({ avatar: url }) as any);
    }, []);

    const updateBackground = useCallback((url: string) => {
        dispatch(updateUserInfo({ background: url }) as any);
    }, []);

    if (!self) {
        return <Loader />;
    }

    return <div className={styles.container}>
        <div className={styles.optionBox}>
            <p className={styles.optionBoxTitle}>Name</p>
            <InputField
                placeholder='input name'
                submit={updateName}
                defaultValue={self.name}
                buttonText='Save'
                main
            />
        </div>
        <div className={styles.optionBox}>
            <p className={styles.optionBoxTitle}>Description</p>
            <InputField
                placeholder='input description'
                submit={updateDescription}
                defaultValue={self.description}
                buttonText='Save'
                main
            />
        </div>
        <div className={styles.optionBox}>
            <p className={styles.optionBoxTitle}>Avatar</p>
            <EditImageField
                defaultImage={self.avatar}
                uploadTo={`images/avatar/${self?.id}`}
                actionWithUrl={updateAvatar}
                type='avatar'
            />
        </div>
        <div className={styles.optionBox}>
            <p className={styles.optionBoxTitle}>Background</p>
            <EditImageField
                defaultImage={self.background}
                uploadTo={`images/background/${self?.id}`}
                actionWithUrl={updateBackground}
                type='background'
            />
        </div>
    </div>
};

export default EditProfile;

/*
<div>
            <ImageUploader
                fileContainerStyle={{backgroundColor: 'var(--background-default)'}}
                buttonText='Choose avatar'
                onChange={onAvatarDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
            />;
            <Button type='submit' action={updateAvatar}>Update</Button>
        </div>
        <div>
            <ImageUploader
                fileContainerStyle={{backgroundColor: 'var(--background-default)'}}
                buttonText='Choose background'
                onChange={onBackgroundDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
            />;
            <Button type='submit' action={updateBackground}>Update</Button>
        </div>
*/