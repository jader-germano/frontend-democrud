import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiEdit, FiHome, FiLock, FiLogIn, FiMail, FiMap, FiPhone, FiUser, FiUserPlus } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button/button.index';
import Input from '../../components/Input/input.index';
import { useToast } from '../../hooks/toast';
import { apiPostOffice } from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { AnimationContainer, Container, Content, TableContainer } from './styles';

interface UserFormData {
	name: string;
	username: string;
	email: string;
	cpf: string;
	password: string;
	address: AdressFormData;
	contacts: ContactFormData[];
}

interface AdressFormData {
	id: number;
	logradouro: string;
	bairro: string;
	localidade: string;
	complemento: string;
	uf: string;
	cep: string;
}

interface ContactFormData {
	id: number;
	description: string;
	type: string;
}


const UserDetail: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const [contactFormArray, setContactFormArray] = useState<ContactFormData[]>([]);

	const onChangeHandler = ((e: React.KeyboardEvent<HTMLInputElement>): void => {
		const cep = e.currentTarget.value.replace(/\s|[:alpha:]/g, '');
		if (Number(cep.length) > 7) { searchCep(Number(cep)); }
	});


	const onCpfChangeHandler = ((e: React.FocusEvent<HTMLInputElement>): void => {
		const cpf = e.currentTarget.value.replace(/\s|[:alpha:]/g, '');
		formRef.current?.setFieldValue('cpf', cpf);

		const cpfFormatado = e.currentTarget.value.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4");
		formRef.current?.setFieldValue('cpf', cpfFormatado);
	});

	const onEmailChangeHandler = ((e: React.FocusEvent<HTMLInputElement>): void => {
		const email = e.currentTarget.value.replace(/\s/g, '');
		formRef.current?.setFieldValue('email', email);

		const index = contactFormArray.findIndex(c => c.description === email);
		if (email.match(/^\S+@\S+\.\S+$/)) {
			if (index === -1 && email.length) { setContactFormArray([...contactFormArray, { id: contactFormArray.length, description: email, type: 'EMAIL' }]); }
		}

	});

	const onPhoneChangeHandler = ((e: React.FocusEvent<HTMLInputElement>): void => {
		const phone = e.currentTarget.value.replace(/\s|[:alpha:]/g, '');
		formRef.current?.setFieldValue('phone', phone);

		const phoneFormatado = phone.replace(/(\d{2})?(\d{5})?(\d{4})/, "($1) $2-$3");
		formRef.current?.setFieldValue('phone', phoneFormatado);

		const index = contactFormArray.findIndex(c => c.description === phoneFormatado);
		if (index === -1 && phone.length) { setContactFormArray([...contactFormArray, { id: contactFormArray.length, description: phoneFormatado, type: 'PHONE' }]); }


	});

	const searchCep = async function (zipCode: number) {
		const response = await apiPostOffice.get(`${zipCode}/json`);
		const { cep, logradouro, complemento, bairro, localidade, uf } = response.data;
		const adressFormData = { cep, logradouro, complemento, bairro, localidade, uf } as AdressFormData;
		console.log(adressFormData);

		formRef.current?.setFieldValue('cep', cep);
		formRef.current?.setFieldValue('logradouro', logradouro);
		formRef.current?.setFieldValue('complemento', complemento);
		formRef.current?.setFieldValue('bairro', bairro);
		formRef.current?.setFieldValue('localidade', localidade);
		formRef.current?.setFieldValue('uf', uf);
	};

	const handleSubmit = useCallback(

		async (data: UserFormData) => {
			try {
				formRef.current?.setErrors({});
				const schema = Yup.object().shape({
					name: Yup.string().required('Nome é obrigatório'),
					username: Yup.string().required('Login é obrigatório '),
					contacts: Yup.array().required('Login é obrigatório '),
					email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
					cpf: Yup.string().required('CPF é obrigatório '),
					password: Yup.string().min(6, 'Senha obrigatória. Mínimo de 6 dígitos'),
					cep: Yup.string().min(6, 'Senha obrigatória. Mínimo de 6 dígitos'),
					logradouro: Yup.string().required('Endereço é obrigatório'),
					phone: Yup.string().required('Telefone é obrigatório'),
					bairro: Yup.string().required('Bairro é obrigatório'),
					uf: Yup.string().required('UF é obrigatório'),
					localidade: Yup.string().required('Cidade é obrigatório'),
					type: Yup.string().required('Tipo é obrigatório'),
					description: Yup.string().min(6, 'Senha obrigatória. Mínimo de 6 dígitos'),
				});
				await schema.validate(data, {
					abortEarly: false,
				});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}
				addToast({
					type: 'error',
					title: 'Erro na operação',
					description: 'Ocorreu um erro ao salvar formulário. Tente novamente.',
				});
			}
		},
		[addToast],
	);
	return (
		<Container>
			<Content>
				<AnimationContainer >
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Detalhes Usuário</h1>
						<Input name="name" icon={FiUser} placeholder="Nome Completo" />
						<Input name="username" icon={FiLogIn} placeholder="Login" />
						<Input name="cpf" onBlur={onCpfChangeHandler} maxLength={11}
							icon={FiUserPlus} placeholder="CPF" />
						<Input name="password" icon={FiLock} type="password" placeholder="Senha" />

						<h4>Contatos</h4>
						<Input name="email" onBlur={onEmailChangeHandler} title="Adicione um ou mais e-mails"
							icon={FiMail} placeholder="E-mail" />
						<Input name="phone" onBlur={onPhoneChangeHandler} title="Adicione um ou mais telefones"
							type="string" maxLength={11} icon={FiPhone} placeholder="Telefone" />
						<TableContainer>
							<table id="style-1">
								<thead>
									<tr>
										<th>Descrição</th>
										<th>Tipo</th>
									</tr>
								</thead>

								{contactFormArray.map((contact) => (
									<tbody key={contact.id}>
										<tr>
											<td className="title">{contact.description}</td>
											<td>{contact.type}</td>
										</tr>
									</tbody>
								))}
							</table>
						</TableContainer>

						<h4>Endereço</h4>
						<Input onKeyUpCapture={onChangeHandler}
							name="cep" icon={FiMap} placeholder="Cep" />
						<Input name="logradouro" icon={FiHome} placeholder="Endereço" />
						<Input name="bairro" icon={FiEdit} placeholder="Bairro" />
						<Input name="localidade" icon={FiMap} placeholder="Cidade" />
						<Input name="uf" icon={FiEdit} placeholder="Estado" />
						<Input name="complemento" icon={FiEdit} placeholder={`Complemento`} />
						<Button name="submit" disabled={false} type="submit">
							Salvar
                        </Button>
					</Form>

				</AnimationContainer>
			</Content>
		</Container>
	);
};

export default UserDetail;
