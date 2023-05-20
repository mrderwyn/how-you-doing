import React, { type ReactNode, useCallback } from 'react'

import cn from 'classnames'
import styles from './Button.module.css'

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset'
  children?: ReactNode
  action: ((value: string | undefined) => void) | ((value: string | undefined) => Promise<void>)
  data?: string
  icon?: string
  activated?: boolean
  main?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({ type = 'submit', children, action, data, icon, activated, main, className }: ButtonProps) => {
  const clickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    action(data)
  }, [action])

  const names = icon ? [styles.iconButton] : [styles.button]
  className && names.push(className)
  icon && names.push(styles[`icon-${icon}`])
  activated && names.push(styles.activated)
  main && names.push(styles.main)

  return <button type={type} onClick={clickHandler} className={cn(...names)}>
        {children}
    </button>
}

export default Button
