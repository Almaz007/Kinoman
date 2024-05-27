import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { authState } from '../../../store/store';
import { authUserLinks } from '../../../routes/authUserLinks';
import DropdownLink from '../DropdownLink/DropdownLink';
import { useContext } from 'react';
import { dropdownContext } from '../DropDownProfile';
import { useNavigate } from 'react-router-dom';

import styles from './dropdownList.module.css';

export default function DropdownList() {
	const { dropdownVisible, setDropdownVisible } = useContext(dropdownContext);
	const navigate = useNavigate();

	const handleLogOut = authState(state => state.handleLogOut);
	return (
		<ul>
			{authUserLinks.map((link, index) => (
				<DropdownLink
					key={index}
					path={link.path}
					icon={link.icon}
					text={link.text}
					handleClick={() => setDropdownVisible(false)}
				/>
			))}
			<hr className={styles['line']} />
			<DropdownLink
				icon={faArrowRightFromBracket}
				text={'Выйти'}
				handleClick={() => {
					setDropdownVisible(false);
					handleLogOut(navigate);
				}}
			/>
		</ul>
	);
}
