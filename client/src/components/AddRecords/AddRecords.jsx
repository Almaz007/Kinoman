import { useState, useRef } from 'react';

import styles from './addRecord.module.css';
import PlusMinusBtn from '../UI/PlusMinusBtn/PlusMinusBtn';
import cn from 'classnames';
import { Transition } from 'react-transition-group';

export default function AddRecords({ children }) {
	const [show, setShow] = useState(false);
	const nodeRef = useRef(null);

	return (
		<div className={styles['add__records']}>
			<PlusMinusBtn active={show} setActive={setShow} />
			<Transition in={show} nodeRef={nodeRef} timeout={300}>
				{state => (
					<div
						ref={nodeRef}
						className={cn(styles['add__block'], styles[state])}
					>
						{children}
					</div>
				)}
			</Transition>
		</div>
	);
}
