import { useState } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'

const override = {
	display: 'block',
	margin: '0 auto',
}

export default function Loader() {
	let [loading, setLoading] = useState(true)
	let [color, setColor] = useState('#0030E2')

	return (
		<div
			className='sweet-loading'
			style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<PropagateLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={20}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
		</div>
	)
}
