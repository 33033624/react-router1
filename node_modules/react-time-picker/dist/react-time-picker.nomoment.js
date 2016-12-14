(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "React"], factory);
	else if(typeof exports === 'object')
		exports["ReactTimePicker"] = factory(require("moment"), require("React"));
	else
		root["ReactTimePicker"] = factory(root["moment"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(15);
	var assign = __webpack_require__(11);
	var _normalize = __webpack_require__(12);
	var moment = __webpack_require__(2);

	var toUpperFirst = __webpack_require__(4);

	var getFormat = __webpack_require__(8);
	var getFormatInfo = __webpack_require__(3);

	var hasTouch = __webpack_require__(9);

	var EVENT_NAMES = __webpack_require__(10);

	var WHITESPACE = ' ';

	function emptyFn() {}

	var twoDigits = __webpack_require__(5);
	var _format = __webpack_require__(6);
	var formatTime = __webpack_require__(7);

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(23);
	var assign = __webpack_require__(11);

	module.exports = function validHour(value, config) {
		config = assign({}, config);

		config.twoDigits = config.len == 2;

		var meridian = config.meridian;

		if (validNumber(value, config)) {
			value *= 1;

			if (meridian) {
				return 0 <= value && value <= 12;
			}

			return 0 <= value && value < 24;
		}

		return false;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function getHourInfo(format, value) {
		var len = 1;
		var specified = false;
		var full = false;

		var index = format.indexOf('h');

		if (~index) {
			specified = true;
			if (format.charAt(index + 1) == 'h') {
				len++;
			}
		} else {
			index = format.indexOf('H');
			full = true;
			if (~index) {
				specified = true;
				if (format.charAt(index + 1) == 'H') {
					len++;
				}
			}
		}

		return {
			full: full,
			len: len,
			specified: specified
		};
	}

	function getMinuteInfo(format, value) {
		var len = 1;
		var specified = false;
		var index = format.indexOf('m');

		if (~index) {
			specified = true;
			if (format.charAt(index + 1) == 'm') {
				len++;
			}
		}

		return {
			len: len,
			specified: specified
		};
	}

	function getSecondInfo(format, value) {
		var len = 1;
		var specified = false;
		var index = format.indexOf('s');

		if (~index) {
			specified = true;
			if (format.charAt(index + 1) == 's') {
				len++;
			}
		}

		return {
			len: len,
			specified: specified
		};
	}

	function isMeridianUpperCase(format, value) {
		var uppercase = true;
		var specified = false;
		var index = format.indexOf('a');

		if (~index) {
			specified = true;
			uppercase = false;
		} else if (~format.indexOf('A')) {
			specified = true;
		}

		return {
			uppercase: uppercase,
			lowercase: !uppercase,
			specified: specified
		};
	}

	module.exports = function (format) {

		if (typeof format != 'string') {
			return {
				hour: { specified: false },
				minute: { specified: false },
				second: { specified: false },
				meridian: { specified: false }
			};
		}

		return {
			hour: getHourInfo(format),
			minute: getMinuteInfo(format),
			second: getSecondInfo(format),
			meridian: isMeridianUpperCase(format)
		};
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (str) {
			return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function twoDigits(value) {
			return value < 10 ? '0' + value : value;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var twoDigits = __webpack_require__(5);
	var getFormatInfo = __webpack_require__(3);

	module.exports = function (name, value, formatOrInfo) {

		var formatInfo = formatOrInfo;

		if (!formatInfo || !formatInfo.hour || typeof formatInfo == 'string') {
			formatInfo = getFormatInfo(formatInfo);
		}

		if (!formatInfo) {
			return;
		}

		var info = formatInfo[name];

		if (value && name === 'meridian' && info.specified) {
			return info.uppercase ? value.toUpperCase() : value.toLowerCase();
		}

		return info.specified ? info.len == 2 ? twoDigits(value) : value : '';
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var twoDigits = __webpack_require__(5);
	var getFormatInfo = __webpack_require__(3);
	var formatFunction = __webpack_require__(6);

	function identity(x) {
		return x;
	}

	module.exports = function (time, format) {

		var hourFormat = twoDigits;
		var minuteFormat = twoDigits;
		var secondFormat = twoDigits;
		var meridianFormat = identity;

		if (format) {
			var formatInfo = typeof format == 'string' ? getFormatInfo(format) : format;

			if (formatInfo.hour.specified) {
				hourFormat = function () {
					return formatFunction('hour', time.hour, formatInfo);
				};
			}

			if (formatInfo.minute.specified) {
				minuteFormat = function () {
					return formatFunction('minute', time.minute, formatInfo);
				};
			}

			if (formatInfo.second.specified) {
				secondFormat = function () {
					return formatFunction('second', time.second, formatInfo);
				};
			}

			if (formatInfo.meridian.specified) {
				meridianFormat = function () {
					return formatFunction('meridian', time.meridian, formatInfo);
				};
			}
		}

		var result = [];

		if (time.hour != null) {
			result.push(hourFormat(time.hour));
		}

		if (time.minute != null) {
			result.push(minuteFormat(time.minute));
		}

		if (time.second != null) {
			result.push(secondFormat(time.second));
		}

		var str = result.join(':');

		if (time.meridian) {
			str += ' ' + meridianFormat(time.meridian);
		}

		return str;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(11);
	var defaults = __webpack_require__(13);

	function trim(str) {
		return str.trim();
	}

	function notEmpty(x) {
		return !!x;
	}

	var isValidPart = __webpack_require__(14);

	var validHour = __webpack_require__(1);
	var validMinute = __webpack_require__(16);
	var validSecond = __webpack_require__(17);
	var validMeridian = __webpack_require__(18);

	function getHour(value, config) {
		if (validHour(value, assign({}, config, config.hour))) {
			return value // * 1
			;
		}
	}

	function getMinute(value, config) {
		if (validMinute(value, assign({}, config, config.minute))) {
			return value // * 1
			;
		}
	}

	function getSecond(value, config) {
		if (validSecond(value, assign({}, config, config.second))) {
			return value // * 1
			;
		}
	}

	function getMeridian(value, config) {
		if (validMeridian(value, assign({}, config, config.meridian))) {
			return value;
		}
	}

	function hasMeridian(str) {
		var parts = str.split(' ');

		return parts.length > 1;
	}

	var GET_MAP = {
		hour: getHour,
		minute: getMinute,
		second: getSecond,
		meridian: getMeridian
	};

	function get(name) {
		return GET_MAP[name];
	}

	function parseLast(str, partName, config) {
		config = assign({}, config, config ? config[partName] : null);

		var withMeridian = config.meridian;

		var parts = str.split(' ').map(trim);
		var getFn = get(partName);
		var result = {
			invalid: []
		};

		var partValue;
		var meridian;

		if (isValidPart(partName, parts[0], config)) {
			if (getFn) {
				partValue = getFn(parts[0], config);
			}
		} else {
			result.invalid.push({
				name: partName,
				value: parts[0]
			});
		}

		if (withMeridian) {
			meridian = getMeridian(parts[1], config);

			if (meridian === undefined) {
				result.invalid.push({
					name: 'meridian',
					value: parts[1]
				});
			}
		}

		if (meridian !== undefined) {
			result.meridian = meridian;
		}
		if (partValue !== undefined) {
			result[partName] = partValue;
		}

		return result;
	}

	function parse(time, config) {

		config = assign({}, defaults, config);

		var parts = time.split(config.separator).map(trim);
		var withMeridian = hasMeridian(parts[parts.length - 1]);

		config.meridian = withMeridian;

		var invalids = [];
		var result = {};
		var hour;
		var minute;

		if (parts.length > 3) {
			return;
		}

		if (parts.length == 1) {
			//hh am
			assign(result, parseLast(parts[0], 'hour', config));
		}
		if (parts.length == 2) {
			//hh:mm am
			hour = getHour(parts[0], config);
			if (hour === undefined) {
				invalids.push({
					name: 'hour',
					value: parts[0]
				});
			}
			assign(result, parseLast(parts[1], 'minute', config));
		}
		if (parts.length == 3) {
			//hh:mm:ss am
			hour = getHour(parts[0], config);
			minute = getMinute(parts[1], config);

			if (hour === undefined) {
				invalids.push({
					name: 'hour',
					value: parts[0]
				});
			}

			if (minute === undefined) {
				invalids.push({
					name: 'minute',
					value: parts[1]
				});
			}

			assign(result, parseLast(parts[2], 'second', config));
		}

		if (result.invalid) {
			invalids.push.apply(invalids, result.invalid);
			result.invalid = invalids;
		}

		if (hour !== undefined) {
			result.hour = hour;
		}

		if (minute !== undefined) {
			result.minute = minute;
		}

		if (!result.invalid.length) {
			delete result.invalid;
		}

		return result;
	}

	module.exports = function getFormat(timeString) {

		if (typeof timeString != 'string') {
			return;
		}

		var time = parse(timeString);

		var format = '';
		var hourFormat = '';
		var minuteFormat = '';
		var secondFormat = '';
		var meridianFormat = '';

		if (time.meridian != undefined) {
			meridianFormat = time.meridian == 'AM' || time.meridian == 'PM' ? 'A' : 'a';
		}

		if (time.hour != undefined) {
			hourFormat = meridianFormat ? time.hour.length == 1 ? 'h' : 'hh' : time.hour.length == 1 ? 'H' : 'HH';
		}

		if (time.minute != undefined) {
			minuteFormat = time.minute.length == 1 ? 'm' : 'mm';
		}

		if (time.second != undefined) {
			secondFormat = time.second.length == 1 ? 's' : 'ss';
		}

		format = [hourFormat, minuteFormat, secondFormat].filter(notEmpty).join(':');

		if (meridianFormat) {
			format += ' ' + meridianFormat;
		}

		return format;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = 'ontouchstart' in global || (global.DocumentTouch && document instanceof DocumentTouch)
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9)?
		{
			onMouseDown: 'onTouchStart',
			onMouseUp  : 'onTouchEnd',
			onMouseMove: 'onTouchMove'
		}:
		{
			onMouseDown: 'onMouseDown',
			onMouseUp  : 'onMouseUp',
			onMouseMove: 'onMouseMove'
		}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(19)
	var getPrefixed = __webpack_require__(20)

	var map      = __webpack_require__(21)
	var plugable = __webpack_require__(22)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){

		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
		separator: ':',
		twoDigits: true
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validHour = __webpack_require__(1);
	var validMinute = __webpack_require__(16);
	var validSecond = __webpack_require__(17);
	var validMeridian = __webpack_require__(18);

	var VALIDATION_MAP = {
	  hour: validHour,
	  minute: validMinute,
	  second: validSecond,
	  meridian: validMeridian
	};

	/**
	 * VALIDATES TIME PART [name, value] eg ['hour', '15']
	 *
	 * Returns whether the given value is valid for the given time part.
	 *
	 * EG:
	 * 	name: 'hour', value: 15 => true
	 * 	name: 'hour', value: '07' => true
	 *  name: 'hour', value: 15, config={meridian: true} => false
	 *
	 *  name: 'minute', value: '05' => true
	 *
	 *  name: 'second', value: 55 => true
	 *  name: 'second', value: 5 => true
	 *  name: 'second', value: '5' => false (string without two digits)
	 *  name: 'second', value: '5', {twoDigits: false} => true

	 *  name: 'meridian', value: 'PM' => true
	 *  name: 'meridian', value: 'am' => true
	 *  name: 'meridian', value: 'apm' => false
	 *
	 * @param {String} name
	 * @param {Number/String} value
	 * @param {Object} config
	 * @param {Boolean} config.meridian
	 * @param {Boolean} config.twoDigits
	 *
	 * @return {Boolean}
	 */
	module.exports = function isValidPart(name, value, config) {
	  var fn = VALIDATION_MAP[name];

	  return !!(fn && fn(value, config));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(23);
	var assign = __webpack_require__(11);

	module.exports = function validMinute(value, config) {

		config = assign({}, config);
		config.twoDigits = config.len == 2;

		if (validNumber(value, config)) {
			value *= 1;

			return 0 <= value && value < 60;
		}

		return false;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validMinute = __webpack_require__(16);
	var assign = __webpack_require__(11);

	module.exports = function validSecond(value, config) {
		config = assign({}, config);
		config.twoDigits = config.len == 2;

		return validMinute(value, config);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function validMeridian(value) {
		if (!value) {
			return false;
		}

		value = value.toUpperCase();

		return value == 'AM' || value == 'PM';
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(25)
	var properties       = __webpack_require__(26)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(24)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value, true)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(11);
	var defaults = __webpack_require__(13);

	module.exports = function validNumber(n, config) {
		var valid = !isNaN(n * 1);

		if (config) {
			config = assign({}, defaults, config);
		} else {
			config = defaults;
		}

		if (valid && typeof n == 'string' && config.twoDigits) {
			valid = n.length == 2;
		}

		if (valid) {
			n = n * 1;
			valid = parseInt(n) === n;
		}

		return valid;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(28)
	var forcePrefixed = __webpack_require__(30)
	var el            = __webpack_require__(29)

	var MEMORY = {}
	var STYLE
	var ELEMENT

	module.exports = function(key, value, force){

	    ELEMENT = ELEMENT || el()
	    STYLE   = STYLE   ||  ELEMENT.style

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (force || !(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                ELEMENT.style[prefixed] = ''
	                ELEMENT.style[prefixed] = prefixedValue

	                if (ELEMENT.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(27)
	var getPrefix    = __webpack_require__(28)
	var el           = __webpack_require__(29)

	var MEMORY = {}
	var STYLE
	var ELEMENT

	var PREFIX

	module.exports = function(key, value){

	    ELEMENT = ELEMENT || el()
	    STYLE   = STYLE   || ELEMENT.style

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        // if (PREFIX){
	        //     prefix = PREFIX
	        // } else {
	            prefix = getPrefix('appearance')

	        //     if (prefix){
	        //         prefix = PREFIX = prefix.toLowerCase()
	        //     }
	        // }

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,
	  'flexGrow': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(27)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(29)

	var ELEMENT
	var PREFIX

	module.exports = function(key){

		if (PREFIX !== undefined){
			return PREFIX
		}

		ELEMENT = ELEMENT || el()

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof ELEMENT.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}

		return PREFIX
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	module.exports = function(){

		if(!el && !!global.document){
		  	el = global.document.createElement('div')
		}

		if (!el){
			el = {style: {}}
		}

		return el
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(27)
	var getPrefix    = __webpack_require__(28)
	var properties   = __webpack_require__(26)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ }
/******/ ])
});
;