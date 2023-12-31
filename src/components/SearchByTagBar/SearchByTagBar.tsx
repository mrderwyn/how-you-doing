import React from 'react'

import TagsContainer from '../TagsContainer/TagsContainer'
import InputField from '../InputField/InputField'

import styles from './SearchByTagBar.module.css'

interface SearchByTagBarPropsType {
  submit: (key: string) => void
  tags: string[]
}

const SearchByTagBar: React.FC<SearchByTagBarPropsType> = ({ submit, tags }: SearchByTagBarPropsType) => {
  return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <InputField placeholder='input tag' submit={submit} buttonText='Submit' main />
            </div>
            <p>or select tag</p>
            <TagsContainer tags={tags} action={submit} />
        </div>
  )
}

export default SearchByTagBar
