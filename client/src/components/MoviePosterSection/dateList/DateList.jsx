import { useState } from 'react'
import styles from './dateList.module.css'

const DateList = ({ dateList, selectedDate, setSelectedDate }) => {
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
		12: 'Декабря',
	}

	return (
		<ul className={styles.date__list}>
			{dateList.map((dateItem, index) => (
				<li
					key={index}
					className={dateItem === selectedDate ? styles.active : ''}
					onClick={() => {
						setSelectedDate(dateItem)
					}}
				>
					{dateItem.split('-')[2] + ' ' + months[+dateItem.split('-')[1]]}
				</li>
			))}
		</ul>
	)
}

export default DateList
