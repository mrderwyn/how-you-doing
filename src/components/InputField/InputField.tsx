import React, { useState, useRef, useCallback } from 'react';
import Button from '../Button/Button';

import styles from './InputField.module.css';

const InputField = ({ placeholder, submit, clearAfter, autocomplete, buttonText='Input' }: any) => {
    const autoCompleteValue = !!autocomplete ? 'on' : 'off';

    const [value, setValue] = useState('');
    const valueRef = useRef(value);
    valueRef.current = value;

    const submitHandler = useCallback(() => {
        submit(valueRef.current);
        if (clearAfter) {
            setValue('');
        }
    }, [clearAfter]);

    const changeHandler = useCallback((event: any) => {
        setValue(event.target.value);
    }, []);

    return (
        <form className={styles.form} onSubmit={submitHandler} autoComplete={autoCompleteValue}>
            <input className={styles.input} type='text' placeholder={placeholder} onChange={changeHandler} value={value} />
            <Button type='submit' action={submitHandler}>{buttonText}</Button>
        </form>
    );
};

export default InputField;