import styles from './myModal.module.css'
import { Transition } from 'react-transition-group'

export default function MyModal({ visible, setVisible, children }) {
	return (
		<Transition in={visible} timeout={350} unmountOnExit={true}>
			{state => (
				<>
					<div className={styles.test}></div>
					<div className={[styles.modal, styles[`modal--${state}`]].join(' ')}>
						<div
							className={styles.modalWrapper}
							onClick={() => setVisible(false)}
						>
							<div
								className={styles.modalContent}
								onClick={e => e.stopPropagation()}
								onMouseOver={e => e.stopPropagation()}
							>
								{children}
							</div>
							<div
								className={styles.close__modal}
								onClick={() => setVisible(false)}
							>
								<div className={styles.closeBtn}>
									<span></span>
									<span></span>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</Transition>
	)
}
