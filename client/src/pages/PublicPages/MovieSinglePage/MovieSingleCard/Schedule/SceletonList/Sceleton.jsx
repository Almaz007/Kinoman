import React from 'react'
import ContentLoader from 'react-content-loader'

const DateSceleton = ({ options }) => (
	<ContentLoader
		speed={2}
		{...options}
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<rect x='0' y='0' rx='7' ry='7' {...options} />
	</ContentLoader>
)

export default DateSceleton
