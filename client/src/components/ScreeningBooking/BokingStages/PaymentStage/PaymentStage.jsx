import { screeningBookingState } from '../../../../store/store';
import styles from './paymentStage.module.css';

const PaymentStage = () => {
	const [selectedSeats, { cost }] = screeningBookingState(state => [
		state.selectedSeats,
		state.screeningBooking
	]);

	return (
		<div className={styles['payment']}>
			<h2 className={styles.title}>Оплата</h2>
			<div className={styles.selected__seats}>
				<h3 className={styles.selected__seats__title}>Детали заказа</h3>
				<div className={styles['seats']}>
					{selectedSeats.map((seat, index) => (
						<div key={index} className={styles.selected__seat}>
							<div className={styles.selected__seat__info}>
								<div className={styles.seat__info}>
									{seat.row + ' ряд, ' + seat.number + ' место'}
								</div>
							</div>
							<div className={styles.seat_price}>{cost + ' ₽'}</div>
						</div>
					))}
				</div>
				<hr className={styles['line']} />
				<div className={styles['total']}>
					<p className={styles['total__text']}>К оплате:</p>
					<p className={styles['total__price']}>
						{selectedSeats.reduce((sum, seat) => sum + +cost, 0) + ' ₽'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentStage;
