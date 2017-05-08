'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _utils = require('./utils');

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Today = require('./Today');

var _Today2 = _interopRequireDefault(_Today);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Weekdays = require('./Weekdays');

var _Weekdays2 = _interopRequireDefault(_Weekdays);

var _Years = require('./Years');

var _Years2 = _interopRequireDefault(_Years);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerStyle = {
	'root': 'Cal__Container__root',
	'landscape': 'Cal__Container__landscape',
	'wrapper': 'Cal__Container__wrapper',
	'listWrapper': 'Cal__Container__listWrapper'
};
var dayStyle = {
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
var style = {
	container: containerStyle,
	day: dayStyle
};

var InfiniteCalendar = function (_Component) {
	_inherits(InfiniteCalendar, _Component);

	function InfiniteCalendar(props) {
		_classCallCheck(this, InfiniteCalendar);

		// Initialize
		var _this = _possibleConstructorReturn(this, (InfiniteCalendar.__proto__ || Object.getPrototypeOf(InfiniteCalendar)).call(this));

		_this.onDaySelect = function (selectedDate, e) {
			var shouldHeaderAnimate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.shouldHeaderAnimate;
			var _this$props = _this.props,
			    afterSelect = _this$props.afterSelect,
			    beforeSelect = _this$props.beforeSelect,
			    onSelect = _this$props.onSelect;


			if (!beforeSelect || typeof beforeSelect == 'function' && beforeSelect(selectedDate)) {
				if (typeof onSelect == 'function') {
					onSelect(selectedDate, e);
				}

				_this.setState({
					selectedDate: selectedDate,
					shouldHeaderAnimate: shouldHeaderAnimate,
					highlightedDate: selectedDate.clone()
				}, function () {
					_this.clearHighlight();
					if (typeof afterSelect == 'function') {
						afterSelect(selectedDate);
					}
				});
			}
		};

		_this.getCurrentOffset = function () {
			return _this.scrollTop;
		};

		_this.getDateOffset = function (date) {
			return _this.list && _this.list.getDateOffset(date);
		};

		_this.scrollTo = function (offset) {
			return _this.list && _this.list.scrollTo(offset);
		};

		_this.scrollToDate = function () {
			var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _moment2.default)();
			var offset = arguments[1];

			return _this.list && _this.list.scrollToDate(date, offset);
		};

		_this.getScrollSpeed = (0, _utils.getScrollSpeed)();

		_this.onScroll = function (_ref) {
			var scrollTop = _ref.scrollTop;
			var _this$props2 = _this.props,
			    onScroll = _this$props2.onScroll,
			    showOverlay = _this$props2.showOverlay,
			    showTodayHelper = _this$props2.showTodayHelper;
			var isScrolling = _this.state.isScrolling;

			var scrollSpeed = _this.scrollSpeed = Math.abs(_this.getScrollSpeed(scrollTop));
			_this.scrollTop = scrollTop;

			// We only want to display the months overlay if the user is rapidly scrolling
			if (showOverlay && scrollSpeed >= 50 && !isScrolling) {
				_this.setState({
					isScrolling: true
				});
			}

			if (showTodayHelper) {
				_this.updateTodayHelperPosition(scrollSpeed);
			}
			if (typeof onScroll == 'function') {
				onScroll(scrollTop);
			}
			_this.onScrollEnd();
		};

		_this.onScrollEnd = (0, _debounce2.default)(function () {
			var _this$props3 = _this.props,
			    onScrollEnd = _this$props3.onScrollEnd,
			    showTodayHelper = _this$props3.showTodayHelper;
			var isScrolling = _this.state.isScrolling;


			if (isScrolling) _this.setState({ isScrolling: false });
			if (showTodayHelper) _this.updateTodayHelperPosition(0);
			if (typeof onScrollEnd == 'function') onScrollEnd(_this.scrollTop);
		}, 150);

		_this.updateTodayHelperPosition = function (scrollSpeed) {
			var date = _this.today.date;
			if (!_this.todayOffset) _this.todayOffset = _this.getDateOffset(date); //scrollTop offset of the month "today" is in

			var scrollTop = _this.scrollTop;
			var showToday = _this.state.showToday;
			var _this$props4 = _this.props,
			    height = _this$props4.height,
			    rowHeight = _this$props4.rowHeight,
			    todayHelperRowOffset = _this$props4.todayHelperRowOffset;

			var newState = void 0;
			var dayOffset = Math.ceil((date.date() - 7 + (0, _moment2.default)(date).startOf("month").day()) / 7) * rowHeight; //offset of "today" within its month

			if (scrollTop >= _this.todayOffset + dayOffset + rowHeight * (todayHelperRowOffset + 1)) {
				if (showToday !== 1) newState = 1; //today is above the fold
			} else if (scrollTop + height <= _this.todayOffset + dayOffset + rowHeight - rowHeight * (todayHelperRowOffset + 1)) {
				if (showToday !== -1) newState = -1; //today is below the fold
			} else if (showToday && scrollSpeed <= 1) {
				newState = false;
			}

			if (scrollTop == 0) {
				newState = false;
			}

			if (newState != null) {
				_this.setState({ showToday: newState });
			}
		};

		_this.handleKeyDown = function (e) {
			var _this$props5 = _this.props,
			    maxDate = _this$props5.maxDate,
			    minDate = _this$props5.minDate,
			    onKeyDown = _this$props5.onKeyDown;
			var _this$state = _this.state,
			    display = _this$state.display,
			    selectedDate = _this$state.selectedDate,
			    highlightedDate = _this$state.highlightedDate,
			    showToday = _this$state.showToday;

			var delta = 0;

			if (typeof onKeyDown == 'function') {
				onKeyDown(e);
			}
			if ([_utils.keyCodes.left, _utils.keyCodes.up, _utils.keyCodes.right, _utils.keyCodes.down].indexOf(e.keyCode) > -1 && typeof e.preventDefault == 'function') {
				e.preventDefault();
			}

			if (!selectedDate) {
				selectedDate = (0, _moment2.default)();
			}

			if (display == 'days') {
				if (!highlightedDate) {
					highlightedDate = selectedDate.clone();
					_this.setState({ highlightedDate: highlightedDate });
				}

				switch (e.keyCode) {
					case _utils.keyCodes.enter:
						_this.onDaySelect((0, _moment2.default)(highlightedDate), e);
						return;
					case _utils.keyCodes.left:
						delta = -1;
						break;
					case _utils.keyCodes.right:
						delta = +1;
						break;
					case _utils.keyCodes.down:
						delta = +7;
						break;
					case _utils.keyCodes.up:
						delta = -7;
						break;
				}

				if (delta) {
					var rowHeight = _this.props.rowHeight;

					var newHighlightedDate = (0, _moment2.default)(highlightedDate).add(delta, 'days');

					// Make sure the new highlighted date isn't before min / max
					if (newHighlightedDate.isBefore(minDate)) {
						newHighlightedDate = (0, _moment2.default)(minDate);
					} else if (newHighlightedDate.isAfter(maxDate)) {
						newHighlightedDate = (0, _moment2.default)(maxDate);
					}

					// Update the highlight indicator
					_this.clearHighlight();

					// Scroll the view
					if (!_this.currentOffset) _this.currentOffset = _this.getCurrentOffset();
					var currentOffset = _this.currentOffset;
					var monthOffset = _this.getDateOffset(newHighlightedDate);
					var navOffset = showToday ? 36 : 0;

					var highlightedEl = _this.highlightedEl = _this.node.querySelector('[data-date=\'' + newHighlightedDate.format('YYYYMMDD') + '\']');

					// Edge-case: if the user tries to use the keyboard when the new highlighted date isn't rendered because it's too far off-screen
					// We need to scroll to the month of the new highlighted date so it renders
					if (!highlightedEl) {
						_this.scrollTo(monthOffset - navOffset);
						return;
					}

					highlightedEl.classList.add(style.day.highlighted);

					var dateOffset = highlightedEl.offsetTop - rowHeight;
					var newOffset = monthOffset + dateOffset;

					if (currentOffset !== newOffset) {
						_this.currentOffset = newOffset;
						_this.scrollTo(newOffset - navOffset);
					}

					// Update the reference to the currently highlighted date
					_this.setState({
						highlightedDate: newHighlightedDate
					});
				}
			} else if (display == 'years' && _this.refs.years) {
				_this.refs.years.handleKeyDown(e);
			}
		};

		_this.setDisplay = function (display) {
			_this.setState({ display: display });
		};

		_this.updateLocale(props.locale);
		_this.updateYears(props);
		_this.state = {
			selectedDate: _this.parseSelectedDate(props.selectedDate),
			display: props.display,
			shouldHeaderAnimate: props.shouldHeaderAnimate
		};
		return _this;
	}

	_createClass(InfiniteCalendar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    autoFocus = _props.autoFocus,
			    keyboardSupport = _props.keyboardSupport;

			this.node = this.refs.node;
			this.list = this.refs.List;

			if (keyboardSupport && autoFocus) {
				this.node.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			var _props2 = this.props,
			    min = _props2.min,
			    minDate = _props2.minDate,
			    max = _props2.max,
			    maxDate = _props2.maxDate,
			    locale = _props2.locale,
			    selectedDate = _props2.selectedDate,
			    onDayMouseDown = _props2.onDayMouseDown;
			var display = this.state.display;


			if (next.locale !== locale) {
				this.updateLocale(next.locale);
			}
			if (next.min !== min || next.minDate !== minDate || next.max !== max || next.maxDate !== maxDate) {
				this.updateYears(next);
			}
			if (next.selectedDate !== selectedDate) {
				var parsed = this.parseSelectedDate(next.selectedDate);
				this.setState({
					selectedDate: parsed
				});
				if (parsed && !onDayMouseDown) {
					this.scrollToDate(parsed);
				}
			} else if (next.minDate !== minDate || next.maxDate !== maxDate) {
				// Need to make sure the currently selected date is not before the new minDate or after maxDate
				var _selectedDate = this.parseSelectedDate(this.state.selectedDate);
				if (!_selectedDate.isSame(this.state.selectedDate, 'day')) {
					this.setState({
						selectedDate: _selectedDate
					});
				}
			}
			if (next.display !== display) {
				this.setState({
					display: next.display
				});
			}
		}
	}, {
		key: 'parseSelectedDate',
		value: function parseSelectedDate(selectedDate) {
			if (selectedDate) {
				selectedDate = (0, _moment2.default)(selectedDate);

				// Selected Date should not be before min date or after max date
				if (selectedDate.isBefore(this._minDate)) {
					return this._minDate;
				} else if (selectedDate.isAfter(this._maxDate)) {
					return this._maxDate;
				}
			}

			return selectedDate;
		}
	}, {
		key: 'updateYears',
		value: function updateYears() {
			var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

			var min = this._min = (0, _moment2.default)(props.min);
			var max = this._max = (0, _moment2.default)(props.max);
			this._minDate = (0, _moment2.default)(props.minDate);
			this._maxDate = (0, _moment2.default)(props.maxDate);

			this.years = (0, _range2.default)(min.year(), max.year() + 1).map(function (year) {
				return (0, _utils.getMonthsForYear)(year, min, max);
			});
			this.months = [].concat.apply([], this.years);
		}
	}, {
		key: 'updateLocale',
		value: function updateLocale(locale) {
			locale = this.getLocale(locale);
			_moment2.default.updateLocale(locale.name, locale);
			_moment2.default.locale(locale.name);
		}
	}, {
		key: 'getDisabledDates',
		value: function getDisabledDates(disabledDates) {
			return disabledDates && disabledDates.map(function (date) {
				return (0, _moment2.default)(date).format('YYYYMMDD');
			});
		}
	}, {
		key: 'getLocale',
		value: function getLocale() {
			var customLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.locale;

			return Object.assign({}, _locale2.default, customLocale);
		}
	}, {
		key: 'getTheme',
		value: function getTheme() {
			var customTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.theme;

			return Object.assign({}, _theme2.default, customTheme);
		}
	}, {
		key: 'clearHighlight',
		value: function clearHighlight() {
			if (this.highlightedEl) {
				this.highlightedEl.classList.remove(style.day.highlighted);
				this.highlightedEl = null;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    className = _props3.className,
			    disabledDays = _props3.disabledDays,
			    height = _props3.height,
			    hideYearsOnSelect = _props3.hideYearsOnSelect,
			    keyboardSupport = _props3.keyboardSupport,
			    layout = _props3.layout,
			    overscanMonthCount = _props3.overscanMonthCount,
			    min = _props3.min,
			    minDate = _props3.minDate,
			    max = _props3.max,
			    maxDate = _props3.maxDate,
			    showTodayHelper = _props3.showTodayHelper,
			    showHeader = _props3.showHeader,
			    longWeekdays = _props3.longWeekdays,
			    tabIndex = _props3.tabIndex,
			    width = _props3.width,
			    other = _objectWithoutProperties(_props3, ['className', 'disabledDays', 'height', 'hideYearsOnSelect', 'keyboardSupport', 'layout', 'overscanMonthCount', 'min', 'minDate', 'max', 'maxDate', 'showTodayHelper', 'showHeader', 'longWeekdays', 'tabIndex', 'width']);

			var disabledDates = this.getDisabledDates(this.props.disabledDates);
			var locale = this.getLocale();
			var theme = this.getTheme();
			var _state = this.state,
			    display = _state.display,
			    isScrolling = _state.isScrolling,
			    selectedDate = _state.selectedDate,
			    showToday = _state.showToday,
			    shouldHeaderAnimate = _state.shouldHeaderAnimate;

			var today = this.today = (0, _utils.parseDate)((0, _moment2.default)());

			// Selected date should not be disabled
			if (selectedDate && (disabledDates && disabledDates.indexOf(selectedDate.format('YYYYMMDD')) !== -1 || disabledDays && disabledDays.indexOf(selectedDate.day()) !== -1)) {
				selectedDate = null;
			}

			return _react2.default.createElement(
				'div',
				{
					tabIndex: tabIndex,
					onKeyDown: keyboardSupport && this.handleKeyDown,
					className: (0, _classnames2.default)(className, style.container.root, _defineProperty({}, style.container.landscape, layout == 'landscape')),
					style: { color: theme.textColor.default, width: width },
					'aria-label': 'Calendar',
					ref: 'node' },
				showHeader && _react2.default.createElement(_Header2.default, {
					selectedDate: selectedDate,
					shouldHeaderAnimate: shouldHeaderAnimate,
					layout: layout,
					theme: theme,
					locale: locale,
					scrollToDate: this.scrollToDate,
					setDisplay: this.setDisplay,
					display: display }),
				_react2.default.createElement(
					'div',
					{ className: style.container.wrapper },
					_react2.default.createElement(_Weekdays2.default, { theme: theme, longWeekdays: longWeekdays }),
					_react2.default.createElement(
						'div',
						{ className: style.container.listWrapper },
						showTodayHelper && _react2.default.createElement(_Today2.default, { scrollToDate: this.scrollToDate, show: showToday, today: today, theme: theme, locale: locale }),
						_react2.default.createElement(_List2.default, _extends({
							ref: 'List'
						}, other, {
							width: width,
							height: height,
							selectedDate: (0, _utils.parseDate)(selectedDate),
							disabledDates: disabledDates,
							disabledDays: disabledDays,
							months: this.months,
							onDaySelect: this.onDaySelect,
							onScroll: this.onScroll,
							isScrolling: isScrolling,
							today: today,
							renderMonthDay: this.props.renderMonthDay,
							min: (0, _utils.parseDate)(min),
							minDate: (0, _utils.parseDate)(minDate),
							maxDate: (0, _utils.parseDate)(maxDate),
							theme: theme,
							locale: locale,
							overscanMonthCount: overscanMonthCount
						}))
					),
					display == 'years' && _react2.default.createElement(_Years2.default, {
						ref: 'years',
						width: width,
						height: height,
						onDaySelect: this.onDaySelect,
						minDate: minDate,
						maxDate: maxDate,
						selectedDate: selectedDate,
						theme: theme,
						years: (0, _range2.default)((0, _moment2.default)(min).year(), (0, _moment2.default)(max).year() + 1),
						setDisplay: this.setDisplay,
						scrollToDate: this.scrollToDate,
						hideYearsOnSelect: hideYearsOnSelect
					})
				)
			);
		}
	}]);

	return InfiniteCalendar;
}(_react.Component);

InfiniteCalendar.defaultProps = {
	width: 400,
	height: 500,
	rowHeight: 56,
	overscanMonthCount: 4,
	todayHelperRowOffset: 4,
	layout: 'portrait',
	display: 'days',
	selectedDate: new Date(),
	min: { year: 1980, month: 0, day: 0 },
	minDate: { year: 1980, month: 0, day: 0 },
	max: { year: 2050, month: 11, day: 31 },
	maxDate: { year: 2050, month: 11, day: 31 },
	keyboardSupport: true,
	autoFocus: true,
	shouldHeaderAnimate: true,
	showOverlay: true,
	showTodayHelper: true,
	showHeader: true,
	tabIndex: 1,
	locale: {},
	theme: {},
	hideYearsOnSelect: true,
	longWeekdays: false
};
InfiniteCalendar.propTypes = {
	selectedDate: _utils.validDate,
	min: _utils.validDate,
	max: _utils.validDate,
	minDate: _utils.validDate,
	maxDate: _utils.validDate,
	locale: _propTypes2.default.object,
	theme: _propTypes2.default.object,
	width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	height: _propTypes2.default.number,
	rowHeight: _propTypes2.default.number,
	className: _propTypes2.default.string,
	overscanMonthCount: _propTypes2.default.number,
	todayHelperRowOffset: _propTypes2.default.number,
	disabledDays: _propTypes2.default.arrayOf(_propTypes2.default.number),
	disabledDates: _propTypes2.default.arrayOf(_utils.validDate),
	beforeSelect: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	onDayMouseDown: _propTypes2.default.func,
	onDayMouseUp: _propTypes2.default.func,
	onDayMouseEnter: _propTypes2.default.func,
	afterSelect: _propTypes2.default.func,
	onScroll: _propTypes2.default.func,
	onScrollEnd: _propTypes2.default.func,
	keyboardSupport: _propTypes2.default.bool,
	autoFocus: _propTypes2.default.bool,
	onKeyDown: _propTypes2.default.func,
	renderMonthDay: _propTypes2.default.func,
	tabIndex: _propTypes2.default.number,
	layout: _propTypes2.default.oneOf(['portrait', 'landscape']),
	display: _propTypes2.default.oneOf(['years', 'days']),
	hideYearsOnSelect: _propTypes2.default.bool,
	shouldHeaderAnimate: _propTypes2.default.bool,
	showOverlay: _propTypes2.default.bool,
	showTodayHelper: _propTypes2.default.bool,
	showHeader: _propTypes2.default.bool,
	longWeekdays: _propTypes2.default.bool
};
exports.default = InfiniteCalendar;