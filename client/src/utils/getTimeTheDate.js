export default function getTimeTheDate(date) {
	return `${new Date(date).getHours()}:${
		new Date(date).getMinutes() == 0
			? new Date(date).getMinutes() + '0'
			: new Date(date).getMinutes()
	}`
}
