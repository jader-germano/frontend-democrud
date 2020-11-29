import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonIndex: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <ButtonContainer type="button" {...rest}>
        {children}
    </ButtonContainer>
);

export default ButtonIndex;
