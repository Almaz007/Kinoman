import styles from './choiseElem.module.css';

const ChoiseElem = ({ data, active, changeChoise }) => {
	return (
		<div
			className={
				active ? [styles.active, styles.choise].join(' ') : styles.choise
			}
			onClick={() => changeChoise(data.text)}
		>
			<div className={styles.choise__icon}>{<data.icon styles={styles} />}</div>
			<div className={styles.choise__text}>{data.text}</div>
		</div>
	);
};

export default ChoiseElem;
