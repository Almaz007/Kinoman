import React from 'react'
import ContentLoader from 'react-content-loader'

const MoviePosterSceleton = props => (
	<ContentLoader
		speed={2}
		width={570}
		height={390}
		viewBox='0 0 570 390'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<rect x='0' y='0' rx='5' ry='5' width='280' height='390' />
		<rect x='163' y='417' rx='0' ry='0' width='1' height='2' />
		<rect x='300' y='109' rx='8' ry='8' width='244' height='28' />
		<rect x='300' y='160' rx='8' ry='8' width='96' height='26' />
		<rect x='302' y='211' rx='8' ry='8' width='80' height='70' />
		<rect x='397' y='211' rx='8' ry='8' width='80' height='70' />
		<rect x='405' y='161' rx='8' ry='8' width='96' height='26' />
	</ContentLoader>
)

export default MoviePosterSceleton
