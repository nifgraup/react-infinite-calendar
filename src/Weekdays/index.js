import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import range from 'lodash/range';
import {scrollbarSize} from '../utils';
const style = require('./Weekdays.scss');


export default class Weekdays extends Component {
	static propTypes = {
		locale: PropTypes.object,
		theme: PropTypes.object,
    longWeekdays: PropTypes.bool
	};
	shouldComponentUpdate(nextProps) {
		return shallowCompare(this, nextProps);
	}
	render() {
		let {theme, longWeekdays} = this.props;

		return (
			<ul className={style.root} style={{backgroundColor: theme.weekdayColor, color: theme.textColor.active, paddingRight: scrollbarSize}} aria-hidden={true}>
				{range(0,7).map((val, index) => {
					return (
						<li key={`Weekday-${index}`} className={style.day}>
              { longWeekdays
                ? moment().weekday(index).format('dddd')
                : moment().weekday(index).format('ddd')
              }
						</li>
					);
				})}
			</ul>
		);
	}
}
