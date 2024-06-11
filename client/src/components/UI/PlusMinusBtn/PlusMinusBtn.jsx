import styles from './plusMinusBtn.module.css';
import cn from 'classnames';

export default function PlusMinusBtn({ active, setActive }) {
	return (
		<button
			className={cn(styles['button'], {
				[styles['active']]: active
			})}
			onClick={() => setActive(prev => !prev)}
		>
			<span className={cn(styles['plus'], styles['line'])}></span>
			<span className={cn(styles['minus'], styles['line'])}></span>
		</button>
	);
}
