const cors = require('cors');
const path = require('path');
const axios = require('axios');
const express = require('express');

const app = express();
app.use(cors());

app.get('/api/quote', (req, res) => {
	console.log('in get call ');
	axios.get('https://programming-quotes-api.herokuapp.com/quotes/random')
		.then((response1) => {
			console.log('response is -  ' + response1);
			const postcontent = response1.data;
			console.log('post content ' + postcontent);
			var title = response1.data.author;
			var content = response1.data.en;
			console.log(content);

			//	const { title, content } = post || {};

			return (title && content)
				? res.json({ status: 'success', data: { title, content } })
				: res.status(500).json({ status: 'failed', message: 'Could not fetch quote.' });
		})
		.catch(err => res.status(500).json({ status: 'failed', message: 'Could not fetch quote.' }));
});
module.exports = app;