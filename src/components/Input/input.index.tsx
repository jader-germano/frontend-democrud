import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { InputContainer, Error } from './input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
    pattern?: string;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, pattern, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    const handleInputFocused = useCallback(() => {
        setIsFocused(true);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);
    return (
        <InputContainer hasErrors={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={16} />}
            <input
                onFocus={handleInputFocused}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                pattern={pattern}
                {...rest}
            />
            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#d11919" size={22} />
                </Error>
            )}
        </InputContainer>
    );
};
export default Input;
