'use strict';

var React = require('react');
var assign = require('object-assign');
var _normalize = require('react-style-normalizer');
var moment = require('moment');

var toUpperFirst = require('./toUpperFirst');

var getFormat = require('./getFormat');
var getFormatInfo = require('./getFormatInfo');

var hasTouch = require('has-touch');

var EVENT_NAMES = require('react-event-names');

var WHITESPACE = ' ';

function emptyFn() {}

var twoDigits = require('./twoDigits');
var _format = require('./format');
var formatTime = require('./formatTime');

function identity(v) {
	return v;
}

module.exports = React.createClass({

	displayName: 'ReactTimePicker',

	componentWillUnmount: function componentWillUnmount() {
		this.stopInterval();
	},

	getInitialState: function getInitialState() {
		return {
			defaultValue: this.props.defaultValue,
			focused: {
				hour: null,
				minute: null,
				second: null,
				meridian: null
			},
			overArrow: {
				hour: null,
				minute: null,
				second: null,
				meridian: null
			}
		};
	},

	getDefaultProps: function getDefaultProps() {
		return {
			normalizeStyle: true,
			stopChangePropagation: true,
			useArrowKeys: true,

			//makes 15:78 be converted to 15:00, and not to 16:18
			strict: true,
			overflowHourToMeridian: true,

			step: 1,
			hourStep: null,
			minuteStep: null,
			secondStep: null,

			stepDelay: 60,
			showArrows: true,

			defaultStyle: {
				border: '1px solid gray',
				padding: 10,
				display: 'inline-flex',
				alignItems: 'center',
				boxSizing: 'border-box',
				flexFlow: 'row',
				width: 200
			},

			defaultArrowStyle: {
				cursor: 'pointer',
				userSelect: 'none',
				display: 'inline-block',
				alignSelf: 'stretch',
				textAlign: 'center'
			},

			defaultArrowOverStyle: {
				background: 'rgb(229, 229, 229)'
			},

			defaultArrowUpOverStyle: null,
			defaultArrowDownOverStyle: null,

			defaultArrowUpStyle: {
				marginBottom: 5
			},

			defaultArrowDownStyle: {
				marginTop: 5
			},

			defaultBoxStyle: {
				boxSizing: 'border-box',
				display: 'flex',
				flexFlow: 'column',
				alignItems: 'center'
			},

			defaultInputStyle: {
				boxSizing: 'border-box',
				width: '100%',
				textAlign: 'center'
			},

			defaultSeparatorStyle: {
				flex: 'none'
			},

			defaultMeridianInputStyle: {
				cursor: 'pointer'
			},

			defaultMeridianInputProps: {},

			// format: 'HHmmssa',
			renderHour: null,
			renderMinute: null,
			renderSecond: null,
			renderMeridian: null,

			defaultArrowFactory: React.DOM.span,

			arrowFactory: null,
			arrowUpFactory: null,
			arrowDownFactory: null,

			defaultInputFactory: React.DOM.input,
			inputFactory: null,

			hourInputFactory: null,
			minuteInputFactory: null,
			secondInputFactory: null,
			meridianInputFactory: null,

			timeToString: formatTime
		};
	},

	normalize: function normalize(style) {
		return _normalize(style);
	},

	render: function render() {
		var props = this.prepareProps(this.props, this.state);

		if (!props.normalizeStyle) {
			this.normalize = identity;
		}

		var hour = this.renderHour(props);
		var minute = this.renderMinute(props);
		var second = this.renderSecond(props);
		var meridian = this.renderMeridian(props);

		var separator = props.separator || React.createElement(
			'span',
			{ style: props.separatorStyle },
			WHITESPACE + ':' + WHITESPACE
		);
		var hourSeparator = hour && (minute || second || meridian) ? props.hourSeparator || separator : null;
		var minuteSeparator = minute && (second || meridian) ? props.minuteSeparator || separator : null;
		var secondSeparator = second && meridian ? props.secondSeparator || separator : null;

		return React.createElement(
			'div',
			props,
			hour,
			hourSeparator,
			minute,
			minuteSeparator,
			second,
			secondSeparator,
			meridian
		);
	},

	onArrowMouseEnter: function onArrowMouseEnter(props, dir, name, event) {
		var overArrow = this.state.overArrow;

		Object.keys(overArrow).forEach(function (key) {
			overArrow[key] = null;
		});

		overArrow[name] = dir;

		this.setState({});
	},

	onArrowMouseLeave: function onArrowMouseLeave(props, dir, name, event) {
		this.state.overArrow[name] = null;

		this.setState({});
	},

	onArrowMouseDown: function onArrowMouseDown(props, dir, name, event) {

		event.preventDefault();

		if (name == 'meridian') {
			this.onArrowMeridianAction(props, dir, name);
			return;
		}

		var target = hasTouch ? event.target : window;
		var eventName = hasTouch ? 'touchend' : 'click';

		target.addEventListener(eventName, this.onWindowClick);

		this.onArrowAction(props, dir, name);

		this.timeoutId = setTimeout((function () {
			this.startInterval(props, dir, name);
		}).bind(this), props.stepDelay);
	},

	onWindowClick: function onWindowClick() {
		this.stopInterval();
	},

	stopInterval: function stopInterval() {
		clearTimeout(this.timeoutId);
		clearInterval(this.intervalId);
	},

	startInterval: function startInterval(props, dir, name) {
		this.intervalId = setInterval((function () {
			this.onArrowAction(props, dir, name);
		}).bind(this), props.stepDelay);
	},

	onMeridianInputMouseDown: function onMeridianInputMouseDown(props, event) {
		//prevent focus on mouse down on meridian input
		event.preventDefault();
		//the input can still be focused by tab navigation, we're okay with that

		this.onArrowMeridianAction(props, 1, 'meridian');
	},

	onArrowMeridianAction: function onArrowMeridianAction(props, dir, name) {
		this.addTime('hour', dir * 12);
	},

	onArrowAction: function onArrowAction(props, dir, name) {

		var dirName = dir == 1 ? 'Up' : 'Down';
		var methodName = 'onArrow' + dirName + toUpperFirst(name) + 'Action';

		if (typeof this[methodName] == 'function') {
			this[methodName](props);
		}

		methodName = 'onArrow' + toUpperFirst(name) + 'Action';

		if (typeof this[methodName] == 'function') {
			this[methodName](props, dir);
		}

		this.incValue(props, name, dir);
	},

	incValue: function incValue(props, name, dir) {

		var fieldFocused = this.state.focused[name];

		if (!fieldFocused || this.lastStateChange != name) {
			dir = dir || 0;

			var step = props[name + 'Step'] || props.step;
			var amount = dir * step;

			this.addTime(name, amount);
		} else {

			var value = parseInt(fieldFocused.value, 10);

			value += dir;

			if (name == 'hour') {
				if (props.time.meridian == 'PM') {
					value += value < 12 ? 12 : 0;
				}
			}

			this.setTime(name, value);
		}

		this.lastStateChange = null;
	},

	addTime: function addTime(name, amount) {
		this.setValue(moment(this.moment).add(amount, name));
	},

	setTime: function setTime(name, value) {
		var clone = moment(this.moment);
		clone.set(name, value);

		this.setValue(clone);
	},

	setValue: function setValue(moment) {

		var props = this.p;
		var time = this.getTime(moment);

		var focused = this.state.focused;
		var newState = {};

		if (focused) {
			Object.keys(focused).forEach(function (key) {
				if (focused[key]) {
					focused[key].value = this.format(props, key, time[key]);
				}
			}, this);
		}

		var timeString = moment.format(props.format);

		if (this.props.value == null) {
			this.setState({
				defaultValue: timeString
			});
		}

		;(this.props.onChange || emptyFn)(timeString, moment, assign({}, time));
	},

	format: function format(props, name, value) {
		var renderFn;

		if (arguments.length < 3) {
			value = props.time[name];
		}

		if (name != 'meridian') {
			renderFn = props['render' + toUpperFirst(name)];
		} else {
			renderFn = props.renderMeridian;
		}

		if (!renderFn && typeof props.format == 'string') {
			var formatInfo = props.formatInfo;
			renderFn = function (value, name) {
				return _format(name, value, formatInfo);
			};
		}

		if (!renderFn) {
			renderFn = twoDigits;
		}

		if (typeof renderFn == 'function') {
			value = renderFn(value, name, props);
		}

		return value;
	},

	renderBox: function renderBox(props, name) {
		var state = this.state;
		var style = props[name + 'Style'];
		var inputStyle = props[name + 'InputStyle'];
		var upperName = toUpperFirst(name);

		var value;

		if (!state.focused[name]) {
			value = this.format(props, name);
		} else {
			value = state.focused[name].value;
		}

		var arrowUp;
		var arrowDown;

		if (props.showArrows) {
			var overArrow = this.state.overArrow[name];

			var arrowUpStyle = props.arrowUpStyle;

			if (overArrow == 1) {
				arrowUpStyle = assign({}, props.arrowUpStyle, props.defaultArrowOverStyle, props.defaultArrowUpOverStyle, props.arrowOverStyle, props.arrowUpOverStyle);
			}

			var arrowUpProps = {
				mouseOver: overArrow == 1,
				style: arrowUpStyle,
				children: '▲'
			};

			arrowUpProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, 1, name);
			arrowUpProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, 1, name);
			arrowUpProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, 1, name);

			var arrowDownStyle = props.arrowDownStyle;

			if (overArrow == -1) {
				arrowDownStyle = assign({}, props.arrowDownStyle, props.defaultArrowOverStyle, props.defaultArrowDownOverStyle, props.arrowOverStyle, props.arrowDownOverStyle);
			}

			var arrowDownProps = {
				mouseOver: overArrow == -1,
				style: arrowDownStyle,
				children: '▼'
			};

			arrowDownProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, -1, name);
			arrowDownProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, -1, name);
			arrowDownProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, -1, name);

			var defaultArrowFactory = props.defaultArrowFactory;
			var arrowUpFactory = props.arrowUpFactory || props.arrowFactory || defaultArrowFactory;
			var arrowDownFactory = props.arrowDownFactory || props.arrowFactory || defaultArrowFactory;

			arrowUp = arrowUpFactory(arrowUpProps);

			if (arrowUp === undefined) {
				arrowUp = defaultArrowFactory(arrowUpProps);
			}

			arrowDown = arrowDownFactory(arrowDownProps);
			if (arrowDown === undefined) {
				arrowDown = defaultArrowFactory(arrowDownProps);
			}
		}

		var defaultInputFactory = props.defaultInputFactory;
		var inputFactory = props[name + 'InputFactory'] || props.inputFactory || defaultInputFactory;

		var defaultInputProps = props['default' + upperName + 'InputProps'];
		var inputProps = props[name + 'InputProps'];

		var inputProps = assign({}, props.inputProps, defaultInputProps, inputProps, {
			timeName: name,
			style: inputStyle,
			value: value,
			onBlur: this.handleInputBlur.bind(this, props, name),
			onChange: this.handleInputChange.bind(this, props, name),
			onFocus: this.handleInputFocus.bind(this, props, name) });

		if (props.useArrowKeys) {
			inputProps.onKeyDown = this.handleInputKeyDown.bind(this, props, name);
		}

		if (name == 'meridian') {
			inputProps.onMouseDown = this.onMeridianInputMouseDown.bind(this, props);
		}

		var input = inputFactory(inputProps);

		if (input === undefined) {
			input = defaultInputFactory(inputProps);
		}

		return React.createElement(
			'div',
			{ style: style },
			arrowUp,
			input,
			arrowDown
		);
	},

	handleInputFocus: function handleInputFocus(props, name, event) {
		var focused = this.state.focused;

		focused[name] = {
			value: this.format(props, name)
		};

		this.stopInterval();

		this.setState({});
	},

	handleInputBlur: function handleInputBlur(props, name, event) {

		this.incValue(props, name, 0);

		this.state.focused[name] = null;
		this.setState({});
	},

	handleInputChange: function handleInputChange(props, name, event) {
		if (this.state.focused[name]) {
			this.state.focused[name].value = event.target.value;
		}

		this.lastStateChange = name;

		this.setState({});
		props.stopChangePropagation && event.stopPropagation();
	},

	/**
  * Called on keydown on all inputs, including meridian
  *
  * @param  {Object} props
  * @param  {String} name
  * @param  {Event} event
  */
	handleInputKeyDown: function handleInputKeyDown(props, name, event) {

		if (name == 'meridian') {
			var letter = String.fromCharCode(event.keyCode);
			var isMeridianLetter = letter == 'A' || letter == 'P';

			if (isMeridianLetter || event.key == ' ' //space
			 || event.key == 'Enter' || event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight') {

				event.preventDefault();

				if (isMeridianLetter && letter + 'M' == this.time.meridian) {
					return;
				}

				this.addTime('hour', 12);
				return;
			}
		}

		if (event.key === 'ArrowDown') {
			this.incValue(props, name, -1);
		}

		if (event.key === 'ArrowUp') {
			this.incValue(props, name, 1);
		}
	},

	renderHour: function renderHour(props) {
		return this.renderBox(props, 'hour');
	},

	renderMinute: function renderMinute(props) {
		if (props.showMinute) {
			return this.renderBox(props, 'minute');
		}
	},

	renderSecond: function renderSecond(props) {
		if (props.showSecond) {
			return this.renderBox(props, 'second');
		}
	},

	renderMeridian: function renderMeridian(props) {
		if (props.withMeridian) {
			return this.renderBox(props, 'meridian');
		}
	},

	toMoment: function toMoment(value, format) {
		format = format || this.prepareFormat(this.props);

		return moment(value, format);
	},

	getTime: function getTime(moment) {

		var formatInfo = this.p.formatInfo;
		var time = {};

		if (formatInfo.hour.specified) {
			time.hour = formatInfo.meridian.specified ? moment.format('h') * 1 : moment.hour();
		}

		if (formatInfo.minute.specified) {
			time.minute = moment.minute();
		}

		if (formatInfo.second.specified) {
			time.second = moment.second();
		}

		if (formatInfo.meridian.specified) {
			time.meridian = moment.format('A');
		}

		return time;
	},

	prepareFormat: function prepareFormat(props) {
		var value = props.value;
		var format = props.format || getFormat(value) || 'HH:mm:ss';

		return format;
	},

	prepareBoxes: function prepareBoxes(props) {
		var formatInfo = props.formatInfo;

		props.showSecond = formatInfo.second.specified;
		props.showMinute = formatInfo.minute.specified;
		props.withMeridian = formatInfo.meridian.specified;
	},

	getValue: function getValue() {
		var value = this.props.value == null ? this.state.defaultValue : this.props.value;

		return value;
	},

	prepareProps: function prepareProps(thisProps, state) {
		var props = this.p = assign({}, thisProps);

		props.value = this.getValue();
		props.format = this.prepareFormat(props);
		props.formatInfo = getFormatInfo(props.format);

		this.moment = props.moment = this.toMoment(props.value, props.format);
		this.time = props.time = this.getTime(props.moment);

		this.prepareBoxes(props, state);
		this.prepareStyles(props, state);

		return props;
	},

	prepareStyles: function prepareStyles(props, state) {

		props.style = this.prepareStyle(props, state);
		props.separatorStyle = this.prepareSeparatorStyle(props, state);
		this.prepareArrowStyles(props, state);

		this.prepareHourStyles(props, state);
		this.prepareMinuteStyles(props, state);
		this.prepareSecondStyles(props, state);
		this.prepareMeridianStyles(props, state);
	},

	prepareStyle: function prepareStyle(props, state) {
		return this.normalize(assign({}, props.defaultStyle, props.style));
	},

	prepareSeparatorStyle: function prepareSeparatorStyle(props, state) {
		return this.normalize(assign({}, props.defaultSeparatorStyle, props.separatorStyle));
	},

	prepareArrowStyles: function prepareArrowStyles(props, state) {
		props.arrowUpStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowUpStyle, props.arrowStyle, props.arrowUpStyle));
		props.arrowDownStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowDownStyle, props.arrowStyle, props.arrowDownStyle));
	},

	prepareHourStyles: function prepareHourStyles(props, state) {
		props.hourStyle = this.prepareHourStyle(props, state);
		props.hourInputStyle = this.prepareHourInputStyle(props, state);
	},

	prepareHourStyle: function prepareHourStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultHourStyle, props.boxStyle, props.hourStyle));
	},

	prepareHourInputStyle: function prepareHourInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultHourInputStyle, props.inputStyle, props.hourInputStyle));
	},

	prepareMinuteStyles: function prepareMinuteStyles(props, state) {
		props.minuteStyle = this.prepareMinuteStyle(props, state);
		props.minuteInputStyle = this.prepareMinuteInputStyle(props, state);
	},

	prepareMinuteStyle: function prepareMinuteStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMinuteStyle, props.boxStyle, props.minuteStyle));
	},

	prepareMinuteInputStyle: function prepareMinuteInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMinuteInputStyle, props.inputStyle, props.minuteInputStyle));
	},

	prepareSecondStyles: function prepareSecondStyles(props, state) {
		if (props.showSecond) {
			props.secondStyle = this.prepareSecondStyle(props, state);
			props.secondInputStyle = this.prepareSecondInputStyle(props, state);
		}
	},

	prepareSecondStyle: function prepareSecondStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultSecondStyle, props.boxStyle, props.secondStyle));
	},

	prepareSecondInputStyle: function prepareSecondInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultSecondInputStyle, props.inputStyle, props.secondInputStyle));
	},

	prepareMeridianStyles: function prepareMeridianStyles(props, state) {
		if (props.withMeridian) {
			props.meridianStyle = this.prepareMeridianStyle(props, state);
			props.meridianInputStyle = this.prepareMeridianInputStyle(props, state);
		}
	},

	prepareMeridianStyle: function prepareMeridianStyle(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMeridianStyle, props.boxStyle, props.meridianStyle));
	},

	prepareMeridianInputStyle: function prepareMeridianInputStyle(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMeridianInputStyle, props.inputStyle, props.meridianInputStyle));
	}
});

// readOnly: true