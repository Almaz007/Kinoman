import React from 'react';
import ContentLoader from 'react-content-loader';

const ImgLoader = props => (
	<ContentLoader
		speed={2}
		width={170}
		height={170}
		viewBox='0 0 170 170'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<rect x='163' y='417' rx='0' ry='0' width='1' height='2' />
		<circle cx='86' cy='85' r='85' />
	</ContentLoader>
);

export default ImgLoader;
