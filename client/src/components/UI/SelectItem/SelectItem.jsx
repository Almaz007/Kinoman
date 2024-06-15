import { Controller } from 'react-hook-form';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material';

const SelectItem = ({ selectItems, name, control, label, ...props }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormControl error={!!error}>
					<InputLabel id='demo-simple-select-label'>{label}</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={value}
						label={label}
						{...props}
						onChange={onChange}
					>
						{selectItems.map(item => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					{error && <FormHelperText>{error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};

export default SelectItem;
