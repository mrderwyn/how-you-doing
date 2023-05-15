import React, { ReactNode, useCallback } from 'react';

import cn from 'classnames';
import styles from './Button.module.css';

type ButtonProps = {
    type?: 'submit' | 'button' | 'reset',
    children?: ReactNode,
    action: (value: string | undefined) => void,
    data?: string,
    icon?: string,
    activated?: boolean,
    main?: boolean,
    className?: string,
};

const Button = ({ type = 'submit', children, action, data, icon, activated, main, className }: ButtonProps) => {
    const clickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        action && action(data);
    }, []);

    const names = icon ? [styles.iconButton] : [styles.button];
    className && names.push(className);
    icon && names.push(styles[`icon-${icon}`]);
    activated && names.push(styles.activated);
    main && names.push(styles.main);

    return <button type={type} onClick={clickHandler} className={cn(...names)}>
        {children}
    </button>
};

export default Button;