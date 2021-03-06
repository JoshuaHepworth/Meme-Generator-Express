const express = require('express');

const router = express.Router();

const Meme = require('../models/meme');

const User = require('../models/user');

const Image = require('../models/image');

const apiKey = process.env.API_KEY;


//INDEX ROUTE
router.get('/', async (req, res, next) => {
  try {
  	const allMemes = await Meme.find({'user._id': req.session.ID});
  	res.json({
  		status: 200,
  		data: allMemes
  	})
  	console.log(allMemes, '<--user memes');
  } catch(e){
      
  }
	    
}) 

router.get('/profile/:id', async (req, res) => {

	const idToUse = req.params.id
	try {
		const userMemes = await Meme.find({'user._id': req.params.id});
		res.json({
			status: 200,
			data: userMemes
		})

	} catch (err) {
		
	}
})

router.post('/', async (req, res) => {
	
	try {
		console.log('post route hitting');
		console.log(req.body, '<--request body');
		const createdMeme = await Meme.create(req.body);
		
		await createdMeme.save()
		console.log(createdMeme, '<-- created meme');
		const foundMemes = await Meme.find({})

		res.json({
			status: 200,
			data: createdMeme
		})
	} catch (err){
		res.send(err)
	}
})

router.get('/popular', async (req, res) => {
	try {
		const popularMemes = await Meme.find({'upvotes': {$gt: 5}});
		console.log(popularMemes);
		res.json({
			status: 200,
			data: popularMemes
		})
	} catch (err) {
		res.json({
			status: 404,
			message: 'error',
			error: err
		})
	}
})
router.get('/:id', async (req, res, next) => {
  try {
  	const foundMeme = Meme.findbyId(req.body.id);
  	console.log(foundMeme, 'found this meme');
  	res.json({
  		status: 200,
  		data: foundMeme
  	})
  } catch(err){
      res.send(err)
  }
	    
})

router.put('/:id', async (req, res) => {
	try {
		const updatedMeme = await Meme.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
			status: 200,
			data: updatedMeme
		})

	} catch(err){
		res.send(err)
	}
})


router.delete('/:id', async	(req, res) => {
	try {
		const deletedMeme = await Meme.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedMeme
		})
	} catch (err){
		res.send(err);
	}
})
module.exports = router;