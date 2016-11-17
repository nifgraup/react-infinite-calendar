'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Day;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
	'root': 'Cal__Day__root',
	'enabled': 'Cal__Day__enabled',
	'highlighted': 'Cal__Day__highlighted',
	'today': 'Cal__Day__today',
	'disabled': 'Cal__Day__disabled',
	'selected': 'Cal__Day__selected',
	'month': 'Cal__Day__month',
	'year': 'Cal__Day__year',
	'selection': 'Cal__Day__selection',
	'day': 'Cal__Day__day'
};

function Day(_ref) {
	var currentYear = _ref.currentYear,
	    date = _ref.date,
	    day = _ref.day,
	    handleDayClick = _ref.handleDayClick,
	    isDisabled = _ref.isDisabled,
	    isToday = _ref.isToday,
	    isSameMonth = _ref.isSameMonth,
	    isSelected = _ref.isSelected,
	    monthShort = _ref.monthShort,
	    locale = _ref.locale,
	    theme = _ref.theme,
	    renderMonthDay = _ref.renderMonthDay;
	var mmt = date.date,
	    yyyymmdd = date.yyyymmdd;

	var year = mmt.year();

	return _react2.default.createElement(
		'li',
		{
			className: '' + style.root + (isToday ? ' ' + style.today : '') + (isSelected ? ' ' + style.selected : '') + (isDisabled ? ' ' + style.disabled : ' ' + style.enabled),
			'data-date': yyyymmdd,
			onClick: !isDisabled && handleDayClick ? handleDayClick.bind(this, mmt) : null
		},
		_react2.default.createElement(
			'span',
			null,
			day
		),
		renderMonthDay(mmt),
		day === 1 && currentYear !== year && _react2.default.createElement(
			'span',
			{ className: style.year },
			year
		),
		day === 1 && _react2.default.createElement(
			'span',
			{ className: style.month },
			monthShort
		)
	);
}