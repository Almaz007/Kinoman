import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const DateItem = ({ control, name, label, ...props }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker label={label} {...field} {...props} />
					{error && <p>{error?.message}</p>}
				</LocalizationProvider>
			)}
		/>
	);
};

export default DateItem;
