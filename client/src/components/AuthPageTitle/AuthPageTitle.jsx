import cn from 'classnames';
import styles from './authPageTitle.module.css';

export default function AdminPageTitle({ title, className, ...deleteProps }) {
	return <h2 className={cn(styles['title'], className)}>{title}</h2>;
}
