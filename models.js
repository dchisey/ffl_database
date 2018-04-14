'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resultSchema = new Schema({
	owner: String,
	pts: Number,
	week: Number,
	seasonAvg: Number,
	lst8_Avg: Number,
	lst4_Avg: Number,
	mean: Number,
	high: Number,
	low: Number,
	diff: Number,
	dev: Number,
	elite: Number,
	superior: Number,
	inferior:Number,
	abyssmal: Number,
	meanPlus: Number,
	meanMinus: Number,
})

// resultSchema.methods.sortBy = function(err, results) {

// }

let WeeklyResult = mongoose.model('result', resultSchema);

module.exports = WeeklyResult;
