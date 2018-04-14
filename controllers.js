'use strict';
const mongoose = require('mongoose');
const Result = require('./models');

exports.sendAllData = function(req, res) {	
	let ent = Result.find({}, function(err, entry) {
		if(err) {
			return err;
		} else {
			res.send(entry);
		}
	})
}

exports.sortBy = function(req, res) {
	let ent = Result.find({ Owner: 'Kevin Fennell' }, function(err, entry) {
		if(err) {
			return err;
		} else {
			return entry;
		}
	}).sort({ Week: 'asc', Pts: 'desc' }).then(function(val) {
		res.send(val);
	})
}