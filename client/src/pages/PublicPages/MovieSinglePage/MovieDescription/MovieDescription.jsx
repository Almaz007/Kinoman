import { useState } from 'react';
import ChoiseBlock from '../../../../components/ChoiseBlock/ChoiseBlock';
import styles from './movieDescription.module.css';
import aboutMovie from './svgElems/aboutMovie';
import movieTrailer from './svgElems/movieTrailer';
import MovieFullInfo from '../MovieSingleCard/MovieFullInfo/MovieFullInfo';

export default function MovieDescription({ movie }) {
	const [tab, setTab] = useState('О фильме');
	const months = {
		1: 'Января',
		2: 'Февраля',
		3: 'Марта',
		4: 'Апреля',
		5: 'Мая',
		6: 'Июня',
		7: 'Июля',
		8: 'Августа',
		9: 'Сентября',
		10: 'Октября',
		11: 'Ноября',
		12: 'Декабря'
	};
	const choiseData = [
		{
			icon: aboutMovie,
			text: 'О фильме'
		},
		{
			icon: movieTrailer,
			text: 'Трейлер'
		}
	];
	const tabs = {
		'О фильме': <MovieFullInfo movie={movie} months={months}></MovieFullInfo>,
		Трейлер: <div>Трейлер фильма...</div>
	};

	return (
		<div>
			<ChoiseBlock setTab={setTab} tab={tab} choiseData={choiseData} />
			{tabs[tab]}
		</div>
	);
}
