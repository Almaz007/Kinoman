import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const Input = ({ name, control, ...props }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...props}
					{...field}
					error={!!error}
					helperText={error?.message}
				/>
			)}
		/>
	);
};
