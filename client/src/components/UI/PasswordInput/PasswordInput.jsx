import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormHelperText
} from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const PasswordInput = ({ name, control, label, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<FormControl {...props} error={!!error} variant='outlined'>
					<InputLabel>{label}</InputLabel>
					<OutlinedInput
						{...field}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={() => setShowPassword(prev => !prev)}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
								</IconButton>
							</InputAdornment>
						}
						label={label}
					/>
					{error && <FormHelperText>{error?.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};

export default PasswordInput;
