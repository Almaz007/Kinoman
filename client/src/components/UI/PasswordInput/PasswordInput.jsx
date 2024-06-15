import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton
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
				<FormControl {...field} {...props} variant='outlined'>
					<InputLabel>{label}</InputLabel>
					<OutlinedInput
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
				</FormControl>
			)}
		/>
	);
};

export default PasswordInput;
