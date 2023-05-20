import React from 'react'
import ImageUploader from 'react-images-upload'

import styles from './ImageLoader.module.css'
import drawIcon from './res/draw-icon.png'

interface ImageLoaderPropsType {
  buttonText: string
  onChange: any
  iconShown?: boolean
}

const ImageLoader: React.FC<ImageLoaderPropsType> = ({ buttonText, onChange, iconShown = true }: ImageLoaderPropsType) => {
  return <>
                <ImageUploader
                    fileContainerStyle={{ backgroundColor: 'var(--background-default)' }}
                    buttonText={buttonText}
                    onChange={onChange}
                    withIcon={iconShown}
                    imgExtension={['.jpg', '.gif', '.png', '.jfif', '.jpeg']}
                    accept='image/*,.jfif'
                    label='Max size: 5mb'
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                />
                <img src={drawIcon} alt='' className={styles.drawIcon} />
    </>
}

export default ImageLoader
