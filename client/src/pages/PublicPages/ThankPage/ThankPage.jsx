import styles from './thankPage.module.css'

const ThankPage = () => {
	return (
		<div className={styles.thankBlock}>
			<h2 className={styles.titleThank}>Спасибо что выбираете нас!</h2>
			<img src='/images/icons/popcorn.svg' alt='popcornIcon' />
		</div>
	)
}

export default ThankPage
