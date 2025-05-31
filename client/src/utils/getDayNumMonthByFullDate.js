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

export function getDayMonth(date) {
	return date.split('-')[2].slice(0, 2) + ' ' + months[+date.split('-')[1]];
}
export function getHourMinutesByTime(time) {
	return `${Math.trunc(time / 60) && Math.trunc(time / 60) + ' ч'}  ${
		time % 60
	} м`;
}
