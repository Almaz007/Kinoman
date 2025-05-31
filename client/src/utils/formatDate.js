export function formatDate(dateString) {
	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	];

	const date = new Date(dateString);
	const day = date.getDate();
	const month = months[date.getMonth()];
	const time = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});
	const year = date.getFullYear();

	return `${day} ${month} ${time} ${year}`;
}
