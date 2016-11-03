import React from 'react';
const style = require('./Day.scss');

export default function Day({currentYear, date, day, handleDayClick, isDisabled, isToday, isSameMonth, isSelected, monthShort, locale, theme, renderMonthDay}) {
	var {date: mmt, yyyymmdd} = date;
	var year = mmt.year();

	return (
		<li
			className={`${style.root}${isToday ? ' ' + style.today : ''}${isSelected ? ' ' + style.selected : ''}${isDisabled ? ' ' + style.disabled : ' ' + style.enabled}`}
			data-date={yyyymmdd}
			onClick={(!isDisabled && handleDayClick) ? handleDayClick.bind(this, mmt) : null}
		>
      <span>{day}</span>
      {renderMonthDay(mmt)}

			{(day === 1 && currentYear !== year) &&
        <span className={style.year}>{year}</span>}
      {(day === 1) &&
        <span className={style.month}>{monthShort}</span>}

			{/* {isSelected &&
				<div className={style.selection} style={{backgroundColor: (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor, color: theme.textColor.active}}>
					<span className={style.month}>{(isToday) ? (locale.todayLabel.short || locale.todayLabel.long) : monthShort}</span>
					<span className={style.day}>{day}</span>
				</div>
			}  */}
		</li>
	);
}
