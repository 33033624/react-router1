'use strict';

var React = require('react');
var moment = require('moment');
var assign = require('object-assign');

var FORMAT = require('./utils/format');
var asConfig = require('./utils/asConfig');
var toMoment = require('./toMoment');
var onEnter = require('./onEnter');
var assign = require('object-assign');

var TODAY;

function emptyFn() {}

var DecadeView = React.createClass({

    displayName: 'DecadeView',

    getDefaultProps: function getDefaultProps() {
        return asConfig();
    },

    /**
     * Returns all the years in the decade of the given value
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getYearsInDecade: function getYearsInDecade(value) {
        var year = moment(value).get('year');
        var offset = year % 10;

        year = year - offset - 1;

        var result = [];
        var i = 0;

        var start = moment(year, 'YYYY').startOf('year');

        for (; i < 12; i++) {
            result.push(moment(start));
            start.add(1, 'year');
        }

        return result;
    },

    render: function render() {

        TODAY = +moment().startOf('day');

        var props = assign({}, this.props);

        var viewMoment = props.viewMoment = moment(this.props.viewDate);

        if (props.date) {
            props.moment = moment(props.date).startOf('year');
        }

        var yearsInView = this.getYearsInDecade(viewMoment);

        return React.createElement(
            'div',
            { className: 'dp-table dp-decade-view' },
            this.renderYears(props, yearsInView)
        );
    },

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderYears: function renderYears(props, days) {
        var nodes = days.map(function (date, index, arr) {
            return this.renderYear(props, date, index, arr);
        }, this);
        var len = days.length;
        var buckets = [];
        var bucketsLen = Math.ceil(len / 4);

        var i = 0;

        for (; i < bucketsLen; i++) {
            buckets.push(nodes.slice(i * 4, (i + 1) * 4));
        }

        return buckets.map(function (bucket, i) {
            return React.createElement(
                'div',
                { key: "row" + i, className: 'dp-row' },
                bucket
            );
        });
    },

    renderYear: function renderYear(props, date, index, arr) {
        var yearText = FORMAT.year(date, props.yearFormat);
        var classes = ["dp-cell dp-year"];

        var dateTimestamp = +date;

        if (dateTimestamp == props.moment) {
            classes.push('dp-value');
        }

        if (!index) {
            classes.push('dp-prev');
        }

        if (index == arr.length - 1) {
            classes.push('dp-next');
        }

        var onClick = this.handleClick.bind(this, props, date);

        return React.createElement(
            'div',
            {
                role: 'link',
                tabIndex: '1',
                key: yearText,
                className: classes.join(' '),
                onClick: onClick,
                onKeyUp: onEnter(onClick)
            },
            yearText
        );
    },

    handleClick: function handleClick(props, date, event) {
        event.target.value = date;(props.onSelect || emptyFn)(date, event);
    }
});

DecadeView.getHeaderText = function (value, props) {
    var year = moment(value).get('year');
    var offset = year % 10;

    year = year - offset - 1;

    return year + ' - ' + (year + 11);
};

module.exports = DecadeView;