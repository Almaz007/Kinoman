import ChoiseElem from './choiseElem/ChoiseElem';
import styles from './choiseBlock.module.css';

const ChoiseBlock = ({ setTab, tab, choiseData }) => {
	return (
		<div className={styles.choise__block}>
			{choiseData.map((choise, index) => (
				<ChoiseElem
					key={index}
					data={choise}
					active={choise.text === tab}
					changeChoise={() => setTab(choise.text)}
				/>
			))}
		</div>
	);
};

export default ChoiseBlock;
