import styles from './bookingStages.module.css';
import { screeningBookingState } from '../../../store/store';
import SelectSeatsStage from './SelectSeatsStage/SelectSeatsStage';
import EntryDataStage from './EntryDataStage/EntryDataStage';
import PaymentStage from './PaymentStage/PaymentStage';
import ShowStage from '../ShowStage/ShowStage';
import BuyTicket from '../StageBtns/BuyTicket';
import NextPrevious from '../StageBtns/NextPrevious';
import { authState } from '../../../store/store';

const BookingStages = () => {
	const [stage, incStage, payment] = screeningBookingState(state => [
		state.stage,
		state.incStage,
		state.payment
	]);

	const [userId, isAuth] = authState(state => [
		state?.userData?.id,
		state.isAuth
	]);

	const stagesComponents = [
		<SelectSeatsStage />,
		<EntryDataStage />,
		<PaymentStage />
	];

	const btns = [
		<BuyTicket />,
		<NextPrevious handleclick={incStage} />,
		<NextPrevious handleclick={paymentAndRedirect} />
	];

	async function paymentAndRedirect() {
		const paymentUrl = await payment(userId, isAuth);
		window.location.href = paymentUrl;
	}

	return (
		<div className={styles.blockStages}>
			{stagesComponents[stage]}
			<div className={styles.controllBlock}>
				<div className={styles.payControll}>{btns[stage]}</div>
				{<ShowStage stage={stage} />}
			</div>
		</div>
	);
};

export default BookingStages;
