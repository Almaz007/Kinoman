import { Controller } from 'react-hook-form';
import { useRef } from 'react';
import MyButton from '../button/MyButton';
import $api from '../../../http';
import styles from './controlInputFille.module.css';

const ControlInputFile = ({ setImg, img, name, control, ...props }) => {
	const fileRef = useRef(null);

	const convert2base64 = (event, onChange) => {
		const files = event.target.files;
		if (!files.length) return;

		const file = files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			onChange(file);
			setImg(reader.result.toString());
		};
		reader.readAsDataURL(file);
	};

	const handleClick = e => {
		e.preventDefault();
		fileRef.current.click();
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<div>
					<MyButton {...props} onClick={handleClick}>
						{' '}
						{img ? 'Изменить фото' : 'Загрузить фото'}
					</MyButton>
					<input
						type='file'
						ref={fileRef}
						onChange={event => convert2base64(event, onChange)}
						hidden
					/>
					{error && (
						<p className={styles['error__message']}>{error?.message}</p>
					)}
				</div>
			)}
		/>
	);
};

export default ControlInputFile;
