import React, { useCallback } from 'react';

import cn from 'classnames';
import styles from './Button.module.css';

const Button = ({ type, children, action, data, icon, activated, main }: any) => {
    const clickHandler = useCallback((event: any) => {
        event.preventDefault();
        action && action(data);
    }, []);

    const names = [styles.button];
    icon && names.push(styles[`icon-${icon}`]);
    activated && names.push(styles.activated);
    main && names.push(styles.main);

    return <button type={type} onClick={clickHandler} className={cn(...names)}>{children}</button>
};

export default Button;