import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ErrorResult = () => {
	const navigate = useNavigate();

	Swal.fire({
		icon: 'error',
		title: 'Произошла ошибка',
		confirmButtonText: 'Перейти на сайт'
	}).then(res => {
		navigate('/');
	});

	return <></>;
};

export default ErrorResult;
