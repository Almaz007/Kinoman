import cn from 'classnames';
import styles from './MyButton.module.css';

const MyButton = ({ children, className, ...props }) => {
	return (
		<button {...props} className={cn(styles.myBtn, className)}>
			{children}
		</button>
	);
};

export default MyButton;
