import cn from 'classnames';
import { useUserBookingsState } from '../../store/store';
import { formatDate } from '../../utils/formatDate';
import styles from './bookingsList.module.css';
import { useMemo } from 'react';
import SceletonBox from '../UI/SceletonBox/SceletonBox';
import Swal from 'sweetalert2';

const BookingsList = () => {
	const [bookingsData, cancleBooking, isLoadingData, isErrorMessage] =
		useUserBookingsState(state => [
			state.bookingsData,
			state.cancleBooking,
			state.isLoadingData,
			state.isErrorMessage
		]);

	const sortedBookingsData = useMemo(() => {
		const bookings = [...bookingsData];

		return bookings.sort((a, b) =>
			new Date(a.timePurchase) > new Date(b.timePurchase) ? 1 : -1
		);
	}, [bookingsData]);

	const handleClick = async id => {
		const result = await Swal.fire({
			title: 'Вы действительно хотите отменить бронирование?',
			showCancelButton: true,
			confirmButtonText: 'Ок',
			cancelButtonText: 'Отмена',
			confirmButtonColor: '#0030e2',
			cancelButtonColor: '#d33',
			showLoaderOnConfirm: true,
			preConfirm: async () => await cancleBooking(id, Swal),
			allowOutsideClick: () => !Swal.isLoading()
		});
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Бронирование отменено!',
				confirmButtonColor: '#0030e2',
				icon: 'success'
			});
		}
	};
	return (
		<div className={styles['bookings__list']}>
			{isLoadingData ? (
				[...new Array(6)].map(item => <SceletonBox width={360} height={394} />)
			) : isErrorMessage ? (
				<div>{isErrorMessage}</div>
			) : (
				sortedBookingsData.map(bookingData => {
					const {
						id,
						timePurchase,
						status,
						screening: {
							screeningStart,
							movie: { title, posterLink, genres }
						}
					} = bookingData;

					const isCancel = new Date() < new Date(screeningStart);
					console.log(timePurchase);
					console.log(screeningStart);

					return (
						<div key={id} className={styles['booking__card']}>
							<div
								className={
									status === 'success' ? styles['success'] : styles['canceled']
								}
							>
								{status === 'success' ? 'Оплачен' : 'Отменен'}
							</div>
							<div className={styles['booking__row']}>
								<div className={styles['image']}>
									<img src={posterLink} alt='img' />
								</div>
								<div className={styles['movie__info']}>
									<h2 className={styles['movie__title']}>{title}</h2>
									<div className={styles['genres']}>
										{genres.map(({ genre }) => (
											<div key={genre.name} className={styles['genre']}>
												{genre.name}
											</div>
										))}
									</div>
								</div>
							</div>
							<div>
								<div className={styles['times']}>
									<p className={styles['time__block']}>
										<span className={styles['time']}>Дата покупки:</span>{' '}
										{formatDate(timePurchase)}
									</p>
									<p className={styles['time__block']}>
										<span className={styles['time']}>Дата и время сеанса:</span>{' '}
										{formatDate(screeningStart)}
									</p>
								</div>

								<button
									onClick={() => handleClick(id)}
									className={cn(styles['btn__cancle'], {
										[styles['disabled']]: status === 'canceled' || !isCancel
									})}
								>
									Отменить
								</button>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default BookingsList;
