import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { ColDef, DataGrid } from '@material-ui/data-grid';
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
import { AnimationContainer, Container, Content } from './styles';

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

const columns: ColDef[] = [
	{ field: 'description', headerName: 'Descrição', width: 130 },
	{ field: 'type', headerName: 'Tipo', width: 90 },
];

const rows = [
	{ id: 1, description: 'A', type: 'Jon' },
	{ id: 2, description: 'B', type: 'Jon' },
	{ id: 3, description: 'C', type: 'Jon' },
	{ id: 4, description: 'D', type: 'Jon' },
	{ id: 5, description: 'E', type: 'Jon' },
	{ id: 6, description: 'F', type: 'Jon' },
	
];


const useStyles = makeStyles({

	table: {
		minHeight: 220,
		background: '#312e38',
		fontFamily: "'Roboto Slab', serif",
		color: 'grey',
		border: 'none',
		borderRadius: '10px',
		borderColor: 'grey',
		colorPrimary: 'ff9900'
	},

});

const UserDetail: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const [zipCode, setZipCode] = useState('');
	const { addToast } = useToast();
	const classes = useStyles();

	const onChangeHandler = ((e: React.KeyboardEvent<HTMLInputElement>): void => {
		const cep = e.currentTarget.value.replace('-', '');
		console.log(cep, cep.length);
		setZipCode(cep);
		if (Number(cep.length) > 7) { searchCep(Number(cep)); }
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
						<Input name="cpf" icon={FiUserPlus} placeholder="CPF" />
						<Input name="password" icon={FiLock} type="password" placeholder="Senha" />
						<Input name="passwordCheck" icon={FiLock} type="password" placeholder="Confimr a senha" />

						<h4>Contatos</h4>
						<Input name="email" icon={FiMail} placeholder="E-mail" />
						<Input name="phone" icon={FiPhone} placeholder="Telefone" />
						<div style={{ margin: '50', position: 'relative' }}>
							<DataGrid className={classes.table} aria-label="customized table" rows={rows} columns={columns} pageSize={2} checkboxSelection />
						</div>

						<h4 style={{ paddingTop: '215px' }}>Endereço</h4>
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
