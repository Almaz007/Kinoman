import Sceleton from './Sceleton'
import styles from './sceletonList.module.css'

export default function SceletonList({ width, height, size, style }) {
	console.log(style)
	return (
		<div className={styles['dateSceletonList']} style={{ ...style }}>
			{[...new Array(size)].map((sceleton, index) => (
				<Sceleton key={index} options={{ width, height }} />
			))}
		</div>
	)
}
