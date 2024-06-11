import { useRef } from 'react';
import MyButton from '../UI/button/MyButton';
import $api from '../../http';

const InputFile = props => {
	const fileInputRef = useRef(null);

	const handleChange = async event => {
		console.log(event.target.files[0]);
		const formData = new FormData();
		formData.append('image', event.target.files[0]);

		const data = await $api.post('/files/upload', formData);
		console.log(data);
	};

	const handleClick = e => {
		fileInputRef.current.click();
	};

	return (
		<div>
			<MyButton onClick={handleClick}>Загрузить изображение</MyButton>
			<input
				{...props}
				ref={fileInputRef}
				type='file'
				name='image'
				// accept='image/*'
				multiple={false}
				hidden
			/>
		</div>
	);
};

export default InputFile;
