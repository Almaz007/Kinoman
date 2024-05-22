export default function getMaxRow(data) {
	const maxObject = data.reduce((max, obj) => {
		if (obj.row > max.row) {
			return obj
		} else {
			return max
		}
	})
	return maxObject.row
}
