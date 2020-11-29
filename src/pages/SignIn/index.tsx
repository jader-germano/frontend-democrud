import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiUserCheck } from 'react-icons/fi';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button/button.index';
import Input from '../../components/Input/input.index';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, AnimationContainer, Content } from './styles';

interface SignInFormData {
    username: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    username: Yup.string().required('Username obrigatorio'),
                    password: Yup.string().min(6, 'Senha obrigatória. Mínimo de 6 dígitos'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await signIn({ username: data.username, password: data.password });
                history.push('/userdetail');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description: 'Ocorreu um erro ao fazer login. Cheque as credenciais.',
                });
            }
        },
        [addToast, history, signIn],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <img src="https://www.cf.coop.br/wp-content/themes/tema-base/images/logo.png"
                            alt="" />
                        <Input name="username" icon={FiUserCheck} placeholder="Login" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        <Button name="submit" type="submit">
                            Entrar
                        </Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="#">
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignIn;
