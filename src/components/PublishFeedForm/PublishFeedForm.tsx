import React, { useState, useCallback, useRef } from 'react'

import UserCard from '../UserCard/UserCard'
import InputField from '../InputField/InputField'
import TagsContainer from '../TagsContainer/TagsContainer'
import Button from '../Button/Button'

import styles from './PublishFeedForm.module.css'
import { useSelector } from 'react-redux'
import { selfSelector } from '../../redux/selectors'

import { uploadImage, createPost } from '../../services/firebaseService'
import Loader from '../Loader/Loader'
import scrollToTop from '../../utils/scrollToTop'
import ImageLoader from '../ImageLoader/ImageLoader'
import { postIsValid } from '../../utils/validators'

const PublishFeedForm: React.FC = () => {
  const [tags, setTags] = useState([] as string[])

  const tagsRef = useRef(tags)
  tagsRef.current = tags

  const removeTag = useCallback((tag: string) => {
    setTags(tagsRef.current.filter(t => t !== tag))
  }, [])

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim()
    const regex = new RegExp(`^${trimmed}$`, 'i')
    if (tagsRef.current.find(t => t.search(regex) !== -1)) {
      return
    }

    setTags([...tagsRef.current, trimmed])
  }, [])

  const [text, setText] = useState('')
  const textRef = useRef(text)
  textRef.current = text

  const [images, setImages] = useState([] as any[])
  const imageRef = useRef(images)
  imageRef.current = images

  const onDrop = useCallback((files: any, urls: any) => {
    setImages(files)
  }, [])

  const [imageShown, setImageShown] = useState(false)
  const imageShownRef = useRef(imageShown)
  imageShownRef.current = imageShown

  const [tagsShown, setTagsShown] = useState(false)
  const tagsShownRef = useRef(tagsShown)
  tagsShownRef.current = tagsShown

  const clearHandler = () => {
    setImages([])
    setText('')
    setTags([])
    setImageShown(false)
    setTagsShown(false)
    scrollToTop()
  }

  const imageLoader = <div className={styles.imageBox}>
        <ImageLoader buttonText='Choose image' onChange={onDrop} />
    </div>

  const tagsEditor = <div className={styles.tagSelector}>
        <div className={styles.inputField}>
            <InputField placeholder='input tag' submit={addTag} clearAfter buttonText='Add' />
        </div>
        <TagsContainer tags={tags} action={removeTag} />
    </div>

  const imageClickHandler = useCallback(() => {
    setImageShown(!imageShownRef.current)
  }, [])

  const tagsClickHandler = useCallback(() => {
    if (tagsShownRef.current) {
      setTagsShown(false)
      setTags([])
    } else {
      setTagsShown(true)
    }
  }, [])

  const self = useSelector(selfSelector)

  const textChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }, [])

  const publishFeed = useCallback(() => {
    if (!postIsValid(textRef.current, imageRef.current)) {
      return
    }

    uploadImage(imageRef.current[0], 'images/posts/', true)
      .then(async (imageUrl) => await createPost(self?.id ?? '', imageUrl, textRef.current, tagsRef.current))
      .then((postId) => {
        if (postId) {
          clearHandler()
        }
      })
  }, [])

  if (self === null) {
    return <Loader />
  }

  return (
        <div className={styles.container}>
            <div className={styles.mainBox}>
                    <UserCard avatar={self.avatar} id={self.id} />
                    <input className={styles.input} onChange={textChanged} value={text} type='text' placeholder='How you doing' />
                </div>
                <div className={styles.controllButtons}>
                    <Button activated={imageShownRef.current} action={imageClickHandler}>Image</Button>
                    <Button activated={tagsShownRef.current} action={tagsClickHandler}>Tags</Button>
                    <Button type='submit' action={publishFeed} main>Post</Button>
                </div>
                {(imageShownRef.current || tagsShownRef.current) && <div className={styles.optionsBox}>
                    {imageShownRef.current && imageLoader}
                    {tagsShownRef.current && tagsEditor}
                </div>}
        </div>
  )
}

export default PublishFeedForm
