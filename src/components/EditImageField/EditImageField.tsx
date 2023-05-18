import React, { useCallback, useRef, useState } from 'react';
import { uploadImage } from '../../services/firebaseService';
import ImageUploader from 'react-images-upload';

import styles from './EditImageField.module.css';
import Button from '../Button/Button';
import ImageLoader from '../ImageLoader/ImageLoader';

type EditImageFieldPropsType = {
    defaultImage: string,
    uploadTo: string,
    actionWithUrl: (url: string) => void,
    type: 'avatar' | 'background',
}

const EditImageField = ({ defaultImage, uploadTo, actionWithUrl, type }: EditImageFieldPropsType) => {
    const [image, setImage] = useState([] as any[]);
    const imageRef = useRef(image);
    imageRef.current = image;

    const [editMode, setEditMode] = useState(false);

    const updateImage = () => {
        if (imageRef.current.length !== 1) {
            return;
        }

        uploadImage(imageRef.current[0], uploadTo)
            .then(url => {
                actionWithUrl(url);
                setEditMode(false);
            });
    };

    const onImageDrop = useCallback((files: any, urls: any) => {
        setImage(files);
    }, []);

    const startEdit = useCallback(() => {
        setEditMode(true);
    }, []);

    const stopEdit = useCallback(() => {
        setEditMode(false);
    }, []);

    const displayDefault = type === 'avatar'
        ? <img src={defaultImage} alt='avatar' className={styles.avatar} />
        : <img src={defaultImage} alt='background' className={styles.background} />;

    return editMode
        ? (
            <div className={styles.container}>
                <ImageLoader buttonText={`Choose ${type}`} onChange={onImageDrop} />
                
                <div className={styles.buttonsBox}>
                    <Button type='submit' action={updateImage} main>Update</Button>
                    <Button action={stopEdit}>Cancel</Button>
                </div>
            </div>
        )
        : (
            <div className={styles.container}>
                {displayDefault}
                <Button type='submit' action={startEdit}>Edit</Button>
            </div>
        );

};

export default EditImageField;