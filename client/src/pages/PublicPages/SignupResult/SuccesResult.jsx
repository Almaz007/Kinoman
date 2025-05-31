import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SuccesResult = () => {
	const navigate = useNavigate();

	Swal.fire({
		title: 'Аккаунт успешно подтвержден',
		icon: 'success',
		confirmButtonText: 'Перейти на сайт'
	}).then(res => {
		navigate('/');
	});
	return <></>;
};

export default SuccesResult;
