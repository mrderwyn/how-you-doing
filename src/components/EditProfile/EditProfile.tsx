import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selfSelector } from '../../redux/selectors'

import InputField from '../InputField/InputField'

import Loader from '../Loader/Loader'
import { updateUserInfo } from '../../redux/actions/selfActions'
import EditImageField from '../EditImageField/EditImageField'

import styles from './EditProfile.module.css'

const EditProfile: React.FC = () => {
  const self = useSelector(selfSelector)

  const dispatch = useDispatch()

  const updateName = (name: string) => {
    dispatch(updateUserInfo({ name }) as any)
  }

  const updateDescription = (description: string) => {
    dispatch(updateUserInfo({ description }) as any)
  }

  const updateAvatar = useCallback((url: string) => {
    dispatch(updateUserInfo({ avatar: url }) as any)
  }, [])

  const updateBackground = useCallback((url: string) => {
    dispatch(updateUserInfo({ background: url }) as any)
  }, [])

  if (self == null) {
    return <Loader />
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
}

export default EditProfile
