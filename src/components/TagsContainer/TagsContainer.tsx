import React, { useCallback } from 'react';

import styles from './TagsContainer.module.css';

type TagsContainerPropsType = {
    tags: string[],
    action?: (key: string) => void,
};

const TagsContainer = ({ tags, action }: TagsContainerPropsType) => {
    const clickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        action && action(event.currentTarget.innerText);
    }, []);

    return (
        <div className={styles.container}>
            {tags.map(tag =>
                <button className={styles.tag} onClick={clickHandler} key={tag}>{tag}</button>
                )}
        </div>
    );
}

export default TagsContainer;