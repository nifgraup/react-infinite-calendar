'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
	'root': 'Cal__Header__root',
	'blank': 'Cal__Header__blank',
	'wrapper': 'Cal__Header__wrapper',
	'landscape': 'Cal__Header__landscape',
	'dateWrapper': 'Cal__Header__dateWrapper',
	'day': 'Cal__Header__day',
	'active': 'Cal__Header__active',
	'year': 'Cal__Header__year',
	'date': 'Cal__Header__date'
};
var animation = {
	'enter': 'Cal__Animation__enter',
	'enterActive': 'Cal__Animation__enterActive',
	'leave': 'Cal__Animation__leave',
	'leaveActive': 'Cal__Animation__leaveActive'
};

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return (0, _reactAddonsShallowCompare2.default)(this, nextProps);
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames;

			var _props = this.props,
			    display = _props.display,
			    layout = _props.layout,
			    locale = _props.locale,
			    scrollToDate = _props.scrollToDate,
			    selectedDate = _props.selectedDate,
			    setDisplay = _props.setDisplay,
			    shouldHeaderAnimate = _props.shouldHeaderAnimate,
			    theme = _props.theme;

			var values = selectedDate && [{
				item: 'year',
				value: selectedDate.year(),
				active: display === 'years',
				title: display === 'days' ? 'Change year' : null,
				handleClick: function handleClick(e) {
					e && e.stopPropagation();
					setDisplay('years');
				}
			}, {
				item: 'day',
				key: selectedDate.format('YYYYMMDD'),
				value: selectedDate.format(locale.headerFormat),
				active: display === 'days',
				title: display === 'days' ? 'Scroll to ' + selectedDate.format(locale.headerFormat) : null,
				handleClick: function handleClick(e) {
					e && e.stopPropagation();

					if (display !== 'days') {
						setDisplay('days');
					} else if (selectedDate) {
						scrollToDate(selectedDate, -40);
					}
				}
			}];

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(style.root, (_classNames = {}, _defineProperty(_classNames, style.blank, !selectedDate), _defineProperty(_classNames, style.landscape, layout == 'landscape'), _classNames)), style: theme && { backgroundColor: theme.headerColor, color: theme.textColor.active } },
				selectedDate ? _react2.default.createElement(
					'div',
					{ className: style.wrapper, 'aria-label': selectedDate.format(locale.headerFormat + ' YYYY') },
					values.map(function (_ref) {
						var handleClick = _ref.handleClick,
						    item = _ref.item,
						    key = _ref.key,
						    value = _ref.value,
						    active = _ref.active,
						    title = _ref.title;

						return _react2.default.createElement(
							'div',
							{ key: item, className: (0, _classnames2.default)(style.dateWrapper, style[item], _defineProperty({}, style.active, active)), title: title },
							_react2.default.createElement(
								_CSSTransitionGroup2.default,
								{ transitionName: animation, transitionEnterTimeout: 250, transitionLeaveTimeout: 250, transitionEnter: shouldHeaderAnimate, transitionLeave: shouldHeaderAnimate },
								_react2.default.createElement(
									'span',
									{ key: item + '-' + (key || value), className: style.date, 'aria-hidden': true, onClick: handleClick },
									value
								)
							)
						);
					})
				) : _react2.default.createElement(
					'div',
					{ className: style.wrapper },
					locale.blank
				)
			);
		}
	}]);

	return Header;
}(_react.Component);

Header.propTypes = {
	layout: _propTypes2.default.string,
	locale: _propTypes2.default.object,
	onClick: _propTypes2.default.func,
	selectedDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
	shouldHeaderAnimate: _propTypes2.default.bool,
	theme: _propTypes2.default.object,
	display: _propTypes2.default.string
};
exports.default = Header;