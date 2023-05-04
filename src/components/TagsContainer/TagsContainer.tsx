import React, { useCallback } from 'react';

import styles from './TagsContainer.module.css';

const TagsContainer = ({ tags, action }: any) => {
    const clickHandler = useCallback((event: any) =>{
        event.preventDefault();
        action(event.target.innerText);
    }, []);

    return (
        <div className={styles.container}>
            {tags.map((tag: any) =>
                <button className={styles.tag} onClick={clickHandler} key={tag}>{tag}</button>
                )}
        </div>
    );
}

export default TagsContainer;