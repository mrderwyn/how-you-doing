import React, { useState, useRef, useCallback } from 'react';
import Button from '../Button/Button';

import styles from './InputField.module.css';

type InputFieldProps = {
    placeholder: string,
    submit: (value: string) => void,
    clearAfter?: boolean,
    autocomplete?: boolean,
    buttonText?: string,
    defaultValue?: string,
    main?: boolean
};

const InputField = ({ placeholder, submit, clearAfter, autocomplete, buttonText='Input', defaultValue='', main }: InputFieldProps) => {
    const autoCompleteValue = !!autocomplete ? 'on' : 'off';

    const [value, setValue] = useState(defaultValue);
    const valueRef = useRef(value);
    valueRef.current = value;

    const submitHandler = useCallback(() => {
        submit(valueRef.current);
        if (clearAfter) {
            setValue('');
        }
    }, [clearAfter]);

    const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    return (
        <form className={styles.form} onSubmit={submitHandler} autoComplete={autoCompleteValue}>
            <input className={styles.input} type='text' placeholder={placeholder} onChange={changeHandler} value={value} />
            <Button type='submit' action={submitHandler} main={main}>{buttonText}</Button>
        </form>
    );
};

export default InputField;