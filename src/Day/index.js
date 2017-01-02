import React from 'react';
const style = require('./Day.scss');

export default function Day({currentYear, date, day, handleDayClick, isDisabled, isToday, isSameMonth, isSelected, monthShort, locale, theme, renderMonthDay, onDayMouseDown, onDayMouseUp, onDayMouseEnter}) {
  var {date: mmt, yyyymmdd} = date;
  var year = mmt.year();

  function handleEvent(handler, day) {
    if (!handler) {
      return undefined;
    }
    return (e) => {
      e.persist();
      handler(e, day);
    };
  }

  return (
    <li
      className={`${style.root}${isToday ? ' ' + style.today : ''}${isSelected ? ' ' + style.selected : ''}${isDisabled ? ' ' + style.disabled : ' ' + style.enabled}`}
      data-date={yyyymmdd}
      onClick={(!isDisabled && handleDayClick && !onDayMouseDown)
        ? handleDayClick.bind(this, mmt)
        : null}
      onMouseDown={onDayMouseDown && !isDisabled
        ? handleEvent(onDayMouseDown, mmt)
        : null}
      onMouseUp={onDayMouseUp && !isDisabled
        ? handleEvent(onDayMouseUp, mmt)
        : null}
      onMouseEnter={onDayMouseUp && !isDisabled
        ? handleEvent(onDayMouseEnter, mmt)
        : null}
      >
      <span className={style.day}>{day}</span>
      {typeof renderMonthDay == 'function' && renderMonthDay(mmt)}

      {(day === 1) &&
        <span className={style.month}>
          {monthShort}
          {(day === 1 && currentYear !== year) &&
            <span className={style.year}>{year}</span>
          }
        </span>
      }

      {/* {isSelected &&
        <div className={style.selection} style={{backgroundColor: (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor, color: theme.textColor.active}}>
          <span className={style.month}>{(isToday) ? (locale.todayLabel.short || locale.todayLabel.long) : monthShort}</span>
          <span className={style.day}>{day}</span>
        </div>
      }  */}
    </li>
  );
}
