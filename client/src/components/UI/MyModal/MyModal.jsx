import cn from 'classnames';
import styles from './myModal.module.css';
import { Transition } from 'react-transition-group';
import { useRef } from 'react';

export default function MyModal({ visible, setVisible, children }) {
	const nodeRef = useRef(null);

	return (
		<Transition
			nodeRef={nodeRef}
			in={visible}
			timeout={350}
			unmountOnExit={true}
		>
			{state => (
				<div
					ref={nodeRef}
					className={cn(styles['modal'], styles[`modal__${state}`])}
				>
					<div
						className={styles['modal__wrapper']}
						onClick={() => setVisible(false)}
					>
						<div
							className={styles['modal__content']}
							onClick={e => e.stopPropagation()}
							onMouseOver={e => e.stopPropagation()}
						>
							{children}
						</div>
						<div
							className={styles['close__modal']}
							onClick={() => setVisible(false)}
						>
							<div className={styles['close__btn']}>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				</div>
			)}
		</Transition>
	);
}
