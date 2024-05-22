export const getFullDate = dateForConvert => {
	console.log(dateForConvert.getMilliseconds())

	return (
		dateForConvert.getFullYear() +
		'-' +
		(+dateForConvert.getMonth() + 1 < 10
			? '0' + (+dateForConvert.getMonth() + 1)
			: +dateForConvert.getMonth() + 1) +
		'-' +
		(dateForConvert.getDate() < 10
			? '0' + dateForConvert.getDate()
			: dateForConvert.getDate()) +
		'T' +
		(dateForConvert.getHours() < 10
			? '0' + dateForConvert.getHours()
			: dateForConvert.getHours()) +
		':' +
		(dateForConvert.getMinutes() < 10
			? '0' + dateForConvert.getMinutes()
			: dateForConvert.getMinutes()) +
		':' +
		dateForConvert.getMilliseconds()
	)
}
