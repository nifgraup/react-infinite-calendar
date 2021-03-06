'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Day = require('../Day');

var _Day2 = _interopRequireDefault(_Day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
	'root': 'Cal__Month__root',
	'rows': 'Cal__Month__rows',
	'row': 'Cal__Month__row',
	'partial': 'Cal__Month__partial',
	'label': 'Cal__Month__label',
	'partialFirstRow': 'Cal__Month__partialFirstRow'
};

var Month = function (_Component) {
	_inherits(Month, _Component);

	function Month() {
		_classCallCheck(this, Month);

		return _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).apply(this, arguments));
	}

	_createClass(Month, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return !nextProps.isScrolling && !this.props.isScrolling;
		}
	}, {
		key: 'renderRows',
		value: function renderRows() {
			var _props = this.props,
			    disabledDates = _props.disabledDates,
			    disabledDays = _props.disabledDays,
			    displayDate = _props.displayDate,
			    locale = _props.locale,
			    maxDate = _props.maxDate,
			    minDate = _props.minDate,
			    onDaySelect = _props.onDaySelect,
			    rowHeight = _props.rowHeight,
			    rows = _props.rows,
			    selectedDate = _props.selectedDate,
			    today = _props.today,
			    theme = _props.theme,
			    renderMonthDay = _props.renderMonthDay,
			    onDayMouseDown = _props.onDayMouseDown,
			    onDayMouseUp = _props.onDayMouseUp,
			    onDayMouseEnter = _props.onDayMouseEnter;

			var currentYear = today.date.year();
			var monthShort = displayDate.format('MMM');
			var monthRows = [];
			var day = 0;
			var isDisabled = false;
			var isSelected = false;
			var isToday = false;
			var isSameMonth = false;
			var row = void 0,
			    date = void 0,
			    days = void 0;

			// Oh the things we do in the name of performance...
			for (var i = 0, len = rows.length; i < len; i++) {
				row = rows[i];
				days = [];

				for (var k = 0, _len = row.length; k < _len; k++) {
					date = row[k];
					day++;
					isSelected = selectedDate && date.yyyymmdd == selectedDate.yyyymmdd;
					isSameMonth = selectedDate && date.yyyymmdd.substring(0, 6) == selectedDate.yyyymmdd.substring(0, 5);
					isToday = today && date.yyyymmdd == today.yyyymmdd;
					isDisabled = minDate && date.yyyymmdd < minDate.yyyymmdd || maxDate && date.yyyymmdd > maxDate.yyyymmdd || disabledDays && disabledDays.length && disabledDays.indexOf(date.date.day()) !== -1 || disabledDates && disabledDates.length && disabledDates.indexOf(date.yyyymmdd) !== -1;

					days[k] = _react2.default.createElement(_Day2.default, {
						key: 'day-' + day,
						currentYear: currentYear,
						date: date,
						day: day,
						handleDayClick: onDaySelect,
						isDisabled: isDisabled,
						isToday: isToday,
						isSameMonth: isSameMonth,
						isSelected: isSelected,
						renderMonthDay: renderMonthDay,
						onDayMouseDown: onDayMouseDown,
						onDayMouseUp: onDayMouseUp,
						onDayMouseEnter: onDayMouseEnter,
						locale: locale,
						monthShort: monthShort,
						theme: theme
					});
				}
				monthRows[i] = _react2.default.createElement(
					'ul',
					{ className: (0, _classnames2.default)(style.row, _defineProperty({}, style.partial, row.length !== 7)), style: { height: rowHeight }, key: 'Row-' + i, role: 'row', 'aria-label': 'Week ' + (i + 1) },
					days
				);
			}

			return monthRows;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    displayDate = _props2.displayDate,
			    today = _props2.today,
			    rows = _props2.rows,
			    showOverlay = _props2.showOverlay,
			    rowStyle = _props2.rowStyle,
			    theme = _props2.theme;


			return _react2.default.createElement(
				'div',
				{ className: style.root, style: rowStyle },
				_react2.default.createElement(
					'div',
					{ className: style.rows },
					this.renderRows(),
					showOverlay && _react2.default.createElement(
						'label',
						{ className: (0, _classnames2.default)(style.label, _defineProperty({}, style.partialFirstRow, rows[0].length !== 7)), style: theme && theme.overlayColor && { backgroundColor: theme.overlayColor } },
						_react2.default.createElement(
							'span',
							null,
							'' + displayDate.format('MMMM') + (!displayDate.isSame(today.date, 'year') ? ' ' + displayDate.year() : '')
						)
					)
				)
			);
		}
	}]);

	return Month;
}(_react.Component);

exports.default = Month;