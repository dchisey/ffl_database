'use strict';

const data = require('../controllers/controllers');
const mongoose = require('mongoose');
const WeeklyResult = require('../models/models');


module.exports = function(app) {

	app.post('/api/headtohead', (req, res) => {
		const firstOwner = new RegExp(req.body.firstOwner, 'i');
		const secondOwner = new RegExp(req.body.secondOwner, 'i');

		WeeklyResult.find({ $or : [{ Owner: firstOwner }, { Owner: secondOwner }] })
			.sort('Week Owner')
			.exec((err, data) => {
				if(err) console.log(err);

				console.log(data);
				res.json(data)
			});
	});

	app.post('/api/leaguecomparison', (req, res) => {
		const week = req.body.week;
		WeeklyResult.aggregate([
			{
				$match: { Week: { $lte: week }}
			},
			{
				$group: {
					_id: '$Owner',
					Week: { $max: '$Week' },
					Pts: { $sum: '$Pts' },
					Elite: { $sum: '$Elite' },
					Superior: { $sum: '$Superior' },
					Inferior: { $sum: '$Inferior' },
					MeanPlus: { $sum: '$MeanPlus' },
					MeanMinus: { $sum: '$MeanMinus' },
					Abyssmal: { $sum: '$Abyssmal' },
					High: { $max: '$Pts' },
					Low: { $min: '$Pts' },
					History: { $push: { 
						Pts: '$Pts',
						Elite: '$Elite',
						Superior: '$Superior',
						MeanPlus: '$MeanPlus',
						MeanMinus: '$MeanMinus',
						Inferior: '$Inferior',
						Abyssmal: '$Abyssmal',
						WeeklyQS: { 
							$sum: [
								'$Elite',
								'$Superior',
								'$MeanPlus',
								'$MeanMinus',
								'$Inferior',
								'$Abyssmal' 
						]}
					 }}
				}
			}
		], (err, data) => {
			console.log(data);
			res.json(data);
		});
	});
}
