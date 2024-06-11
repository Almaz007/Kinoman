import AddRecords from '../../../components/AddRecords/AddRecords';
import AdminPageTitle from '../../../components/AdminPageTitle/AdminPageTitle';
import styles from './screenings.module.css';

export default function Screenings() {
	return (
		<div>
			<AdminPageTitle title='Сеансы' />
			<AddRecords>
				<div style={{ height: '200px' }}></div>
				<div style={{ height: '200px' }}></div>
			</AddRecords>
			<div
				style={{ height: '150px', backgroundColor: 'red', textAlig: 'center' }}
			>
				Text
			</div>
		</div>
	);
}
