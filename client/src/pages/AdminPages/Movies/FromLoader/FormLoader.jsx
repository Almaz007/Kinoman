import SceletonBox from '../../../../components/UI/SceletonBox/SceletonBox';
import styles from './formLoader.module.css';

const FormLoader = () => {
	return (
		<>
			<div className={styles['formLoader']}>
				{[...new Array(8)].map((item, index) => (
					<SceletonBox key={index} width={300} height={56} />
				))}
				<SceletonBox width={620} height={264} />
			</div>
			<SceletonBox width={120} height={45} className={styles['btn']} />
		</>
	);
};

export default FormLoader;
